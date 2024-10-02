/**
 * ioc组件
 * 只有ioc组件才能实例化，所以view等注解都需要继承Component类
 */
import Metadata from "./metadata";
import {ClassContext, genDecorator} from "./export.ts";
import target, {TargetType} from "../decorator/target.ts";

export type BeanName = string | undefined

@target([TargetType.Class])
export class Component extends Metadata{}

export default genDecorator<BeanName, ClassContext>(Component)