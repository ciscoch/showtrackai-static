#!/usr/bin/env node

/**
 * Pre-build script for ShowTrackAI Static Site
 * Validates environment and prepares the build
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Starting pre-build validation...');

// Check Node.js version
const nodeVersion = process.version;
const requiredNodeVersion = '18.0.0';

function compareVersions(version1, version2) {
  const v1Parts = version1.replace('v', '').split('.').map(Number);
  const v2Parts = version2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
    const v1Part = v1Parts[i] || 0;
    const v2Part = v2Parts[i] || 0;
    
    if (v1Part > v2Part) return 1;
    if (v1Part < v2Part) return -1;
  }
  return 0;
}

if (compareVersions(nodeVersion, requiredNodeVersion) < 0) {
  console.error(`❌ Node.js version ${nodeVersion} is not supported. Please use Node.js ${requiredNodeVersion} or higher.`);
  process.exit(1);
}

console.log(`✅ Node.js version ${nodeVersion} is compatible`);

// Validate package.json
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ package.json not found');
  process.exit(1);
}

console.log('✅ package.json found');

// Check for required dependencies
try {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const requiredDeps = ['next', 'react', 'react-dom'];
  
  for (const dep of requiredDeps) {
    if (!packageJson.dependencies || !packageJson.dependencies[dep]) {
      console.error(`❌ Required dependency '${dep}' not found in package.json`);
      process.exit(1);
    }
  }
  
  console.log('✅ All required dependencies found');
} catch (error) {
  console.error('❌ Error reading package.json:', error.message);
  process.exit(1);
}

// Validate Next.js configuration
const nextConfigPath = path.join(process.cwd(), 'next.config.js');
if (!fs.existsSync(nextConfigPath)) {
  console.warn('⚠️  next.config.js not found - using default configuration');
} else {
  console.log('✅ next.config.js found');
}

// Check TypeScript configuration
const tsConfigPath = path.join(process.cwd(), 'tsconfig.json');
if (fs.existsSync(tsConfigPath)) {
  console.log('✅ TypeScript configuration found');
} else {
  console.log('ℹ️  No TypeScript configuration found - JavaScript mode');
}

// Create output directory if it doesn't exist
const outDir = path.join(process.cwd(), 'out');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
  console.log('✅ Created output directory');
}

// Environment variables validation
const requiredEnvVars = [
  // Add any required environment variables here
  // 'NEXT_PUBLIC_SUPABASE_URL',
  // 'NEXT_PUBLIC_SUPABASE_ANON_KEY'
];

let envMissing = false;
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Required environment variable '${envVar}' is not set`);
    envMissing = true;
  }
}

if (envMissing) {
  console.error('❌ Missing required environment variables');
  process.exit(1);
}

// Log build environment info
console.log('\n📊 Build Environment Info:');
console.log(`   Node.js: ${nodeVersion}`);
console.log(`   Platform: ${process.platform}`);
console.log(`   Architecture: ${process.arch}`);
console.log(`   Working Directory: ${process.cwd()}`);
console.log(`   Build Time: ${new Date().toISOString()}`);

console.log('\n✅ Pre-build validation completed successfully!');
console.log('🏗️  Proceeding with Next.js build...\n');