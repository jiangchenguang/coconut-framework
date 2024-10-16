export interface Class<T> {
  new (...args: any): T;
}

export { associateClassMetadata, associateFieldMetadata, getClsMetadata, getFields, clear } from "./metadata.ts";
export { createBean, getDefinition } from './bean-factory'
