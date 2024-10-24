export * from './decorator-context.ts';

import {default as Metadata} from './metadata';
import {default as component, Component} from './component';
import {default as target, Target} from './target';
import genDecorator from "./decorator.ts";

export {
  Metadata,
  component,
  Component,
  target,
  Target,
  genDecorator,
}