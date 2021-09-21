// Rollup plugins.
import rollupBabel from '@rollup/plugin-babel'
import rollupReplace from '@rollup/plugin-replace'
import rollupResolve from '@rollup/plugin-node-resolve'
import rollupStrip from '@rollup/plugin-strip'
import rollupStripSymbolDescription from 'rollup-plugin-strip-symbol-description'
import { terser as rollupTerser } from 'rollup-plugin-terser'

// Create configs to return.
const config = {
  input: 'src/scripts/index.js',
  output: {
    file: '../docs/index.js',
    format: 'iife',
    inlineDynamicImports: true,
    sourcemap: true,
  },
  plugins: [
    rollupResolve({
      extensions: ['.js'],
    }),
    rollupReplace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': '\'development\'',
      },
    }),
    rollupBabel({
      exclude: 'node_modules/**',
      extensions: ['.js'],
      babelHelpers: 'bundled',
      presets: [
        ['@babel/preset-env', {
          targets: {
            chrome: '49',
            edge: '12',
            firefox: '39',
            ios: '10.2',
            safari: '10',
          },
        }],
      ],
    }),
  ],
}
// Create configs for build.
if (process.env.NODE_ENV === 'production') {
  // Disable sourcemaps.
  config.output.sourcemap = false

  // Add additional plugin.
  config.plugins.splice(1, 1,
    rollupReplace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': '\'production\'',
      },
    }),
    rollupStrip(),
    rollupStripSymbolDescription(),
  )
  config.plugins.push(
    rollupTerser({
      compress: {
        module: false,
        passes: 3,
      },
    }))
}

module.exports = config
