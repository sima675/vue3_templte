# Vue3 Admin Template

一个用于演示和二次开发的后台模板，默认保留登录、权限路由、Pinia、Axios 封装、通用表格、筛选组件、Mock 数据和基础布局。

## 技术栈

- Vite 4
- Vue 3
- TypeScript
- Pinia
- Vue Router 4
- Ant Design Vue
- Less

## 当前保留内容

- 登录页和本地 Mock 登录流程
- 动态权限路由示例
- 工作台、基础列表、筛选列表、个人设置页面
- 通用 `Table`、`Modal`、`Alert`、`Breadcrumb` 等基础组件
- `mock/` 下的本地演示数据

## 快速开始

```sh
npm install
npm run dev
```

如使用 `pnpm`：

```sh
pnpm install
pnpm dev
```

## 演示账号

- `admin / 123456`
- `test / 123456`

## 目录说明

```txt
config/       全局配置和 Vite 配置
mock/         本地演示数据
public/       静态资源
src/api/      接口封装
src/components/ 通用组件
src/layouts/  布局组件
src/router/   路由与权限
src/store/    Pinia 状态管理
src/utils/    工具方法
src/views/    页面模块
```

## 使用建议

- 演示场景：保留 `mock`，直接使用默认账号登录。
- 接口联调：逐步替换 `src/api/` 和 `mock/`。
- 正式上线：根据环境关闭生产 `mock`，并整理依赖和类型检查链路。
