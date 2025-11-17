export async function GET() {
  // Minimal SVG favicon served at /favicon.ico to prevent 404s
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#0ea5e9"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="32" height="32" rx="6" fill="url(#g)"/>
  <path d="M10 22c3-8 9-8 12 0" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>
  <circle cx="12" cy="12" r="2.2" fill="#fff"/>
  <circle cx="20" cy="12" r="2.2" fill="#fff"/>
 </svg>`
  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  })
}
