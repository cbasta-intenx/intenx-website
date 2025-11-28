#!/bin/bash
set -euo pipefail

echo "[postCreate] Configuring git identity for IntenX AI Agent..."

# 1) Configure Git identity (agent)
git config --global user.name "IntenX AI Agent"
git config --global user.email "agent@intenx.io"

echo "[postCreate] Overriding VS Code credential helper..."

# 2) Disable VS Code's remote git-credential helper (best effort)
# System-level (may need sudo; ignore if not allowed)
if git config --system --get-all credential.helper >/dev/null 2>&1; then
  sudo git config --system --unset-all credential.helper 2>/dev/null || true
fi

# Global + local
git config --global --unset-all credential.helper 2>/dev/null || true
git config --local --unset-all credential.helper 2>/dev/null || true

# 3) Use simple file-based credential store in this container
git config --global credential.helper store
git config --local credential.helper store

echo "[postCreate] Writing ~/.git-credentials (if env vars are present)..."

# 4) Populate ~/.git-credentials from environment (non-interactive pushes)
# Expect GITHUB_USER and GITHUB_TOKEN to be injected via devcontainer.json
if [[ -n "${GITHUB_USER:-}" && -n "${GITHUB_TOKEN:-}" ]]; then
  cat > "${HOME}/.git-credentials" <<EOF
https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com
EOF
  chmod 600 "${HOME}/.git-credentials"
  echo "[postCreate] ~/.git-credentials configured for ${GITHUB_USER}."
else
  echo "[postCreate] WARNING: GITHUB_USER or GITHUB_TOKEN not set; git pushes will still fail."
fi

echo "[postCreate] Ensuring clean HTTPS origin URL..."

# 5) Ensure remote URL is clean (no token in origin)
# Assumes postCreate runs with CWD at the repo root (/workspace)
git remote set-url origin https://github.com/INTenX/intenx-website.git
git remote -v

echo "[postCreate] Installing Next.js utility..."

# 6) Install Next.js utility globally (unchanged)
npm install -g create-next-app

echo "[postCreate] Done."
