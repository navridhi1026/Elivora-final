#!/bin/bash
echo "Starting Elivora Fashion Store..."
echo ""

# Start API
cd api
npm install --silent 2>/dev/null
echo "Starting API server on port 5000..."
npm run dev &
API_PID=$!

# Wait for API to be ready
sleep 3

# Start client
cd ../client
npm install --silent 2>/dev/null
echo "Starting client on port 5173..."
npm run dev &
CLIENT_PID=$!

echo ""
echo "========================================"
echo "  Elivora is running!"
echo "  Client: http://localhost:5173"  
echo "  API:    http://localhost:5000"
echo "========================================"
echo ""
echo "Press Ctrl+C to stop both servers"

wait
