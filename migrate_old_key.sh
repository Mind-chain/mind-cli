echo "" > data/consensus/validator.key

tr -d '\n' < data/consensus/validator.key > data/consensus/validator.key.tmp && mv data/consensus/validator.key.tmp data/consensus/validator.key

sed -i 's/[[:space:]]//g' data/consensus/validator.key

awk '{printf "%s", $0}' data/consensus/validator.key > data/consensus/validator.key.tmp && mv data/consensus/validator.key.tmp data/consensus/validator.key

