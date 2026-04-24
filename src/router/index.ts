import { createRouter, createWebHistory } from 'vue-router';
import routes from './router.config';

// app router
export const router = createRouter({
  // 兼容部署在非根路径下的 history 路由
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
