#!/bin/bash
LOGFILE="/home/pi/local-server/startup.log"
{
  echo "=== Startup at $(date) ==="
  cd /home/pi/local-server || { echo "❌ Failed to cd"; exit 1; }

  echo "🔄 Pulling latest code from GitHub..."
  git reset --hard HEAD
  git pull

  echo "🐳 Rebuilding Docker container..."
  docker compose down
  docker compose up --build -d

  echo "✅ Startup complete at $(date)"
} >> "$LOGFILE" 2>&1
