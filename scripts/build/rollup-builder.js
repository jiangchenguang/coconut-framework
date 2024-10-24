const rollup = require('rollup');
const replace = require('rollup-plugin-replace');
const babel = require('@rollup/plugin-babel');
const typescript = require('@rollup/plugin-typescript');
const aliasPlugin = require('@rollup/plugin-alias');
const genEntries = require('./rollup-alias').genEntries;

function genRollupConfig (inputConfig) {
  const { input, alias } = inputConfig

  return {
    input,
    plugins: [
      replace({
        __DEV__: false,
        __TEST__: process.env.NODE_ENV === 'test',
      }),
      babel({
        plugins: [
          ["@babel/plugin-proposal-decorators", { version: "2023-11" }]
        ]
      }),
      typescript({
        compilerOptions: {
          "target": "es2015",
          "lib": ["dom", "es2015"],
      }}),
      aliasPlugin({
        entries: genEntries(alias)
      })
    ]
  }
}

async function build(targets) {
  try {
    for (const { output, ...rest } of targets) {
      const rollupConfig = genRollupConfig(rest);
      const result = await rollup.rollup(rollupConfig)
      await result.write(output)
    }
  } catch (e) {
    console.error('rollup rollup error', e);
    throw e;
  }
}

module.exports.build = build;