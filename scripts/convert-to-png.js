const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function convertSvgToPng() {
  const publicDir = path.join(__dirname, '..', 'public');
  const svgPath = path.join(publicDir, 'og-image.svg');
  const pngPath = path.join(publicDir, 'og-image.png');

  if (!fs.existsSync(svgPath)) {
    console.error('❌ SVG file not found. Run generate-og-image.js first.');
    process.exit(1);
  }

  try {
    await sharp(svgPath)
      .resize(1200, 630)
      .png({ quality: 90 })
      .toFile(pngPath);

    console.log('✅ PNG OG image created at:', pngPath);
    
    // Get file sizes
    const svgSize = fs.statSync(svgPath).size;
    const pngSize = fs.statSync(pngPath).size;
    console.log(`📦 SVG size: ${(svgSize / 1024).toFixed(2)} KB`);
    console.log(`📦 PNG size: ${(pngSize / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error('❌ Error converting SVG to PNG:', error.message);
    process.exit(1);
  }
}

convertSvgToPng();
