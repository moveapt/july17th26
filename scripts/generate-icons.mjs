/**
 * Run this script to generate PNG icons from the SVG.
 * Requires: npm install -g sharp-cli  OR  use an online SVG-to-PNG converter.
 *
 * For Cloudflare Pages, you can also use a placeholder PNG during development.
 * The actual icons should be generated and committed to /public/icons/.
 */
console.log("Generate icons from /public/icons/icon.svg using:");
console.log("  npx @squoosh/cli --resize '{width: 16}' -d public/icons public/icons/icon.svg");
console.log("  Or use https://realfavicongenerator.net with the SVG.");
