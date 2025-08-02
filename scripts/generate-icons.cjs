#!/usr/bin/env node

/**
 * Icon generation script for ShowTrackAI Static Site
 * Generates PWA icons and favicons from a source image
 */

const fs = require('fs');
const path = require('path');

console.log('🎨 Starting icon generation...');

// Icon sizes for PWA and web
const iconSizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
  { size: 180, name: 'apple-touch-icon.png' },
];

async function generateIcons() {
  // Check if Sharp is available for image processing
  let sharp;
  try {
    sharp = require('sharp');
  } catch (error) {
    console.warn('⚠️  Sharp not available. Icon generation will be skipped.');
    console.log('   To enable icon generation, install Sharp: npm install sharp');
    console.log('   For now, creating placeholder files...');
    
    // Create placeholder files instead
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Create empty placeholder files
    for (const icon of iconSizes) {
      const placeholderPath = path.join(publicDir, icon.name);
      if (!fs.existsSync(placeholderPath)) {
        fs.writeFileSync(placeholderPath, ''); // Empty file as placeholder
        console.log(`📝 Created placeholder ${icon.name}`);
      }
    }
    
    // Create basic favicon.ico placeholder
    const faviconPath = path.join(publicDir, 'favicon.ico');
    if (!fs.existsSync(faviconPath)) {
      fs.writeFileSync(faviconPath, '');
      console.log('📝 Created placeholder favicon.ico');
    }
    
    return;
  }

  // Source icon path
  const sourceIconPath = path.join(process.cwd(), 'src', 'icon.png');
  const publicDir = path.join(process.cwd(), 'public');

  // Create public directory if it doesn't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    console.log('✅ Created public directory');
  }

  // Check if source icon exists
  if (!fs.existsSync(sourceIconPath)) {
    console.warn('⚠️  Source icon not found at src/icon.png');
    console.log('   Creating a placeholder icon...');
    
    // Create a simple placeholder icon
    const placeholderIcon = sharp({
      create: {
        width: 512,
        height: 512,
        channels: 4,
        background: { r: 59, g: 130, b: 246, alpha: 1 } // Blue background
      }
    }).png();
    
    // Generate icons from placeholder
    for (const icon of iconSizes) {
      try {
        await placeholderIcon
          .clone()
          .resize(icon.size, icon.size)
          .toFile(path.join(publicDir, icon.name));
        
        console.log(`✅ Generated ${icon.name} (${icon.size}x${icon.size})`);
      } catch (error) {
        console.error(`❌ Failed to generate ${icon.name}:`, error.message);
      }
    }
    
    // Generate favicon.ico
    try {
      await placeholderIcon
        .clone()
        .resize(32, 32)
        .toFormat('png')
        .toFile(path.join(publicDir, 'favicon.ico'));
      
      console.log('✅ Generated favicon.ico');
    } catch (error) {
      console.error('❌ Failed to generate favicon.ico:', error.message);
    }
    
  } else {
    console.log('✅ Source icon found');
    
    // Generate icons from source
    for (const icon of iconSizes) {
      try {
        await sharp(sourceIconPath)
          .resize(icon.size, icon.size)
          .png()
          .toFile(path.join(publicDir, icon.name));
        
        console.log(`✅ Generated ${icon.name} (${icon.size}x${icon.size})`);
      } catch (error) {
        console.error(`❌ Failed to generate ${icon.name}:`, error.message);
      }
    }
    
    // Generate favicon.ico
    try {
      await sharp(sourceIconPath)
        .resize(32, 32)
        .toFormat('png')
        .toFile(path.join(publicDir, 'favicon.ico'));
      
      console.log('✅ Generated favicon.ico');
    } catch (error) {
      console.error('❌ Failed to generate favicon.ico:', error.message);
    }
  }

  // Generate web app manifest if it doesn't exist
  const manifestPath = path.join(publicDir, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    const manifest = {
      name: 'ShowTrackAI',
      short_name: 'ShowTrackAI',
      description: 'Elite livestock management app for FFA students',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#3b82f6',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    };
    
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('✅ Generated web app manifest');
  }

  console.log('\n✅ Icon generation completed successfully!');
}

// Run the icon generation
generateIcons().catch(error => {
  console.error('❌ Icon generation failed:', error.message);
  process.exit(1);
});