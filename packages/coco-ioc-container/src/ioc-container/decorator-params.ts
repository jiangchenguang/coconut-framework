import type { PostConstructFn } from './bean-definition.ts';
import { Kind, KindClass } from '../decorator/decorator-context.ts';
import Metadata from '../decorator/metadata.ts';

type BeDecoratedClass = Class<any>;
type params = {
  metadataKind: Kind;
  metadataClass: Class<any>;
  metadataParam: any;
  name: string;
  postConstruct?: PostConstructFn;
};
const decoratorParamMap: Map<BeDecoratedClass, params[]> = new Map();

/**
 * 记录装饰器参数
 * @param beDecoratedCls 被装饰的类
 * @param params
 */
export function recordDecoratorParams(
  beDecoratedCls: BeDecoratedClass,
  params: params
) {
  if (!decoratorParamMap.has(beDecoratedCls)) {
    decoratorParamMap.set(beDecoratedCls, []);
  }
  const paramsList = decoratorParamMap.get(beDecoratedCls);
  paramsList.push(params);
}

/**
 * 返回被装饰类的类装饰器以及类装饰器的类装饰器
 * @param cls
 * @param ignoreMetadataCls
 */
export function getClassAndClasClassDecorator(
  cls: BeDecoratedClass,
  ignoreMetadataCls: boolean = true
) {
  const params = decoratorParamMap.get(cls);
  if (!params) {
    if (__TEST__) {
      throw new Error(`${cls.name} has no decorator params`);
    }
  }
  const clsDecoratorList: Array<{
    metadataClass: Class<any>;
    metadataMetadataClassList: Array<Class<any>>;
  }> = [];
  if (ignoreMetadataCls && Object.getPrototypeOf(cls) === Metadata) {
    return clsDecoratorList;
  }
  params
    .filter((i) => i.metadataKind === KindClass)
    .forEach((i) => {
      // cls的类装饰器
      const metadataClass = i.metadataClass;
      // cls的类装饰器的类装饰器
      const metadataMetadataClassList = [];
      if (decoratorParamMap.has(metadataClass)) {
        const param = decoratorParamMap.get(metadataClass);
        param
          .filter((i) => i.metadataKind === KindClass)
          .forEach((i) => metadataMetadataClassList.push(i.metadataClass));
      }
      clsDecoratorList.push({
        metadataClass,
        metadataMetadataClassList,
      });
    });
  return clsDecoratorList;
}

export function get() {
  return decoratorParamMap;
}

export function clear() {
  decoratorParamMap.clear();
}