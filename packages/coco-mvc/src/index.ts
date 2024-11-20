import { register, NAME } from 'shared';
// @ts-ignore todo fix it
export { render as renderApp } from 'coconut-web';
export {
  autowired,
  Autowired,
  bean,
  Bean,
  component,
  Component,
  configuration,
  Configuration,
  scope,
  Scope,
  target,
  Target,
  getClsMetadata,
  genDecorator,
  getFields,
  Metadata,
  ApplicationContext,
} from 'coco-ioc-container';
export { reactive, Reactive } from 'coco-reactive';
import { default as view, View } from './decorator/view.ts';
export { view, View };
export { default as bind, Bind } from './decorator/bind.ts';
export {
  default as webApplication,
  WebApplication,
} from './decorator/web-application.ts';

// todo 没有放在这里导出，会导致jest编译报错
// TypeError: (0 , _jsxRuntime.jsx) is not a function
//
//        7 | function getExampleDOM(App) {
//        8 |   const container = document.createElement('div')
//     >  9 |   renderApp(<App />, container)
//          |             ^
//       10 |   return container
//       11 | }
export { jsx, jsxs } from './jsx-runtime/index.ts';

register(NAME.View, View);

import { _test_helper as iocContainerTestHelper } from 'coco-ioc-container';
const _test_helper = {
  iocContainer: iocContainerTestHelper,
};
if (!__TEST__) {
  // @ts-ignore
  _test_helper.iocContainer = {};
}
export { _test_helper };
