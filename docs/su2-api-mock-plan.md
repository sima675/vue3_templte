# SU2 API mock 接入分析

来源文档：`C:/Users/nbu07/Desktop/电话系统/SU2 api接口文档-分机用户.docx`

## 文档结论

文档接口统一前缀基本是 `/webapi/portal/*`，返回格式主要是：

```json
{ "status": true, "data": {} }
```

这和当前模板已有接口格式不同：

```json
{ "code": 0, "result": {}, "message": "ok" }
```

所以项目接 SU2 时，不能只新增 mock 数据，还要让 `src/utils/http.ts` 兼容 SU2 返回格式。当前已改成同时支持两种格式。

## 已覆盖的 mock 模块

当前新增 `mock/su2.ts`，先覆盖现有页面最可能用到的接口：

- 登录基础：logo、语言、设备类型、登录 key、账号登录、退出、SIP 地址
- 用户中心：用户信息、首次登录、编辑基础信息、编辑其他信息、改 SIP 密码、改应用密码、密码强度
- 密保问题：列表、当前用户问题、忘记密码校验、更新问题
- 通讯录：分组、联系人列表、新增/编辑/删除联系人、常用联系人、公共联系人
- 文件上传：头像、提示语文件
- 呼叫/队列：队列列表、签入、在线分机、SIP 分机列表、夜服状态、通话监控
- 个人设置：通话记录、通话备注、语音留言、语音邮箱、业务设置、提示语
- 闹钟：语音列表、任务列表、新增、编辑、停止、日志

酒店业务、完整话务台、房间/房型/位置等接口文档里也有，但当前静态页面还没有明显落点，建议等对应页面开始接数据时再按真实字段补 mock，避免一次性维护大量暂时不用的数据。

## 前端调用建议

页面不要直接写接口 URL。按模块在 `src/api/*.ts` 里封装业务方法，例如通讯录已经封装在 `src/api/contacts.ts`：

```ts
import { post } from '/@/utils/http';
import type { Su2ContactPayload } from './su2/model';

export function apiQuery(data: { groups?: string | null; condition?: string | null }) {
  post({ url: '/webapi/portal/account/address-book/contacts/list', data });
}

export function apiAdd(data: Su2ContactPayload) {
  post({ url: '/webapi/portal/account/address-book/contacts', data });
}
```

页面只调用 `apiQuery/apiAdd/apiEdit/apiDel` 这类方法，不关心 mock 还是真实环境。

开发环境下 `.env.development` 的 `VITE_API_BASE_URL=/api`，请求会变成 `/api/webapi/portal/...`。当前开发环境启用 vite mock，本地接口由 `mock/*.ts` 响应；如果某个接口没有 mock 命中，再由 Vite proxy 转发到 `https://192.168.10.30`。

生产环境已经关闭 mock。后期真实环境只改 `.env.production` 的 `VITE_API_BASE_URL`，例如：

```bash
VITE_API_BASE_URL = https://example.com
```

如果生产环境由 nginx 反向代理同源接口，也可以保持空值，让请求直接走当前域名下的 `/webapi/portal/...`。

## 后续切真实接口

等公网接口可用后，建议只改：

- `config/constant.ts` 中的 `API_TARGET_URL`
- 必要时调整 `config/vite/proxy.ts` 的代理目标
- 关闭或限制生产环境 mock：`config/vite/plugin/mock.ts` 里的 `prodEnabled`

页面调用层和接口路径不需要大改。
