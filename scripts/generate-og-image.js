const fs = require('fs');
const path = require('path');

// Create SVG-based OG image with embedded original logo
const width = 1200;
const height = 630;

// Read and encode the original logo as base64
const publicDir = path.join(__dirname, '..', 'public');
const logoPath = path.join(publicDir, 'images', 'avatar-logo-white.png');
const logoBase64 = fs.readFileSync(logoPath).toString('base64');
const logoDataUrl = `data:image/png;base64,${logoBase64}`;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#FF5500"/>
      <stop offset="100%" style="stop-color:#FFA500"/>
    </linearGradient>
    <radialGradient id="bgGlow" cx="50%" cy="0%" r="80%" fx="50%" fy="0%">
      <stop offset="0%" style="stop-color:#FF5500;stop-opacity:0.15"/>
      <stop offset="100%" style="stop-color:#121212;stop-opacity:0"/>
    </radialGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="#121212"/>
  <rect width="${width}" height="${height}" fill="url(#bgGlow)"/>
  
  <!-- Decorative dots -->
  <circle cx="60" cy="40" r="4" fill="#FF5500" opacity="0.4"/>
  <circle cx="1100" cy="100" r="3" fill="#FFA500" opacity="0.3"/>
  <circle cx="200" cy="550" r="5" fill="#FF5500" opacity="0.25"/>
  <circle cx="1120" cy="500" r="2.5" fill="#FFA500" opacity="0.35"/>
  <circle cx="100" cy="200" r="2" fill="#FF5500" opacity="0.2"/>
  <circle cx="1050" cy="300" r="3" fill="#FFA500" opacity="0.25"/>
  
  <!-- Original Logo -->
  <image x="510" y="100" width="180" height="180" xlink:href="${logoDataUrl}" preserveAspectRatio="xMidYMid meet"/>
  
  <!-- Title: Alania GO -->
  <text x="600" y="340" text-anchor="middle" font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="72" font-weight="700">
    <tspan fill="#ffffff">Alania </tspan>
    <tspan fill="url(#orangeGradient)">GO</tspan>
  </text>
  
  <!-- Subtitle -->
  <text x="600" y="420" text-anchor="middle" font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" fill="#9ca3af">
    Разработка ПО • Веб-сайты • Telegram боты
  </text>
  
  <!-- Tagline -->
  <text x="600" y="480" text-anchor="middle" font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" fill="#6b7280">
    Качественные IT решения для вашего бизнеса
  </text>
  
  <!-- Bottom gradient line -->
  <rect x="0" y="${height - 4}" width="${width}" height="4" fill="url(#orangeGradient)"/>
  
  <!-- Corner accent -->
  <circle cx="${width}" cy="0" r="200" fill="url(#bgGlow)" opacity="0.5"/>
</svg>`;

// Ensure directories exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write SVG file
const svgPath = path.join(publicDir, 'og-image.svg');
fs.writeFileSync(svgPath, svg);
console.log('✅ SVG OG image created at:', svgPath);
console.log('📷 Using original logo from:', logoPath);
