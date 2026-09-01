const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, 'frontend/assets/logo.jpg');
const assetsDir = path.join(__dirname, 'frontend/assets');

async function processLogo() {
  console.log('Loading raw image from:', inputPath);
  
  // 1. First crop the outer mockup shadow/table background so we only have the square card
  // The image is 1024x1024. The inner card is ~880x880 centered.
  const meta = await sharp(inputPath).metadata();
  const width = meta.width;
  const height = meta.height;
  console.log(`Original dimensions: ${width}x${height}`);

  // Raw pixel extraction to create transparent background
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channels = info.channels; // 4 (RGBA)
  const pixelCount = info.width * info.height;
  const outBuf = Buffer.from(data);

  // Convert white and light grey background (the paper and table) to transparent
  for (let i = 0; i < pixelCount; i++) {
    const r = outBuf[i * 4];
    const g = outBuf[i * 4 + 1];
    const b = outBuf[i * 4 + 2];

    // Background is near white/grey (paper & table: R>235, G>235, B>235)
    // Calculate brightness and saturation
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min; // Low diff = grey/white

    // If it's near-white or very light grey paper/shadow:
    if (r > 230 && g > 230 && b > 230 && diff < 20) {
      outBuf[i * 4 + 3] = 0; // completely transparent
    } else if (r > 215 && g > 215 && b > 215 && diff < 15) {
      // Soft transition
      const alpha = Math.max(0, Math.min(255, Math.round((230 - max) * 17)));
      outBuf[i * 4 + 3] = alpha;
    }
  }

  // Save transparent full logo
  await sharp(outBuf, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
  .trim() // automatically trim empty transparent borders
  .png()
  .toFile(path.join(assetsDir, 'logo-transparent.png'));

  console.log('Saved: logo-transparent.png');

  // Also create a version for the circular emblem / nav icon
  // Crop around the top emblem (magnifying glass with T)
  const emblemCrop = await sharp(path.join(assetsDir, 'logo-transparent.png'))
    .metadata();

  // The emblem is in the top 65% of the trimmed image
  const emblemHeight = Math.round(emblemCrop.height * 0.65);
  await sharp(path.join(assetsDir, 'logo-transparent.png'))
    .extract({
      left: 0,
      top: 0,
      width: emblemCrop.width,
      height: emblemHeight
    })
    .trim()
    .png()
    .toFile(path.join(assetsDir, 'logo-icon.png'));

  console.log('Saved: logo-icon.png');

  // Create dark-mode friendly version (where dark text 'Tailored' is inverted or white for dark themes)
  const { data: dData, info: dInfo } = await sharp(path.join(assetsDir, 'logo-transparent.png'))
    .raw()
    .toBuffer({ resolveWithObject: true });

  const darkOutBuf = Buffer.from(dData);
  for (let i = 0; i < dInfo.width * dInfo.height; i++) {
    const r = darkOutBuf[i * 4];
    const g = darkOutBuf[i * 4 + 1];
    const b = darkOutBuf[i * 4 + 2];
    const a = darkOutBuf[i * 4 + 3];

    if (a > 30) {
      // If the pixel is dark navy text (#1a1a2e / R<50, G<60, B<90), make it crisp white/light for dark mode
      if (r < 55 && g < 65 && b < 100) {
        darkOutBuf[i * 4] = 248;
        darkOutBuf[i * 4 + 1] = 250;
        darkOutBuf[i * 4 + 2] = 252;
      }
    }
  }

  await sharp(darkOutBuf, {
    raw: {
      width: dInfo.width,
      height: dInfo.height,
      channels: 4
    }
  })
  .png()
  .toFile(path.join(assetsDir, 'logo-dark.png'));

  console.log('Saved: logo-dark.png');
}

processLogo().then(() => console.log('Logo processing complete!')).catch(console.error);
