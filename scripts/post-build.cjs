#!/usr/bin/env node

/**
 * Post-build script for ShowTrackAI Static Site
 * Optimizes build output and validates deployment readiness
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Starting post-build optimization...');

const outDir = path.join(process.cwd(), 'out');

// Verify build output exists
if (!fs.existsSync(outDir)) {
  console.error('❌ Build output directory not found. Build may have failed.');
  process.exit(1);
}

console.log('✅ Build output directory found');

// Function to get directory size
function getDirectorySize(dirPath) {
  let totalSize = 0;
  
  function calculateSize(currentPath) {
    const stats = fs.statSync(currentPath);
    
    if (stats.isFile()) {
      totalSize += stats.size;
    } else if (stats.isDirectory()) {
      const files = fs.readdirSync(currentPath);
      files.forEach(file => {
        calculateSize(path.join(currentPath, file));
      });
    }
  }
  
  calculateSize(dirPath);
  return totalSize;
}

// Function to format bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Analyze build output
const buildSize = getDirectorySize(outDir);
console.log(`📦 Total build size: ${formatBytes(buildSize)}`);

// Count files
function countFiles(dir) {
  let count = 0;
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isFile()) {
      count++;
    } else if (stats.isDirectory()) {
      count += countFiles(itemPath);
    }
  }
  
  return count;
}

const fileCount = countFiles(outDir);
console.log(`📄 Total files generated: ${fileCount}`);

// Validate critical files exist
const criticalFiles = [
  'index.html',
  '_next',
];

let missingFiles = [];
for (const file of criticalFiles) {
  const filePath = path.join(outDir, file);
  if (!fs.existsSync(filePath)) {
    missingFiles.push(file);
  }
}

if (missingFiles.length > 0) {
  console.error(`❌ Missing critical files: ${missingFiles.join(', ')}`);
  process.exit(1);
}

console.log('✅ All critical files present');

// Check for common static site files
const staticFiles = [
  'favicon.ico',
  'robots.txt',
  'sitemap.xml'
];

let foundStaticFiles = [];
for (const file of staticFiles) {
  const filePath = path.join(outDir, file);
  if (fs.existsSync(filePath)) {
    foundStaticFiles.push(file);
  }
}

if (foundStaticFiles.length > 0) {
  console.log(`📋 Static files found: ${foundStaticFiles.join(', ')}`);
}

// Generate build manifest
const buildManifest = {
  buildTime: new Date().toISOString(),
  buildSize: buildSize,
  fileCount: fileCount,
  nodeVersion: process.version,
  platform: process.platform,
  staticFiles: foundStaticFiles,
  outputDirectory: outDir
};

const manifestPath = path.join(outDir, 'build-manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(buildManifest, null, 2));
console.log('✅ Build manifest generated');

// Optimize HTML files (basic optimization)
function optimizeHtmlFiles(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isFile() && item.endsWith('.html')) {
      try {
        let content = fs.readFileSync(itemPath, 'utf8');
        
        // Remove extra whitespace between tags (basic minification)
        content = content.replace(/>\s+</g, '><');
        
        fs.writeFileSync(itemPath, content);
      } catch (error) {
        console.warn(`⚠️  Could not optimize ${item}: ${error.message}`);
      }
    } else if (stats.isDirectory() && !item.startsWith('.')) {
      optimizeHtmlFiles(itemPath);
    }
  }
}

console.log('🔧 Optimizing HTML files...');
optimizeHtmlFiles(outDir);
console.log('✅ HTML optimization completed');

// Create deployment-ready indicator file
const deploymentReadyPath = path.join(outDir, '.deployment-ready');
fs.writeFileSync(deploymentReadyPath, new Date().toISOString());

// Performance warnings
if (buildSize > 50 * 1024 * 1024) { // 50MB
  console.warn('⚠️  Build size is quite large (>50MB). Consider optimizing assets.');
}

if (fileCount > 1000) {
  console.warn('⚠️  Large number of files generated. This might affect deployment speed.');
}

// Final summary
console.log('\n📊 Build Summary:');
console.log(`   Build Size: ${formatBytes(buildSize)}`);
console.log(`   File Count: ${fileCount}`);
console.log(`   Output Directory: ${outDir}`);
console.log(`   Deployment Ready: ✅`);

console.log('\n✅ Post-build optimization completed successfully!');
console.log('🚀 Build is ready for deployment!\n');