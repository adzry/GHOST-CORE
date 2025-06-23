#!/bin/bash
# GHOSS Git Auto-Deploy Script (Patched)
# Usage: ./deploy.sh "Your commit message"

if [ -z "$1" ]; then
  echo "❌ Commit message required."
  echo "Usage: ./deploy.sh \"Your commit message\""
  exit 1
fi

echo "📦 Re-deploying GHOSS CORE with full sync..."

# Ensure main branch
git checkout main 2>/dev/null || git checkout -b main

# Re-stage everything and commit
git add -A
git commit -m "$1"

# Push to origin
git push origin main

echo "✅ GHOSS CORE pushed successfully."
