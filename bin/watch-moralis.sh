#! /usr/bin/bash

. ./.env.local

moralis-admin-cli watch-cloud-folder \
  --moralisApiKey $MORALIS_CLI_KEY \
  --moralisApiSecret $MORALIS_CLI_SECRET \
  --moralisSubdomain $MORALIS_CLI_SUBDOMAIN \
  --autoSave 1 \
  --moralisCloudfolder ~/git/dexcalidraw/moralis
