#!/usr/bin/env node

/**
 * Build validation script for ShowTrackAI Static Site
 * Validates the build output for deployment readiness
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Starting build validation...');

const outDir = path.join(process.cwd(), 'out');

// Check if build output exists
if (!fs.existsSync(outDir)) {
  console.error('❌ Build output directory not found. Please run the build first.');
  process.exit(1);
}

// Check for deployment ready indicator
const deploymentReadyPath = path.join(outDir, '.deployment-ready');
if (!fs.existsSync(deploymentReadyPath)) {
  console.error('❌ Build is not marked as deployment ready. Please run post-build script.');
  process.exit(1);
}

// Validate build manifest
const manifestPath = path.join(outDir, 'build-manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error('❌ Build manifest not found. Please run post-build script.');
  process.exit(1);
}

try {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  console.log('✅ Build manifest validated');
  console.log(`   Build Time: ${manifest.buildTime}`);
  console.log(`   File Count: ${manifest.fileCount}`);
  console.log(`   Build Size: ${(manifest.buildSize / 1024 / 1024).toFixed(2)} MB`);
} catch (error) {
  console.error('❌ Invalid build manifest:', error.message);
  process.exit(1);
}

// Validate critical files
const criticalFiles = [
  'index.html',
  '_next'
];

for (const file of criticalFiles) {
  const filePath = path.join(outDir, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Critical file missing: ${file}`);
    process.exit(1);
  }
}

console.log('✅ All critical files present');

// Check for broken links (basic check)
function checkHtmlFiles(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isFile() && item.endsWith('.html')) {
      try {
        const content = fs.readFileSync(itemPath, 'utf8');
        
        // Basic check for common issues
        if (content.includes('404') && item === 'index.html') {
          console.warn(`⚠️  Index page might contain 404 content`);
        }
        
        if (content.length < 100) {
          console.warn(`⚠️  ${item} seems unusually small (${content.length} bytes)`);
        }
      } catch (error) {
        console.warn(`⚠️  Could not read ${item}: ${error.message}`);
      }
    } else if (stats.isDirectory() && !item.startsWith('.')) {
      checkHtmlFiles(itemPath);
    }
  }
}

console.log('🔍 Checking HTML files...');
checkHtmlFiles(outDir);

console.log('\n✅ Build validation completed successfully!');
console.log('🚀 Build is ready for deployment!');