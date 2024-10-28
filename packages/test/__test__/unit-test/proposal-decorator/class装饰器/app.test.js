import { build } from '@cocofw/cli';
import { pkgPath, cocoIdxStr, cocoIdxFolder } from '../../../helper/pkg-path';
import { _test_helper } from 'coco-mvc';
import { decoratorName as a } from './src/decorator/a';
import { decoratorName as b } from './src/decorator/b';

let _ApplicationContext;

describe('class装饰器', () => {
  beforeEach(async () => {
    // TEST.decorator.reset();
    build(pkgPath(__dirname));
    const { ApplicationContext } = await import(cocoIdxStr);
    _ApplicationContext = ApplicationContext;
  });

  afterEach(async () => {});

  test('一个类的多个类装饰器执行顺序', async () => {
    const context = new _ApplicationContext();
    const isExpected = _test_helper.iocContainer.expectInOrder([
      { type: 'exec', name: a },
      { type: 'exec', name: b },
      { type: 'apply', name: b },
      { type: 'apply', name: a },
    ]);
    expect(isExpected).toEqual(true);
  });
});
