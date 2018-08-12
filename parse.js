const fs = require('fs');
const path = require('path');
const compareVersions = require('compare-versions');

// If fetching normalize.css was not completed correctly
if (!fs.existsSync('./node_modules/normalize.css/package.json')) {
  console.log('  > ERROR: normalize.css package not found.');
  console.log('  > Please try again or file an issue.');
  console.log('  > https://github.com/gabbes/stringified-normalize/issues');

  process.exit(0);
}

const package = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

const normalize = JSON.parse(
  fs.readFileSync('./node_modules/normalize.css/package.json', 'utf8')
);
console.log(compareVersions(package.version, normalize.version));

// Get contents of normalize.css main file
const normalizeCss = fs.readFileSync(
  path.resolve('./node_modules/normalize.css/', normalize.main),
  'utf8'
);

// Remove commentation and empty newlines
const stringified = normalizeCss
  .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '')
  .replace(/^\s*\n/gm, '');

const stingifedNormalize = `module.exports = \`\n${stringified}\`;`;

// If created stringified version is the same as existing, exit
if (
  fs.existsSync('./index.js') &&
  fs.readFileSync('./index.js', 'utf8') === stingifedNormalize
) {
  console.log(`  > Already up to date (version ${package.version})`);

  process.exit(0);
}

console.log(`  > Updating to version ${normalize.version}`);

// If package.json version is below version of normalize.css, update version.
// This is only done in cases where package version if below that of normalize
// because a future fix might require the package to be updated to a number
// above that of the normalize.css version.
// But the goal is to keep the version the as normalize.css.
if (compareVersions(package.version, normalize.version) === -1) {
  package.version = normalize.version;

  fs.writeFileSync('./package.json', JSON.stringify(package, null, 2));
}

fs.writeFileSync('./index.js', stingifedNormalize);

console.log('  > Update complete');
