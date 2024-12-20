import {
  ClassContext,
  Metadata,
  genDecorator,
  component,
  target,
  Target,
  scope,
  Scope,
} from 'coco-ioc-container';

@target([Target.Type.Class, Target.Type.Method])
@scope(Scope.Type.Prototype)
@component()
export class View extends Metadata {}

export default genDecorator<string, ClassContext>(View, { optional: true });
