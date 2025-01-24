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
    this.pathname = window.location.pathname;
    const pageComponent = this.routeComponentMapper.get(this.pathname);
    if (pageComponent) {
      this.render.render(pageComponent);
    } else {
      // todo 404 page
    }
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
    // 初始化渲染
    this.handleRouteChange();
  }

  removeListener() {
    window.removeEventListener('popstate', this.handleRouteChange);
  }

  public navigateTo(url: string) {
    window.history.pushState({}, '', url);
    this.handleRouteChange();
  }
}

export default HistoryRouter;
