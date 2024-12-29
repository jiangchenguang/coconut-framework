import { genDotCoco } from '@cocofw/cli';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';
import { _test_helper } from 'coco-mvc';

let ApplicationContext;
let Space;
describe('ioc-container', () => {
  beforeEach(async () => {
    genDotCoco(pkgPath(__dirname));
    Space = (await import('./src/component/Space.ts')).default;
    ApplicationContext = (await import(cocoIdxStr)).ApplicationContext;
  });

  afterEach(async () => {
    _test_helper.iocContainer.clear();
    jest.resetModules();
  });

  test('没有添加注解，则不能获取组件实例', async () => {
    let throwError = false;
    try {
      const context = new ApplicationContext();
      context.getBean(Space);
    } catch (e) {
      throwError = true;
    }
    expect(throwError).toBe(true);
  });
});
