import { genDecorator } from 'coco-ioc-container';
import View from '../metadata/view.ts';

// todo 生命周期函数
export default genDecorator<
  string,
  ClassDecoratorContext | ClassMethodDecoratorContext
>(View, {
  optional: true,
});
