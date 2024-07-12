const { build } = require('esbuild');

build({
  entryPoints: ['dist/cli.js'],
  bundle: true,
  platform: 'node',
  outfile: 'mind-cli.js'
}).catch(() => process.exit(1));
