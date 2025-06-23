cat > ghoss_firebase_repair_deploy.sh << 'EOF'
#!/data/data/com.termux/files/usr/bin/bash

echo "🛠️  GHOSS Firebase Fix & Deploy Sequence Initiated"

pkg reinstall coreutils -y
rm -f ~/fake_env
pkg uninstall nodejs -y
pkg install nodejs -y

NODE_PATH=$(which node)
echo "✅ Node located at: $NODE_PATH"
chmod +x "$NODE_PATH"

export NODE="$NODE_PATH"
export PATH="$(dirname $NODE):$PATH"

echo "🧠 Node version: $(node -v)"

echo '{ "functions": { "source": "functions", "runtime": "nodejs18" } }' > firebase.json

echo "🚀 Deploying GHOSS functions to Firebase..."
env -i PATH="$PATH" HOME="$HOME" firebase deploy --only functions
EOF

chmod +x ghoss_firebase_repair_deploy.sh
./ghoss_firebase_repair_deploy.sh
