import BasicLayout from '/@/layouts/BasicLayout/index.vue';
import BlankLayout from '/@/layouts/BlankLayout.vue';
import type { RouteRecordRaw } from 'vue-router';

export const accessRoutes: RouteRecordRaw[] = [
  {
    path: '/app',
    name: 'app',
    component: BasicLayout,
    redirect: '/app/contacts/favorites',
    meta: { title: '个人门户' },
    children: [
      {
        path: '/app/contacts',
        name: 'contacts',
        component: BlankLayout,
        redirect: '/app/contacts/favorites',
        meta: {
          title: '通讯录',
          icon: 'yonghuguanli',
        },
        children: [
          {
            path: '/app/contacts/favorites',
            name: 'contacts-favorites',
            component: () => import('/@/views/contacts/index.vue'),
            meta: { title: '常用联系人' },
          },
          {
            path: '/app/contacts/personal',
            name: 'contacts-personal',
            component: () => import('/@/views/contacts/index.vue'),
            meta: { title: '个人通讯录' },
          },
          {
            path: '/app/contacts/public',
            name: 'contacts-public',
            component: () => import('/@/views/contacts/index.vue'),
            meta: { title: '公共通讯录' },
          },
          {
            path: '/app/contacts/new',
            name: 'contacts-new',
            component: () => import('/@/views/contacts/Form.vue'),
            meta: { title: '新增联系人', hideInMenu: true },
          },
        ],
      },
      {
        path: '/app/hotel',
        name: 'hotel',
        component: BlankLayout,
        redirect: '/app/hotel/check-in',
        meta: {
          title: '酒店业务',
          icon: 'jiedianguanli',
        },
        children: [
          {
            path: '/app/hotel/check-in',
            name: 'hotel-check-in',
            component: () => import('/@/views/portal/Placeholder.vue'),
            meta: { title: '入住登记' },
          },
          {
            path: '/app/hotel/records',
            name: 'hotel-records',
            component: () => import('/@/views/portal/Placeholder.vue'),
            meta: { title: '入住记录' },
          },
          {
            path: '/app/hotel/calls',
            name: 'hotel-calls',
            component: () => import('/@/views/portal/Placeholder.vue'),
            meta: { title: '客房通话' },
          },
          {
            path: '/app/hotel/service',
            name: 'hotel-service',
            component: () => import('/@/views/portal/Placeholder.vue'),
            meta: { title: '客房服务' },
          },
          {
            path: '/app/hotel/rooms',
            name: 'hotel-rooms',
            component: () => import('/@/views/portal/Placeholder.vue'),
            meta: { title: '房间管理' },
          },
          {
            path: '/app/hotel/room-types',
            name: 'hotel-room-types',
            component: () => import('/@/views/portal/Placeholder.vue'),
            meta: { title: '房型管理' },
          },
          {
            path: '/app/hotel/locations',
            name: 'hotel-locations',
            component: () => import('/@/views/portal/Placeholder.vue'),
            meta: { title: '位置管理' },
          },
        ],
      },
      {
        path: '/app/operator',
        name: 'operator',
        component: BlankLayout,
        redirect: '/app/operator/calls',
        meta: {
          title: '话务台',
          icon: 'rili',
        },
        children: [
          {
            path: '/app/operator/calls',
            name: 'operator-calls',
            component: () => import('/@/views/portal/Placeholder.vue'),
            meta: { title: '话务台通话' },
          },
          {
            path: '/app/operator/night-service',
            name: 'operator-night-service',
            component: () => import('/@/views/portal/Placeholder.vue'),
            meta: { title: '夜服策略' },
          },
          {
            path: '/app/operator/console',
            name: 'operator-console',
            component: () => import('/@/views/portal/Placeholder.vue'),
            meta: { title: '话务控制台' },
          },
          {
            path: '/app/operator/overview',
            name: 'operator-overview',
            component: () => import('/@/views/portal/Placeholder.vue'),
            meta: { title: '数据概览' },
          },
        ],
      },
      {
        path: '/app/alarm',
        name: 'alarm',
        component: BlankLayout,
        redirect: '/app/alarm/tasks',
        meta: {
          title: '闹钟叫醒',
          icon: 'shurumimadenglu',
        },
        children: [
          {
            path: '/app/alarm/tasks',
            name: 'alarm-tasks',
            component: () => import('/@/views/alarm/Tasks.vue'),
            meta: { title: '闹钟任务管理' },
          },
          {
            path: '/app/alarm/logs',
            name: 'alarm-logs',
            component: () => import('/@/views/alarm/Logs.vue'),
            meta: { title: '闹钟任务日志' },
          },
        ],
      },
      {
        path: '/app/settings',
        name: 'settings',
        component: BlankLayout,
        redirect: '/app/settings/call-records',
        meta: {
          title: '个人设置',
          icon: 'xitongshezhi',
        },
        children: [
          {
            path: '/app/settings/call-records',
            name: 'settings-call-records',
            component: () => import('/@/views/settings/CallRecords.vue'),
            meta: { title: '通话记录' },
          },
          {
            path: '/app/settings/voicemail',
            name: 'settings-voicemail',
            component: () => import('/@/views/settings/Voicemail.vue'),
            meta: { title: '语音留言' },
          },
          {
            path: '/app/settings/profile',
            name: 'settings-profile',
            component: () => import('/@/views/settings/Profile.vue'),
            meta: { title: '信息维护' },
          },
          {
            path: '/app/settings/service',
            name: 'settings-service',
            component: () => import('/@/views/settings/Service.vue'),
            meta: { title: '业务设置' },
          },
          {
            path: '/app/settings/service/edit',
            name: 'settings-service-edit',
            component: () => import('/@/views/settings/ServiceEdit.vue'),
            meta: { title: '编辑业务设置', hideInMenu: true },
          },
        ],
      },
      {
        path: '/app/dialpad',
        name: 'dialpad',
        component: BlankLayout,
        redirect: '/app/dialpad/call',
        meta: {
          title: '普通拨号键盘',
          icon: 'shoujihaodenglu',
        },
        children: [
          {
            path: '/app/dialpad/call',
            name: 'dialpad-call',
            component: () => import('/@/views/portal/Placeholder.vue'),
            meta: { title: '通话操作' },
          },
        ],
      },
    ],
  },
];

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('/@/views/login/index.vue'),
    name: 'login',
    meta: { title: '登录' },
  },
  {
    path: '/',
    name: 'Root',
    redirect: '/app',
    meta: {
      title: 'Root',
    },
  },
  // ...accessRoutes,
];

export const publicRoutes = [
  {
    path: '/redirect',
    component: BlankLayout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('/@/views/redirect/index'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
  {
    path: '/404',
    component: () => import('/@/views/404.vue'),
  },
];

// /**
//  * 基础路由
//  * @type { *[] }
//  */
// export const constantRouterMap = [];

export default constantRoutes;
