#!/bin/bash
# Helper script to set up .env file for CashStream deployment

echo "🔧 CashStream .env Setup Helper"
echo "================================"
echo ""

ROOT_DIR="/Users/sonalingowda/cashstream"
ENV_FILE="$ROOT_DIR/.env"

# Check if .env already exists
if [ -f "$ENV_FILE" ]; then
    echo "⚠️  .env file already exists at: $ENV_FILE"
    echo ""
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Cancelled. Existing .env file preserved."
        exit 0
    fi
fi

echo "📝 Creating .env file at: $ENV_FILE"
echo ""
echo "Please enter your Massa private key:"
echo "(It should start with 'S1' or 'P1')"
read -s PRIVATE_KEY

if [ -z "$PRIVATE_KEY" ]; then
    echo "❌ Error: Private key cannot be empty"
    exit 1
fi

# Create .env file
cat > "$ENV_FILE" << EOF
PRIVATE_KEY=$PRIVATE_KEY
EOF

# Set secure permissions
chmod 600 "$ENV_FILE"

echo ""
echo "✅ .env file created successfully!"
echo ""
echo "📋 File location: $ENV_FILE"
echo "🔒 Permissions: 600 (read/write for owner only)"
echo ""
echo "⚠️  Security reminder:"
echo "   - Never commit this file to git"
echo "   - Never share your private key"
echo "   - Use testnet keys for testing"
echo ""
echo "🚀 You can now run: npm run deploy"
