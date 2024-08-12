wget https://github.com/Mind-chain/mind-cli/releases/download/v1.0.1/mind-cli

sudo chmod +x mind-cli

#sudo mv mind-cli /usr/bin
./mind-cli version
./mind-cli node  install-node

./mind-cli node get-genesis
./mind-cli node init-node 
validator_key=$(cat data/consensus/validator.key)
echo "Privatkey: 0x$validator_key"
