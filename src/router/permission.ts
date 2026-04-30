/**
 * @name permission
 * @description 全局路由过滤、权限过滤
 */

import { router } from '.';
import { getToken, isFirstLoginPending } from '../utils/auth';
import { usePermissioStoreWithOut } from '/@/store/modules/permission';

const permissioStore = usePermissioStoreWithOut();
const whiteList = ['/login']; // no redirect whitelist

router.beforeEach(async (to: any, _, next) => {
  const hasToken = getToken();
  if (hasToken) {
    // 已登录
    if (to.path === '/login') {
      if (isFirstLoginPending()) {
        next({ path: '/first-login', replace: true });
      } else {
        next({ path: '/' });
      }
      return;
    }

    if (isFirstLoginPending() && to.path !== '/first-login') {
      next({ path: '/first-login', replace: true });
      return;
    }

    if (to.path === '/first-login') {
      if (!isFirstLoginPending()) {
        next({ path: '/', replace: true });
      } else {
        next();
      }
      return;
    }

    //是否获取过用户信息
    const isGetUserInfo = permissioStore.getIsGetUserInfo;
    if (isGetUserInfo) {
      next();
    } else {
      // 没有获取，请求数据
      await permissioStore.fetchAuths();
      // 过滤权限路由（仅门户 accessRoutes）；基础路由已包含门户路由时避免重复注册。
      const routes = await permissioStore.buildRoutesAction();
      routes.forEach((route) => {
        if (!route.name || !router.hasRoute(route.name)) {
          router.addRoute(route);
        }
      });
      next({ ...to, replace: true });
    }
  } else {
    // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next('/login');
    }
  }
});
