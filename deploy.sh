#!/bin/bash

echo "🚀 Starting deploy..."

cd /var/www || exit

echo "📦 Pulling latest code..."
git pull origin main || exit

echo "📦 Installing dependencies..."
npm ci || exit

echo "🛠️ Building project..."
npm run build || exit

echo "🔁 Reloading Nginx..."
sudo systemctl reload nginx || exit

echo "✅ Deploy complete."

