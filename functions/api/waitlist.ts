interface Env {
  BREVO_API_KEY: string;
  BREVO_LIST_ID: string;
  TURNSTILE_SECRET: string;
}

interface WaitlistRequest {
  email: string;
  token: string;
}

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
}

interface BrevoContactResponse {
  id?: number;
  code?: string;
  message?: string;
}

async function verifyTurnstile(token: string, secret: string, ip: string): Promise<boolean> {
  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);
  formData.append("remoteip", ip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData,
  });

  const data: TurnstileVerifyResponse = await res.json();
  return data.success === true;
}

async function upsertBrevoContact(
  email: string,
  apiKey: string,
  listId: string
): Promise<{ status: "created" | "duplicate" | "error"; message?: string }> {
  const numericListId = parseInt(listId, 10);

  // Create or update contact
  const createRes = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      updateEnabled: true,
      listIds: [numericListId],
      attributes: {
        SOURCE: "moveapt-waitlist",
        SIGNUP_DATE: new Date().toISOString().split("T")[0],
      },
    }),
  });

  const createData: BrevoContactResponse = await createRes.json();

  if (createRes.status === 201) {
    return { status: "created" };
  }

  if (createRes.status === 204) {
    return { status: "duplicate" };
  }

  if (createData.code === "duplicate_parameter") {
    // Contact exists — add to list anyway
    const addRes = await fetch(`https://api.brevo.com/v3/contacts/lists/${numericListId}/contacts/add`, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ emails: [email] }),
    });

    if (addRes.ok) {
      return { status: "duplicate" };
    }
  }

  return {
    status: "error",
    message: createData.message || "Failed to add contact",
  };
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  try {
    const body: WaitlistRequest = await context.request.json();
    const { email, token } = body;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(JSON.stringify({ success: false, error: "Invalid email address" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    // Validate Turnstile token
    if (!token) {
      return new Response(JSON.stringify({ success: false, error: "Missing verification token" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const ip = context.request.headers.get("CF-Connecting-IP") || "0.0.0.0";
    const turnstileValid = await verifyTurnstile(token, context.env.TURNSTILE_SECRET, ip);

    if (!turnstileValid) {
      return new Response(
        JSON.stringify({ success: false, error: "Verification failed. Please try again." }),
        { status: 403, headers: corsHeaders }
      );
    }

    // Add to Brevo
    const result = await upsertBrevoContact(
      email.toLowerCase().trim(),
      context.env.BREVO_API_KEY,
      context.env.BREVO_LIST_ID
    );

    if (result.status === "created") {
      return new Response(
        JSON.stringify({
          success: true,
          status: "created",
          message: "You're on the list! We'll be in touch soon.",
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    if (result.status === "duplicate") {
      return new Response(
        JSON.stringify({
          success: true,
          status: "duplicate",
          message: "You're already on the list! We'll reach out when we launch.",
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: result.message || "Something went wrong" }),
      { status: 500, headers: corsHeaders }
    );
  } catch (err) {
    console.error("Waitlist error:", err);
    return new Response(JSON.stringify({ success: false, error: "Internal server error" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
