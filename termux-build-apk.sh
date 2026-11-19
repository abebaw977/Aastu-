#!/data/data/com.termux/files/usr/bin/bash
# ==============================================================================
# Freshman Academy & Admin Control - Termux APK Builder & Installer
# Builds both standalone Android APK files (Offline-friendly):
#   1. Freshman Student App (edu.freshmanacademy.hub)
#   2. Admin Control App    (edu.freshmanacademy.admin)
# ==============================================================================

set -e

echo "========================================================"
echo "  Freshman Academy + Admin APK Builder for Termux"
echo "========================================================"

# 1. Ensure genuine PDF.js v5 engine files are present in node_modules/pdfjs-dist (replaces any legacy stub)
if [ -f "src/vendor/pdfjs/pdf.min.mjs" ]; then
  mkdir -p node_modules/pdfjs-dist/legacy/build
  cat << 'EOF' > node_modules/pdfjs-dist/package.json
{
  "name": "pdfjs-dist",
  "version": "5.6.205",
  "type": "module"
}
EOF
  cp -f src/vendor/pdfjs/pdf.min.mjs node_modules/pdfjs-dist/legacy/build/pdf.min.mjs
  cp -f src/vendor/pdfjs/pdf.min.mjs node_modules/pdfjs-dist/legacy/build/pdf.mjs
  cp -f src/vendor/pdfjs/pdf.worker.min.mjs node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs
  cp -f src/vendor/pdfjs/pdf.worker.min.mjs node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs
fi

# 2. Configure Android SDK location & Termux ARM64 aapt2 for BOTH projects
SDK_DIR="${ANDROID_HOME:-$HOME/android-sdk}"
export ANDROID_HOME="$SDK_DIR"
export ANDROID_SDK_ROOT="$SDK_DIR"

echo "sdk.dir=$SDK_DIR" > android/local.properties
echo "sdk.dir=$SDK_DIR" > Admin/android/local.properties

AAPT2_BIN="/data/data/com.termux/files/usr/bin/aapt2"
if [ -x "$AAPT2_BIN" ]; then
  for PROP_FILE in android/gradle.properties Admin/android/gradle.properties; do
    if [ -f "$PROP_FILE" ] && ! grep -q "aapt2FromMavenOverride" "$PROP_FILE"; then
      echo "" >> "$PROP_FILE"
      echo "android.aapt2FromMavenOverride=$AAPT2_BIN" >> "$PROP_FILE"
    fi
  done
fi

# 3. Build Freshman Student App Web Bundle & Sync to android/
echo "[1/4] Building Freshman Student Web Assets..."
npx vite build
mkdir -p android/app/src/main/assets/public
rm -rf android/app/src/main/assets/public/*
cp -r dist/* android/app/src/main/assets/public/

# 4. Build Standalone Admin App Web Bundle & Sync to Admin/android/
echo "[2/4] Building Standalone Admin Web Assets..."
npx vite build --config Admin/vite.config.ts
mkdir -p Admin/android/app/src/main/assets/public
rm -rf Admin/android/app/src/main/assets/public/*
cp -r Admin/dist/* Admin/android/app/src/main/assets/public/

# 5. Compile both APKs using Gradle
echo "[3/4] Compiling Freshman Student APK (assembleDebug)..."
chmod +x ./android/gradlew
./android/gradlew -p android assembleDebug

echo "[4/4] Compiling Standalone Admin APK (assembleDebug)..."
chmod +x ./Admin/android/gradlew
./Admin/android/gradlew -p Admin/android assembleDebug

# 6. Copy both APKs to Android Downloads folder & project root
FRESHMAN_APK="android/app/build/outputs/apk/debug/app-debug.apk"
ADMIN_APK="Admin/android/app/build/outputs/apk/debug/app-debug.apk"

cp "$FRESHMAN_APK" "./Freshman-Academy-Student.apk"
cp "$ADMIN_APK" "./Freshman-Admin-Control.apk"

if [ -d "/sdcard/Download" ]; then
  cp "$FRESHMAN_APK" "/sdcard/Download/Freshman-Academy-Student.apk"
  cp "$ADMIN_APK" "/sdcard/Download/Freshman-Admin-Control.apk"
  echo ""
  echo "✅ Both APKs copied to /sdcard/Download/:"
  echo "   1) /sdcard/Download/Freshman-Academy-Student.apk"
  echo "   2) /sdcard/Download/Freshman-Admin-Control.apk"
fi

if command -v termux-open >/dev/null 2>&1; then
  termux-open "/sdcard/Download/Freshman-Academy-Student.apk"
  termux-open "/sdcard/Download/Freshman-Admin-Control.apk"
fi
