#!/bin/bash
# Quick Start Guide for Flipkart Clone

echo "🚀 Flipkart Clone - Quick Start Setup"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16+ first."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not found in PATH."
    echo "Make sure PostgreSQL is installed and running on port 5432."
else
    echo "✅ PostgreSQL found"
fi

echo "✅ Node.js found: $(node -v)"
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "======================================"
echo "✅ Installation Complete!"
echo "======================================"
echo ""
echo "📝 Next Steps:"
echo "1. Set up PostgreSQL database:"
echo "   - Create database: psql -U postgres -c 'CREATE DATABASE flipkart_clone;'"
echo "   - Run schema: psql -U postgres -d flipkart_clone -f backend/models/database.sql"
echo "   - Seed data: psql -U postgres -d flipkart_clone -f backend/models/seed.sql"
echo ""
echo "2. Configure .env file:"
echo "   - Copy backend/.env.example to backend/.env"
echo "   - Update DATABASE_URL with your credentials"
echo ""
echo "3. Start the application:"
echo "   - npm run dev (runs both frontend and backend)"
echo ""
echo "4. Open browser:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:5000"
echo ""
