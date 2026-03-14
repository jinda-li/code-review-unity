#!/usr/bin/env node

/**
 * code-review-unity
 *
 * Claude Code skill for reviewing Unity C# code
 * based on Unity's official style guide
 *
 * Usage: npx code-review-unity
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir, cp } from 'fs/promises';
import { homedir } from 'os';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function install() {
  const homeDir = homedir();
  const skillsDir = join(homeDir, '.claude', 'skills', 'code-review-unity');
  const sourceDir = join(__dirname, '.claude', 'skills', 'code-review-unity');

  console.log('Installing code-review-unity skill...');
  console.log(`Target: ${skillsDir}`);

  try {
    // Create directory if it doesn't exist
    if (!existsSync(skillsDir)) {
      await mkdir(skillsDir, { recursive: true });
    }

    // Copy skill files
    await cp(sourceDir, skillsDir, { recursive: true, force: true });

    console.log('✓ code-review-unity skill installed successfully!');
    console.log('');
    console.log('Usage in Claude Code:');
    console.log('  /code-review-unity <file-or-diff>');
    console.log('');
    console.log('Or let Claude auto-load it when reviewing Unity C# code.');
  } catch (error) {
    console.error('✗ Installation failed:', error.message);
    process.exit(1);
  }
}

install();
