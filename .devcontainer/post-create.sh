#!/bin/bash

# Configure Git Identity
git config --global user.name 'IntenX AI Agent'
git config --global user.email 'agent@intenx.io'

# Configure Git Remote
git remote set-url origin https://github.com/INTenX/intenx-website.git

# Install Next.js utility
npm install -g create-next-app