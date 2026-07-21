#!/usr/bin/env bash
set -euo pipefail

OUT_DIR="${1:-.artifacts/visual-qa}"
PORT="${2:-4179}"
SCREENS=(profile career speaking projects education certifications contact)
ROOT="$(pwd)"

if [[ ! -f "$ROOT/package.json" || ! -d "$ROOT/src" ]]; then
  echo "Run this script from the portfolio repository root." >&2
  exit 2
fi

if [[ -x "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ]]; then
  CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
elif command -v google-chrome >/dev/null 2>&1; then
  CHROME="$(command -v google-chrome)"
elif command -v chromium >/dev/null 2>&1; then
  CHROME="$(command -v chromium)"
elif command -v chromium-browser >/dev/null 2>&1; then
  CHROME="$(command -v chromium-browser)"
else
  echo "Chrome or Chromium is required for visual capture." >&2
  exit 2
fi

if command -v lsof >/dev/null 2>&1 && lsof -iTCP:"$PORT" -sTCP:LISTEN -t >/dev/null 2>&1; then
  echo "Port $PORT is already in use; pass another port as the second argument." >&2
  exit 2
fi

npm run build
mkdir -p "$OUT_DIR/light/desktop" "$OUT_DIR/light/mobile" "$OUT_DIR/dark/desktop" "$OUT_DIR/dark/mobile"

python3 -m http.server "$PORT" --directory dist >"$OUT_DIR/server.log" 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" >/dev/null 2>&1 || true' EXIT INT TERM

for _ in {1..40}; do
if curl -fsS "http://127.0.0.1:$PORT/" >/dev/null 2>&1; then break; fi
  sleep 0.1
done
curl -fsS "http://127.0.0.1:$PORT/" >/dev/null

capture() {
  local theme="$1"
  local viewport="$2"
  local folder="$3"
  local screen="$4"
  "$CHROME" \
    --headless=new \
    --hide-scrollbars \
    --force-prefers-reduced-motion \
    --window-size="$viewport" \
    --virtual-time-budget=3500 \
    --screenshot="$OUT_DIR/$theme/$folder/$screen.png" \
    "http://127.0.0.1:$PORT/?theme=$theme#/$screen" >/dev/null 2>&1
}

for theme in light dark; do
  for screen in "${SCREENS[@]}"; do capture "$theme" "1440,900" desktop "$screen"; done
  for screen in "${SCREENS[@]}"; do capture "$theme" "500,900" mobile "$screen"; done
done

{
  echo "base_url=http://127.0.0.1:$PORT"
  echo "themes=light dark"
  echo "desktop=1440,900"
  echo "mobile=500,900"
  printf 'screens=%s\n' "${SCREENS[*]}"
} >"$OUT_DIR/manifest.txt"

echo "Visual QA captures written to $OUT_DIR"
