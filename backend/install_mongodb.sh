#!/bin/bash
set -e

echo "Importing MongoDB GPG key..."
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

echo "Adding MongoDB repository (using Ubuntu 22.04 'jammy' as fallback)..."
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list > /dev/null

echo "Updating package list..."
sudo apt update

echo "Installing MongoDB..."
sudo apt install -y mongodb-org

echo "Starting and enabling MongoDB service..."
sudo systemctl start mongod
sudo systemctl enable mongod

echo "MongoDB service status:"
sudo systemctl status mongod | grep Active