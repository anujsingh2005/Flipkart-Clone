#!/usr/bin/env node
/**
 * Flipkart Clone - Setup Verification Script
 * Usage: node verify-setup.js
 */

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

const log = {
  success: (msg) => console.log(`${colors.green}[✓]${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}[✗]${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}[!]${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}[ℹ]${colors.reset} ${msg}`),
};

async function verifySetup() {
  console.log(colors.blue);
  console.log('============================================');
  console.log('Flipkart Clone - Setup Verification');
  console.log('============================================');
  console.log(colors.reset);
  console.log();

  let passed = 0;
  let failed = 0;

  // Check Node.js version
  log.info('Checking Node.js...');
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.split('.')[0].substring(1));
  if (majorVersion >= 16) {
    log.success(`Node.js ${nodeVersion}`);
    passed++;
  } else {
    log.error(`Node.js ${nodeVersion} (v16+ required)`);
    failed++;
  }

  // Check backend .env
  log.info('Checking configuration files...');
  const envPath = path.join(__dirname, 'backend', '.env');
  if (fs.existsSync(envPath)) {
    log.success('backend/.env exists');
    passed++;
  } else {
    log.error('backend/.env not found');
    failed++;
  }

  // Check backend node_modules
  const backendModules = path.join(__dirname, 'backend', 'node_modules');
  if (fs.existsSync(backendModules)) {
    log.success('Backend dependencies installed');
    passed++;
  } else {
    log.warning('Backend dependencies not installed (run: cd backend && npm install)');
  }

  // Check frontend node_modules
  const frontendModules = path.join(__dirname, 'frontend', 'node_modules');
  if (fs.existsSync(frontendModules)) {
    log.success('Frontend dependencies installed');
    passed++;
  } else {
    log.warning('Frontend dependencies not installed (run: cd frontend && npm install)');
  }

  // Test MySQL connection
  log.info('Checking MySQL connection...');
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Anuj2005@',
      database: 'flipkart_clone',
      port: 3306,
    });

    log.success('MySQL connected successfully');
    passed++;

    // Check tables
    log.info('Checking database schema...');
    const [tables] = await connection.execute('SHOW TABLES;');
    const expectedTables = ['users', 'categories', 'products', 'cart', 'orders', 'order_items'];
    const foundTables = tables.map((t) => Object.values(t)[0]);

    if (foundTables.length === 6) {
      log.success(`All 6 tables found: ${foundTables.join(', ')}`);
      passed++;
    } else {
      log.error(`Only ${foundTables.length} tables found (expected 6)`);
      failed++;
    }

    // Check sample data
    log.info('Checking sample data...');
    const [productCount] = await connection.execute('SELECT COUNT(*) as count FROM products;');
    const count = productCount[0].count;

    if (count === 40) {
      log.success(`40 sample products seeded`);
      passed++;
    } else if (count > 0) {
      log.warning(`Only ${count} products found (expected 40)`);
    } else {
      log.error('No products found in database');
      failed++;
    }

    // Check categories
    const [categoryCount] = await connection.execute('SELECT COUNT(*) as count FROM categories;');
    const catCount = categoryCount[0].count;

    if (catCount === 6) {
      log.success(`6 categories seeded`);
      passed++;
    } else {
      log.warning(`Only ${catCount} categories found (expected 6)`);
    }

    await connection.end();
  } catch (err) {
    log.error(`MySQL connection failed: ${err.message}`);
    log.info('Solutions:');
    log.info('1. Ensure MySQL is running (net start MySQL80)');
    log.info('2. Verify credentials in backend/.env');
    log.info('3. Make sure database is created: mysql -u root -pAnuj2005@ -e "CREATE DATABASE flipkart_clone;"');
    failed++;
  }

  // Summary
  console.log();
  console.log(colors.blue);
  console.log('============================================');
  console.log('Verification Summary');
  console.log('============================================');
  console.log(colors.reset);
  console.log(`${colors.green}Passed: ${passed}${colors.reset}`);
  console.log(`${colors.red}Failed: ${failed}${colors.reset}`);
  console.log();

  if (failed === 0) {
    console.log(colors.green);
    console.log('✓ All checks passed!');
    console.log(colors.reset);
    console.log();
    console.log('Next steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Open: http://localhost:3000');
    console.log();
    process.exit(0);
  } else {
    console.log(colors.red);
    console.log('✗ Some checks failed. Please see solutions above.');
    console.log(colors.reset);
    console.log();
    process.exit(1);
  }
}

verifySetup();
