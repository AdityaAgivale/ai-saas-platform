// Deterministic "AI image" placeholder generator.
// No image-generation API key is configured for this project (only a text
// model key is present), so this produces a unique, prompt-derived abstract
// gradient/pattern SVG instead of calling a real image-gen model. Swap this
// out for a real image API (e.g. an image endpoint) once a key is available.

function hashString(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const PALETTES = [
  ["#3b82f6", "#8b5cf6", "#22d3ee"],
  ["#ec4899", "#8b5cf6", "#3b82f6"],
  ["#10b981", "#22d3ee", "#3b82f6"],
  ["#f59e0b", "#ec4899", "#8b5cf6"],
  ["#22d3ee", "#3b82f6", "#10b981"],
];

export function generatePlaceholderImage(prompt: string, seedExtra = ""): string {
  const seed = hashString(prompt + seedExtra);
  const palette = PALETTES[seed % PALETTES.length];
  const rand = (n: number, salt: number) => (seed * (salt + 7)) % n;

  const shapes = Array.from({ length: 6 })
    .map((_, i) => {
      const cx = 40 + (rand(520, i * 3) % 520);
      const cy = 40 + (rand(520, i * 5) % 520);
      const r = 90 + (rand(160, i * 9) % 160);
      const color = palette[i % palette.length];
      return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="0.9" />`;
    })
    .join("");

  const angle = seed % 360;
  const bgFrom = palette[0];
  const bgTo = palette[palette.length - 1];

  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(${angle} 0.5 0.5)">
        <stop offset="0%" stop-color="#05070d" />
        <stop offset="55%" stop-color="#0b0e19" />
        <stop offset="100%" stop-color="#05070d" />
      </linearGradient>
      <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="28" />
      </filter>
      <radialGradient id="glow1" cx="20%" cy="20%" r="60%">
        <stop offset="0%" stop-color="${bgFrom}" stop-opacity="0.45" />
        <stop offset="100%" stop-color="${bgFrom}" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="glow2" cx="80%" cy="80%" r="60%">
        <stop offset="0%" stop-color="${bgTo}" stop-opacity="0.45" />
        <stop offset="100%" stop-color="${bgTo}" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="600" height="600" fill="url(#bg)" />
    <rect width="600" height="600" fill="url(#glow1)" />
    <rect width="600" height="600" fill="url(#glow2)" />
    <g filter="url(#blur)">${shapes}</g>
  </svg>`;
}

export function svgToDataUri(svg: string) {
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");
  return `data:image/svg+xml,${encoded}`;
}
