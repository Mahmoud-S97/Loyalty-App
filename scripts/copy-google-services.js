
const fs = require('node:fs');
const path = require('node:path');

if (process.env.EAS_BUILD_PLATFORM !== 'android') {
  console.log('Skipping Android Google Services configuration.');
  process.exit(0);
}

const source = process.env.GOOGLE_SERVICES_JSON;

if (!source || !fs.existsSync(source)) {
  throw new Error(
    'GOOGLE_SERVICES_JSON is missing or its file does not exist.'
  );
}

const destination = path.join(
  process.cwd(),
  'android',
  'app',
  'google-services.json'
);

fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.copyFileSync(source, destination);

console.log('Firebase Google Services file configured for Android.');
