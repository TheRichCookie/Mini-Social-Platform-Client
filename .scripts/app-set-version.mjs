// scripts/app-set-version.js
import fs from 'fs';

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

const version = process.argv[2];
if (!version) {
    console.error(`❌ ${RED} Usage: node app-set-version.mjs <version>`);
    process.exit(1);
}

const versionFileData = `const VERSION = '${version}';` + '\n' + 'export default VERSION';

// Example: keep a simple VERSION file
fs.writeFileSync('projects/hangout-app/src/app.version.ts', versionFileData);

// Example: update package.json version (if you use package.json for electron/web)
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.version = version;
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');

// Example: update Android gradle.properties (versionName)
// const gradlePath = 'android/gradle.properties';
// if (fs.existsSync(gradlePath)) {
//   let g = fs.readFileSync(gradlePath, 'utf8');
//   g = g.replace(/VERSION_NAME=.*/g, `VERSION_NAME=${version}`);
//   fs.writeFileSync(gradlePath, g);
// }

// Example: update iOS Info.plist (very naïve — use plist libs for robust solution)
// const plistPath = 'ios/Info.plist';
// if (fs.existsSync(plistPath)) {
//   let p = fs.readFileSync(plistPath, 'utf8');
//   p = p.replace(/<key>CFBundleShortVersionString<\/key>\s*<string>.*<\/string>/, `<key>CFBundleShortVersionString</key>\n\t<string>${version}</string>`);
//   fs.writeFileSync(plistPath, p);
// }
