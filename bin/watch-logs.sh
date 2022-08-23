#! /usr/bin/bash

. ./.env.local

moralis-admin-cli get-logs \
  --moralisApiKey $MORALIS_CLI_KEY \
  --moralisApiSecret $MORALIS_CLI_SECRET \
