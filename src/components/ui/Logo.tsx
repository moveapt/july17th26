interface LogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}

export function Logo({ className = "", size = 32, showWordmark = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Icon mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <linearGradient id="logo-grad2" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Background rounded square */}
        <rect width="32" height="32" rx="8" fill="url(#logo-grad2)" />
        <rect width="32" height="32" rx="8" stroke="url(#logo-grad)" strokeWidth="1" strokeOpacity="0.4" />

        {/* Arrow up-right (move) */}
        <path
          d="M9 22L22 9"
          stroke="url(#logo-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Arrowhead */}
        <path
          d="M14 9H22V17"
          stroke="url(#logo-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Door/apartment outline */}
        <rect
          x="5"
          y="16"
          width="9"
          height="11"
          rx="1.5"
          stroke="url(#logo-grad)"
          strokeWidth="1.5"
          strokeOpacity="0.6"
        />
      </svg>

      {showWordmark && (
        <span
          className="text-xl font-semibold tracking-tight text-white"
          style={{ fontFamily: "Inter, system-ui, sans-serif", letterSpacing: "-0.02em" }}
        >
          move
          <span
            style={{
              background: "linear-gradient(135deg, #60a5fa, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            APT
          </span>
        </span>
      )}
    </div>
  );
}
