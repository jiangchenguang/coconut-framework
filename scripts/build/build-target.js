const path = require('node:path');
const { PACKAGE } = require("./rollup-alias");
const packages = path.join(__dirname, '../../packages');
const cocoMvc = path.join(packages, './coco-mvc');
const cocoMvcInput = path.join(cocoMvc, './src/index.ts');
const cocoMvcFile = `${path.join(cocoMvc, './dist')}/coco-mvc.cjs.js`;
const jsxInput = path.join(cocoMvc, './src/jsx-runtime/index.ts');
const jsxFile = `${path.join(cocoMvc, './dist')}/jsx-runtime.cjs.js`;

const cocoCli = path.join(packages, './coco-cli');
const cliSrc = path.join(cocoCli, './src');
const cliDist = path.join(cocoCli, './dist');

module.exports.rollupTargets = [
  {
    type: 'bundle',
    input: cocoMvcInput,
    output: {
      file: cocoMvcFile,
      format: 'cjs',
    },
    alias: [
      PACKAGE.MVC,
      PACKAGE.MVC_COMPONENT,
      PACKAGE.MVC_METADATA,
      PACKAGE.REACTIVE,
      PACKAGE.REACTIVE_METADATA,
      PACKAGE.ROUTER,
      PACKAGE.RECONCILER,
      PACKAGE.WEB,
      PACKAGE.SHARED,
      PACKAGE.HOST_CONFIG,
      PACKAGE.IOC_CONTAINER,
      PACKAGE.IOC_CONTAINER_TEST_HELPER,
    ]
  },
  {
    type: 'declaration',
    input: cocoMvcInput,
    output: {
      // todo 通过npm导入也有效吗？
      file: './packages/coco-mvc/dist/types/index.d.ts',
      format: 'es',
    },
    alias: [
      PACKAGE.MVC,
      PACKAGE.MVC_COMPONENT,
      PACKAGE.MVC_METADATA,
      PACKAGE.REACTIVE,
      PACKAGE.REACTIVE_METADATA,
      PACKAGE.ROUTER,
      PACKAGE.RECONCILER,
      PACKAGE.WEB,
      PACKAGE.SHARED,
      PACKAGE.HOST_CONFIG,
      PACKAGE.IOC_CONTAINER,
      PACKAGE.IOC_CONTAINER_TEST_HELPER,
    ]
  },
  {
    type: 'bundle',
    input: jsxInput,
    output: {
      file: jsxFile,
      format: 'cjs',
    }
  },
];

module.exports.tsTargets = [
  {
    input: cliSrc,
    output: cliDist
  }
]
