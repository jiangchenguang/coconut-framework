import router from '../decorator/router.ts';
import Route from '../metadata/route.ts';
import {
  type ApplicationContext,
  inject,
  init,
  start,
} from 'coco-ioc-container';
import RouteComponentMapper from './route-component-mapper.ts';
import Router from './router.ts';
import { Render } from 'coco-mvc/component';

@router()
@inject([Render])
class HistoryRouter extends Router {
  constructor(render: Render) {
    super();
    this.render = render;
  }

  handleRouteChange = () => {
    const pageComponent = this.routeComponentMapper.get(
      window.location.pathname
    );
    this.render.render(pageComponent);
  };

  @init()
  init(appCtx: ApplicationContext) {
    const routeComponentMap = appCtx.getByClassMetadata(Route) as Map<
      Class<any>,
      Route
    >;
    this.routeComponentMapper = new RouteComponentMapper();
    this.routeComponentMapper.init(routeComponentMap);
  }

  @start()
  addListener() {
    window.addEventListener('popstate', this.handleRouteChange);
    // 任意渲染一个路由，todo 后续添加默认路由设置
    const page = this.routeComponentMapper.getAny();
    if (page) {
      this.render.render(page);
    }
  }

  removeListener() {
    window.removeEventListener('popstate', this.handleRouteChange);
  }
}

export default HistoryRouter;
