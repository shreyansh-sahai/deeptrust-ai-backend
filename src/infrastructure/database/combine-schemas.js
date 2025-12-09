#!/usr/bin/env node

/**
 * Script to combine separate Prisma schema files into a single schema.prisma file
 * Usage: node combine-schemas.js
 */

const fs = require('fs');
const path = require('path');

const schemasDir = path.join(__dirname, 'schemas');
const outputFile = path.join(__dirname, '..', 'schema.prisma');

// Order matters - base must be first, then models in dependency order
const schemaFiles = [
  'base.prisma',
  'user.prisma',
  'integration.prisma',
  'sync.prisma',
  'contact.prisma',
];

let combinedContent = '';

console.log('Combining Prisma schemas...');

schemaFiles.forEach((file) => {
  const filePath = path.join(schemasDir, file);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`Warning: ${file} not found, skipping...`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  combinedContent += `// ============================================\n`;
  combinedContent += `// ${file}\n`;
  combinedContent += `// ============================================\n\n`;
  combinedContent += content;
  combinedContent += `\n\n`;
  
  console.log(`✓ Added ${file}`);
});

// Write combined schema
fs.writeFileSync(outputFile, combinedContent, 'utf8');
console.log(`\n✓ Combined schema written to: ${outputFile}`);

