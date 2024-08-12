#!/bin/bash

# Define variables
SERVICE_NAME="mind-node.service"
SERVICE_PATH="/etc/systemd/system/$SERVICE_NAME"
WORKING_DIRECTORY="/root"
EXEC_START="$WORKING_DIRECTORY/mind-cli node start-node"

# Create the service file
echo "Creating $SERVICE_NAME service file..."

sudo bash -c "cat > $SERVICE_PATH <<EOL
[Unit]
Description=Mind Node Service
After=network.target

[Service]
Type=simple
WorkingDirectory=$WORKING_DIRECTORY
ExecStart=$EXEC_START
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOL"

# Reload systemd to recognize the new service
echo "Reloading systemd daemon..."
sudo systemctl daemon-reload

# Start the service
echo "Starting $SERVICE_NAME..."
sudo systemctl start $SERVICE_NAME

# Enable the service to start on boot
echo "Enabling $SERVICE_NAME to start on boot..."
sudo systemctl enable $SERVICE_NAME

# Display the service status
echo "Displaying the status of $SERVICE_NAME..."
sudo systemctl status $SERVICE_NAME

echo "Setup complete!"
