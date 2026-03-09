#!/bin/bash

# Configure Git Identity
git config --global user.name 'IntenX AI Agent'
git config --global user.email 'agent@intenx.io'

# Configure Git Remote
git remote set-url origin https://github.com/INTenX/intenx-website.git

# Install Next.js utility
npm install -g create-next-app

# --- New: configure credential helper + PAT for non-interactive pushes ---

echo "[postCreate] Ensuring git uses credential store..."
git config --global credential.helper store

echo "[postCreate] Writing ~/.git-credentials from env (if present)..."
if [[ -n "${GITHUB_USER:-}" && -n "${GITHUB_TOKEN:-}" ]]; then
  cat > "${HOME}/.git-credentials" <<EOF
https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com
EOF
  chmod 600 "${HOME}/.git-credentials"
  echo "[postCreate] ~/.git-credentials configured for ${GITHUB_USER}."
else
  echo "[postCreate] WARNING: GITHUB_USER or GITHUB_TOKEN not set; git pushes will still require manual auth."
fi