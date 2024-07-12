const { build } = require('esbuild-wasm');

build({
  entryPoints: ['dist/src/cli.js'],
  bundle: true,
  platform: 'node',
  outfile: 'mind-cli.js'
}).catch(() => process.exit(1));
