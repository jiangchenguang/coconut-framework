import {build} from "@cocofw/cli";
import {pkgPath, cocoIdxStr, cocoIdxFolder} from '../../../helper/pkg-path'
import { _test_helper } from "coco-mvc";
import { decoratorName as a } from "./src/decorator/a";
import { decoratorName as b } from "./src/decorator/b";

let start;

describe('field装饰器', () => {
  beforeEach(async () => {
    build(pkgPath(__dirname));
    const {start: _s} = await import(cocoIdxStr);
    start = _s;
  })

  afterEach(async () => {
  })

  test('多个装饰器执行顺序', async () => {
    start();
    const isExpected = _test_helper.iocContainer.expectInOrder([
      { type: 'exec', name: a},
      { type: 'exec', name: b},
      { type: 'apply', name: b},
      { type: 'apply', name: a},
    ])
    expect(isExpected).toEqual(true);
  });
})