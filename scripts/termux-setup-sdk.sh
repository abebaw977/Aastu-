#!/usr/bin/env bash
set -e

echo "=== Setting up Android SDK & ARM64 aapt2 for Termux (Student + Admin Apps) ==="

# 1. Install Termux native ARM64 aapt2, wget, unzip, and openjdk if running in Termux
if [ -n "$PREFIX" ] && [ -x "$PREFIX/bin/pkg" ]; then
  pkg install -y wget unzip aapt2 openjdk-17 || pkg install -y wget unzip aapt2 openjdk-21
fi

SDK_DIR="${ANDROID_HOME:-$HOME/android-sdk}"
mkdir -p "$SDK_DIR/cmdline-tools"

# 2. Download Android Command Line Tools if not already installed
if [ ! -f "$SDK_DIR/cmdline-tools/latest/bin/sdkmanager" ]; then
  echo "Downloading Android SDK Command-line Tools..."
  wget -q --show-progress https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O /tmp/cmdtools.zip || \
  wget -q --show-progress https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O "$SDK_DIR/cmdtools.zip"
  unzip -q -o "${SDK_DIR}/cmdtools.zip" -d "$SDK_DIR/cmdline-tools" 2>/dev/null || unzip -q -o /tmp/cmdtools.zip -d "$SDK_DIR/cmdline-tools"
  rm -rf "$SDK_DIR/cmdline-tools/latest"
  mv "$SDK_DIR/cmdline-tools/cmdline-tools" "$SDK_DIR/cmdline-tools/latest"
  rm -f "$SDK_DIR/cmdtools.zip" /tmp/cmdtools.zip
fi

# 3. Accept licenses and install Android Platform 35 & Build Tools 35.0.0 if missing
if [ ! -d "$SDK_DIR/platforms/android-35" ]; then
  yes | "$SDK_DIR/cmdline-tools/latest/bin/sdkmanager" --sdk_root="$SDK_DIR" --licenses >/dev/null 2>&1 || true
  "$SDK_DIR/cmdline-tools/latest/bin/sdkmanager" --sdk_root="$SDK_DIR" "platforms;android-35" "platforms;android-36" "build-tools;35.0.0"
fi

# 4. Write local.properties for BOTH Freshman (android/) and Admin (Admin/android/)
echo "sdk.dir=$SDK_DIR" > android/local.properties
echo "Created android/local.properties -> sdk.dir=$SDK_DIR"

if [ -d "Admin/android" ]; then
  echo "sdk.dir=$SDK_DIR" > Admin/android/local.properties
  echo "Created Admin/android/local.properties -> sdk.dir=$SDK_DIR"
fi

# 5. If on Termux ARM64, configure Gradle to use Termux's native ARM64 aapt2 binary in BOTH projects
AAPT2_BIN="${PREFIX:-/data/data/com.termux/files/usr}/bin/aapt2"
if [ -x "$AAPT2_BIN" ]; then
  for PROP_FILE in android/gradle.properties Admin/android/gradle.properties; do
    if [ -f "$PROP_FILE" ] && ! grep -q "aapt2FromMavenOverride" "$PROP_FILE"; then
      echo "" >> "$PROP_FILE"
      echo "android.aapt2FromMavenOverride=$AAPT2_BIN" >> "$PROP_FILE"
      echo "org.gradle.jvmargs=-Xmx1536m -Dfile.encoding=UTF-8" >> "$PROP_FILE"
      echo "Configured native Termux ARM64 aapt2 override in $PROP_FILE"
    fi
  done
fi

echo "=== SDK Setup Complete for both Student and Admin Android projects! ==="
