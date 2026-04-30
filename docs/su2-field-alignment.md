# SU2 字段对齐说明

原则：`src/api/su2/*` 和 `mock/su2.ts` 的字段名按接口文档原样保留。页面展示需要的短字段名，只能在页面层或 adapter 层转换。

## 登录

接口：`POST /webapi/portal/login/account`

请求字段：

| 文档字段 | 说明 |
| --- | --- |
| `acc` | 登录账号，例如 `8000` |
| `passwd` | RSA 加密后的应用密码 |
| `clientType` | 固定可传 `portal` |

返回字段：

| 文档字段 | 说明 |
| --- | --- |
| `token` | 登录 token |
| `user.id` | 用户 ID |
| `user.sipExtension` | SIP 分机号 |
| `user.ifFirstLogin` | 是否首次登录 |
| `sipPwd` | SIP 密码 |
| `sipProfile` | SIP profile |

## 用户信息

接口：`GET /webapi/portal/user/user-info`

文档字段：

| 字段 | 页面含义 |
| --- | --- |
| `id` | 用户 ID |
| `extensionNo` | 分机号 |
| `photo` | 头像文件名 |
| `firstName` | 名 |
| `lastName` | 姓 |
| `callerName` | 主叫名 |
| `organization` | 组织 |
| `department` | 部门 |
| `position` | 职位 |
| `mailbox` | 邮箱 |
| `gender` | 性别 |
| `phoneNumber` | 手机号码 |
| `alternatePhoneNumber` | 备用手机 |
| `fixedPhoneNumber` | 家庭/固定号码 |
| `officePhoneNumber` | 办公号码 |
| `faxPhoneNumber` | 传真号码 |
| `address` | 地址 |
| `remarks` | 备注 |
| `enable` | 启用状态 |
| `sipId` | SIP ID |

页面展示如果需要 `姓名`，用 `lastName + firstName` 组合，不新增接口字段 `name`。

## 通讯录联系人

列表接口：`POST /webapi/portal/account/address-book/contacts/list`

新增接口：`POST /webapi/portal/account/address-book/contacts`

编辑接口：`PUT /webapi/portal/account/address-book/batchContacts`

删除接口：`DELETE /webapi/portal/account/address-book/contacts`

文档字段：

| 字段 | 页面含义 |
| --- | --- |
| `id` | 联系人 ID |
| `photo` | 头像文件名 |
| `groups` | 分组数组 |
| `firstName` | 名 |
| `lastName` | 姓 |
| `extensionNo` | 分机号 |
| `callerName` | 主叫名 |
| `gender` | 性别 |
| `position` | 职位 |
| `mailbox` | 邮箱 |
| `department` | 部门 |
| `organization` | 组织 |
| `phoneNumber` | 手机号码 |
| `alternatePhoneNumber` | 备用手机 |
| `fixedPhoneNumber` | 家庭/固定号码 |
| `officePhoneNumber` | 办公号码 |
| `faxPhoneNumber` | 传真号码 |
| `address` | 地址 |
| `remarks` | 备注 |
| `isCollect` | 是否收藏 |
| `initial` | 首字母 |
| `frequentContactId` | 常用联系人 ID |

当前静态页字段对应关系：

| 静态页字段 | 接口文档字段 |
| --- | --- |
| `name` | `lastName + firstName` |
| `phone` / `mobile` | `phoneNumber` |
| `officePhone` | `officePhoneNumber` |
| `group` | `groups` |
| `email` | `mailbox` |
| `backupMobile` | `alternatePhoneNumber` |
| `homePhone` | `fixedPhoneNumber` |
| `fax` | `faxPhoneNumber` |
| `remark` | `remarks` |

## 通话记录

接口：`POST /webapi/portal/cdr/page`

文档字段：

| 字段 | 页面含义 |
| --- | --- |
| `destination_number` | 对方号码 |
| `direction` | 呼叫方向，例：`out` |
| `duration` | 通话时长，文档中为秒字符串 |
| `start_time` | 通话开始时间 |
| `end_time` | 通话结束时间 |
| `record_file` | 录音文件 |
| `hangup_cause` | 挂断原因 |
| `name` | 姓名/显示名 |
| `department` | 部门 |
| `uuid` | 记录 UUID，备注接口使用 |
| `cdrType` | 通话类型值 |
| `cdrTypeName` | 通话类型名称 |
| `remark` | 备注 |
| `sip` | 当前用户 SIP |
| `photo` | 头像文件名 |
| `extension` | 分机号 |
| `room_number` | 房间号 |
| `guest_name` | 住客姓名 |

当前静态页字段对应关系：

| 静态页字段 | 接口文档字段 |
| --- | --- |
| `id` | `uuid` |
| `org` | 优先 `department`，没有则显示 `organization` 的页面扩展值 |
| `startTime` | `start_time` |
| `direction` | `direction` |
| `duration` | `duration` |

## 语音留言/语音邮箱

语音留言接口：`POST /webapi/portal/message/page`

语音邮箱接口：`POST /webapi/portal/voicemail/page`

文档返回分页字段：

| 字段 | 说明 |
| --- | --- |
| `total` | 总数 |
| `pageSize` | 每页条数 |
| `pageNum` | 当前页 |
| `records` | 记录列表，可能为 `null` |
| `count` | 计数 |

## 业务设置

查询接口：`GET /webapi/portal/user/business`

保存接口：`PUT /webapi/portal/user/business`

文档字段：

| 字段 | 页面含义 |
| --- | --- |
| `extension` | 分机号 |
| `voicemail` | 语音邮箱开关，`on/off` |
| `voicemail_passwd` | 邮箱密码 |
| `voicemail_greeting` | 个人邮箱提示语文件 |
| `forward_uncondition` | 无条件呼叫转移 |
| `forward_uncondition_dst` | 无条件转移目标 |
| `forward_unregister` | 未注册呼叫转移 |
| `forward_unregister_dst` | 未注册转移目标 |
| `forward_busy` | 遇忙呼叫转移 |
| `forward_busy_dst` | 遇忙转移目标 |
| `forward_noreply` | 无应答呼叫转移 |
| `forward_noreply_dst` | 无应答转移目标 |
| `forward_noreply_timeout` | 无应答超时 |
| `strategy` | 振铃策略 |
| `ring_seque` | 终端振铃顺序 |
| `apply` | 应用端状态 |
| `promptName` | 提示语名称 |

当前静态页字段对应关系：

| 静态页字段 | 接口文档字段 |
| --- | --- |
| `mailboxPassword` | `voicemail_passwd` |
| `prompt` | `voicemail_greeting` 或 `promptName` |
| `unconditional` | `forward_uncondition` |
| `unregistered` | `forward_unregister` |
| `busy` | `forward_busy` |
| `noAnswer` | `forward_noreply` |
| `ringStrategy` | `strategy` |
| `sipOrder` / `appOrder` | `ring_seque` |

## 闹钟任务

任务列表接口：`GET /webapi/portal/alarm/list`

新增接口：`POST /webapi/portal/alarm/add`

编辑接口：`PUT /webapi/portal/alarm/edit`

停止接口：`PUT /webapi/portal/alarm/stop`

文档字段：

| 字段 | 页面含义 |
| --- | --- |
| `id` | 任务 ID |
| `name` | 任务名称 |
| `tone` | 闹钟语音 ID |
| `status` | 状态 |
| `start_time` | 有效期开始 |
| `end_time` | 有效期结束 |
| `descript` | 备注 |
| `sip` | 分机数组 |
| `run_time` | 执行时间 |
| `repeat_rate` | 重复频率 |
| `circulation_type` | 循环类型 |
| `circulation` | 循环值 |
| `faild_count` | 失败次数，文档拼写为 `faild_count` |

当前静态页字段对应关系：

| 静态页字段 | 接口文档字段 |
| --- | --- |
| `extension` | `sip.join(',')` |
| `nextTime` | `run_time` |
| `typeLabel` | 由 `circulation_type` 映射 |
| `validDate` | `start_time/end_time` |
| `remark` | `descript` |

## 闹钟日志

接口：`GET /webapi/portal/alarm/logs`

文档字段：

| 字段 | 页面含义 |
| --- | --- |
| `at` | 时间 |
| `alarm_id` | 闹钟任务 ID |
| `taskName` | 任务名称 |
| `eventType` | 操作类型 |
| `msg` | 消息 |
| `userSip` | 操作用户 SIP |
| `firstName` | 操作用户名 |
| `lastName` | 操作用户姓 |
| `sip` | 分机号 |
