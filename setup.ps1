# Download the mind-cli executable
Invoke-WebRequest -Uri "https://github.com/Mind-chain/mind-cli/releases/download/v1.0.3/mind-cli" -OutFile "mind-cli.exe"

# Make the file executable (PowerShell doesn't require chmod, so this step can be skipped)

# Move the executable to a directory that's in your PATH
Move-Item -Path ".\mind-cli.exe" -Destination "C:\Windows\System32\mind-cli.exe"

# Check the version of mind-cli
mind-cli version
