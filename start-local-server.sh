#!/bin/bash
LOGFILE="/home/pi/startup.log"
{
  echo "=== Startup at $(date) ==="
  cd /home/pi/local-server || { echo "❌ Failed to cd"; exit 1; }

  echo "🔄 Pulling latest code from GitHub..."
  /usr/bin/git reset --hard HEAD
  /usr/bin/git pull

  echo "🐳 Rebuilding Docker container..."
  /usr/bin/docker compose down
  /usr/bin/docker compose up --build -d

  echo "✅ Startup complete at $(date)"
} >> "$LOGFILE" 2>&1
