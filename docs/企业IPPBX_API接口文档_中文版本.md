# 企业IPPBX

# API接口文档

# 适用：支持计算机软件应用开发

# 适用产品型号	企业IPPBX

产品软件版本	x.57.2.6、x.58.2.4以上版本

# 文档版本	V1.0

作者	
完成日期	

# 目录

# 企业IPPBX	1

# API接口文档	1

## 1. API 概述	3

## 1.1API接口简介	3

## 1.2适用对象	4

## 1.2.1文档修订记录	4

## 1.2.2文档约定	5

2 快速入门指南	5

## 2.1获取未应用配置	5

## 2.2 配置应用	6

## 2.3 放弃配置	6

3 API验证	7

## 3.1登录	7

5、 使用加密后的密码进行登录，设备将会返回一个令牌	8
6、 在后续请求中，将该令牌设置到cookie中发起请求即可。	9

## 3.2 登出	9

4 API接口	9

## 4.1 SIP分机	9

## 4.1.1 查询SIP分机注册状态	9

## 4.1.2 查询分机配置	11

## 4.1.3 新建分机	14

## 4.1.4 修改分机配置	15

## 4.1.5 删除分机配置	17

请求地址	17

## 4.2号码规则	18

## 4.2.1查询号码规则配置	18

## 4.2.2新建号码规则配置	20

## 4.2.3修改号码规则配置	22

## 4.2.4删除号码规则配置	23

请求地址	23

## 4.3闹铃	24

## 4.3.1查询闹铃配置	24

## 4.3.2新建闹铃配置	26

## 4.3.3修改闹铃配置	27

## 4.3.4删除闹铃配置	28

请求地址	28

## 4.4禁止号码/黑名单	29

## 4.4.1查询禁止号码	29

## 4.4.2新建禁止号码	30

## 4.4.3修改禁止号码	31

## 4.4.4删除黑名单配置	33

请求地址	33

## 4.5系统提示音	34

## 4.5.1查询系统提示音	34

请求地址	34

## 4.6会议室	36

## 4.6.1查询会议室	36

## 4.6.2新建会议室	39

## 4.6.3修改会议室	40

## 4.6.4查询会议室状态	42

## 4.6.5邀请成员加入会议室	44

## 4.6.6会议室成员静音	45

## 4.6.7会议室成员解除静音	46

请求地址	46

## 4.7通话	46

## 4.7.1 查询当前通话状态	46

## 4.7.2发起呼叫	47

## 4.7.3拆线	50

## 4.7.4呼叫转接	50

## 4.7.5呼叫保持	51

## 4.7.6解除呼叫保持	51

## 4.7.7监听	52

请求地址	52

## 4.8事件推送	53

## 4.8.1话单推送	53

## 4.8.2 呼叫状态推送	55

## 4.8.3 MiniBar	57

## 4.8.4 房间清洁状态	59

请求地址	59

## 4.9话单查询	61

## 4.9.1查询设备当前话单	61

请求地址	61
请求参数	61
响应参数	61
示例	61

## 1. API 概述

## 1.1API接口简介

# 企业IPPBX产品对外提供开放API接口，开发者可通过API接口对产品进行控制、监控以及数据统计等操作。API接口应用于服务器于IPPBX产品之间，通过http协议进行通信。

API接口 使IPPBX 设备具备更大的灵活性和可操作性，开发者可利用 API 对接 IPPBX 设备或开发通讯应用程序。

## 1.2适用对象

```
本文档适用下列人员阅读：
```

研发人员
服务器对接IPPBX进行研发调试的工程师
运维工程师

## 1.2.1文档修订记录

文档名称	文档版本	作者	日期	软件版本

# 企业IPPBX_API接口文档	V1.0		2023/07/27	x.58.2.4

# 文档版本	作者	日期	备注

V1.0	韩霄	2025/07/28	初稿（基于之前API文档修改）
			

2025/07/28
1、新增会议室API接口
2、新增通话API接口
3、新增系统提示音AIP接口
4、调整API文档格式

## 1.2.2文档约定

该文档随着产品接口开发而实时更新，用户在使用该文档时，遇到不能满足业务需求的情况，请直接联系技术人员。另外，文档中红色字体标注地方需要用户特别注意。
2 快速入门指南
说明：在使用API接口进行配置修改的操作，需要在配置后进行“应用”操作，在配置应用后才能生效。

## 2.1获取未应用配置

请求地址
 ${设备地址}/api_v2/get_changes	--cookie sysauth=${令牌}

## 2.2 配置应用

请求地址
${设备地址}/api_v2/apply_changes		--cookie sysauth=${令牌}
curl 172.25.35.31/api_v2/apply_changes --cookie sysauth=e79ea86d5cf2a04ab38af9edb0b162ab -s
Success=Checking config,Conference%

说明：应用过程中，根据修改配置的多少，应用时间长短不定，请耐心等待结果返回。当修改多项配置时，建议等所有修改都提交后，最后再一次性应用，以便提高效率

## 2.3 放弃配置

请求地址
${设备地址}/api_v2/revert_changes		--cookie sysauth=${令牌}
curl 172.25.35.31/api_v2/revert_changes --cookie sysauth=e79ea86d5cf2a04ab38af9edb0b162ab -s
Success%

3 API验证
	在服务器与IPPBX产品进行API接口通信时，需要先进行安全认证，具体认证流程说明如下。

## 3.1登录

1、先到系统->API页面，启用API功能，并设置密码

2、往服务器发起GET请求

GET http:// ${设备IP}/api_v2/login

注：设备默认关闭了http访问，可以先在网络->访问控制页面开启http访问，或者	使用https发起请求。

3、设备返回一个加密盐，如：yTbhSgjU

4、计算将步骤1在api页面中的密码与获得的加密盐，进行md5加盐计算

注：这里的md5加盐算法，是标准linux密码的加盐md5,英文算法全名叫“MD5 based BSD password algorithm”,可参考[https://asecuritysite.com/encryption/opensslp](https://asecuritysite.com/encryption/opensslp)

5、使用加密后的密码进行登录，设备将会返回一个令牌

```
  GET http://${设备地址}/api/login?password=${加盐计算后的密码}
```

6、在后续请求中，将该令牌设置到cookie中发起请求即可。

## 3.2 登出

1、 GET http://${设备地址}/api_v2/logout
curl 172.25.35.31/api_v2/logout --cookie sysauth=eb72e6e89b18bf302b0e904c4e2b43e4
Logout Success !%

4 API接口

## 4.1 SIP分机

## 4.1.1 查询SIP分机注册状态

查询当前在线的分机状态
请求地址
${设备地址}/api_v2/extension/status
请求参数
通过HTTP GET 方式请求，无参数
响应参数

选项名	类型	描述
status	字符串	请求结果
succ： 成功
fail：失败
result	对象/字符串	若成功，值为包含结果的对象
失败，则以字符串方式说明具体失败原因

选项名	类型	描述
user	数字	分机号
address	字符串	注册来源IP:注册端口
dnd	字符串	是否开启了免打扰  on/off
user_agent	字符串	注册客户端信息
status	字符串	注册状态详情，TCP或UDP或TLS，是否跨NAT

示例

注：该接口仅列出已注册的分机，已配置但未注册的，不会列出

## 4.1.2 查询分机配置

查询当前在线的分机状态
请求地址
${设备地址}/api_v2/extension/list
请求参数
通过HTTP GET 方式请求，无参数
响应参数

选项名	类型	描述
status	字符串	请求结果
succ： 成功
fail：失败
result	对象/字符串	若成功，值为包含结果的对象
失败，则以字符串方式说明具体失败原因

选项名	类型	描述
index	数字	索引值，该分机信息的索引id，作为后续的修改，删除操作依据
extension	数字	分机号，不能与已有的分机号重复
name	字符串	分机名称
dnd	字符串	是否开启免打扰 ， on/off
voicemail	字符串	是否开启语音信箱留言，on/off
callout_filter	字符串	是否开启呼出过滤，常用于呼出的权限控制
off：关闭，允许外呼所有号码
blacklist：按黑名单规则过滤，不允许外呼规则里的号码
whitelist：按白名单规则过滤，只允许呼规则里的号码
callout_filter_whitelist	数组	引用的白名单规则，仅callout_filter值为whitelist时有效，可引用多条，例如同时叠加本地号码规则，国内号码规则等
status	字符串	是否开启该分机，on/off
profile	数字	该分机使用的sip配置(web页面的配置-sip)索引

示例

## 4.1.3 新建分机

新建一个分机
请求地址
${设备地址}/api_v2/extension/create
请求参数
通过HTTP POST 方式请求
选项名	类型	描述
index	数字	索引值，指定该分机的索引值，留空会自动创建
extension	数字	分机号，不能与已有的分机号重复
name	字符串	分机名称
dnd	字符串	是否开启免打扰 ， on/off
voicemail	字符串	是否开启语音信箱留言，on/off
callout_filter	字符串	是否开启呼出过滤，常用于呼出的权限控制
off：关闭，允许外呼所有号码
blacklist：按黑名单规则过滤，不允许外呼规则里的号码
whitelist：按白名单规则过滤，只允许呼规则里的号码
callout_filter_whitelist	数组	引用的白名单规则，仅callout_filter值为whitelist时有效，可引用多条，例如同时叠加本地号码规则，国内号码规则等
status	字符串	是否开启该分机，on/off
profile	数字	该分机使用的sip配置(web页面的配置-sip)索引

响应参数

选项名	类型	描述
status	字符串	请求结果
succ： 成功
fail：失败
result	字符串	若失败，则以字符串方式说明具体失败原因

示例
待补充示例图片

## 4.1.4 修改分机配置

修改当前分机的配置
请求地址
${设备地址}/api_v2/extension/edit
请求参数
通过HTTP POST 方式请求
选项名	类型	描述
index	数字	索引值，该分机信息的索引id，必选
extension	数字	分机号，不能与已有的分机号重复
name	字符串	分机名称
dnd	字符串	是否开启免打扰 ， on/off
voicemail	字符串	是否开启语音信箱留言，on/off
callout_filter	字符串	是否开启呼出过滤，常用于呼出的权限控制
off：关闭，允许外呼所有号码
blacklist：按黑名单规则过滤，不允许外呼规则里的号码
whitelist：按白名单规则过滤，只允许呼规则里的号码
号码规则为web页面菜单上“配置”->"号码" 页面里的配置，也可以通过3.1 查询号码规则api获取
callout_filter_whitelist	数组	引用的白名单规则，仅callout_filter值为whitelist时有效，可引用多条，例如同时叠加本地号码规则，国内号码规则等
status	字符串	是否开启该分机，on/off
profile	数字	该分机使用的sip配置(web页面的配置-sip)索引

响应参数

选项名	类型	描述
status	字符串	请求结果
succ： 成功
fail：失败
result	字符串	若失败，则以字符串方式说明具体失败原因

示例
修改索引id为1的分机名称为test，其余信息不变

## 4.1.5 删除分机配置

删除指定分机的配置
请求地址
${设备地址}/api_v2/extension/delete
请求参数
通过HTTP POST 方式请求
选项名	类型	描述
index	数字	要删除的分机的索引值

响应参数

选项名	类型	描述
status	字符串	请求结果
succ： 成功
fail：失败
result	字符串	若失败，则以字符串方式说明具体失败原因
示例
待补充

## 4.2号码规则

## 4.2.1查询号码规则配置

请求地址
${设备地址}/api_v2/number/list
请求参数
通过HTTP GET 方式请求，无参数
响应参数

选项名	类型	描述
status	字符串	请求结果
succ： 成功
fail：失败
result	对象/字符串	若成功，值为包含结果的对象
失败，则以字符串方式说明具体失败原因

选项名	类型	描述
index	数字	索引值，该号码规则的索引id，作为后续的修改，删除操作依据
name	字符串	规则名称
caller	数组	主叫号码规则，通常用于呼入时匹配使用，支持正则表达式
called	数组	被叫好吗规则，通常用户呼出时匹配使用，支持正则表达式
示例

## 4.2.2新建号码规则配置

新建一条号码规则
请求地址
${设备地址}/api_v2/number/create
请求参数
通过HTTP POST 方式请求
选项名	类型	描述
index	数字	索引值，指定该规则的索引值，留空会自动创建
name	字符串	规则名称
caller	数组	主叫号码规则，通常用于呼入时匹配使用，支持正则表达式
called	数组	被叫好吗规则，通常用户呼出时匹配使用，支持正则表达式
响应参数

选项名	类型	描述
status	字符串	请求结果
succ： 成功
fail：失败
result	字符串	若失败，则以字符串方式说明具体失败原因
示例
待补充

## 4.2.3修改号码规则配置

修改一条号码规则
请求地址
${设备地址}/api_v2/number/edit
请求参数
通过HTTP POST 方式请求

选项名	类型	描述
index	数字	指定要修改的规则的索引值
name	字符串	规则名称
caller	数组	主叫号码规则，通常用于呼入时匹配使用，支持正则表达式
called	数组	被叫好吗规则，通常用户呼出时匹配使用，支持正则表达式

响应参数

选项名	类型	描述
status	字符串	请求结果
succ： 成功
fail：失败
result	字符串	若失败，则以字符串方式说明具体失败原因
示例
待补充

## 4.2.4删除号码规则配置

删除指定的号码规则
请求地址
${设备地址}/api_v2/number/delete
请求参数
通过HTTP POST 方式请求
选项名	类型	描述
index	数字	要删除的号码规则的索引值
响应参数

选项名	类型	描述
status	字符串	请求结果
succ： 成功
fail：失败
result	字符串	若失败，则以字符串方式说明具体失败原因
示例
待补充

## 4.3闹铃

## 4.3.1查询闹铃配置

请求地址
${设备地址}/api_v2/alarm/list
请求参数
通过HTTP GET 方式请求，无参数
响应参数

选项名	类型	描述
status	字符串	请求结果
succ： 成功
fail：失败
result	对象/字符串	若成功，值为包含结果的对象
失败，则以字符串方式说明具体失败原因

选项名	类型	描述
index	数字	索引值，该闹铃规则的索引id，作为后续的修改，删除操作依据
number	数字	要振铃的分机号
tone	数字	该闹钟所使用的系统提示音编号
time	字符串	闹铃的生效时间，格式为 HH:MM
ringtime	数字	闹铃的振铃时长
status	字符串	状态， on/off
示例

## 4.3.2新建闹铃配置

新建一条闹铃配置
请求地址
${设备地址}/api_v2/alarm/create
请求参数
通过HTTP POST 方式请求

选项名	类型	描述
index	数字	索引值，指定闹铃规则的索引id，作为后续的修改，删除操作依据
number	数字	要振铃的分机号
tone	数字	该闹钟所使用的系统提示音名称，可通过 /tone/list接口查询
time	字符串	闹铃的生效时间，格式为 HH:MM
ringtime	数字	闹铃的振铃时长
status	字符串	状态， on/off
响应参数

选项名	类型	描述
status	字符串	请求结果
succ： 成功
fail：失败
result	字符串	若失败，则以字符串方式说明具体失败原因
示例
待补充

## 4.3.3修改闹铃配置

修改闹铃规则
请求地址
${设备地址}/api_v2/alarm/edit
请求参数
通过HTTP POST 方式请求
选项名	类型	描述
index	数字	指定要修改的规则的索引值
number	数字	要振铃的分机号
tone	字符串	该闹钟所使用的系统提示音名，可通过 /tone/list接口查询
time	字符串	闹铃的生效时间，格式为 HH:MM
ringtime	数字	闹铃的振铃时长
status	字符串	状态， on/off

响应参数

选项名	类型	描述
status	字符串	请求结果
succ： 成功
fail：失败
result	字符串	若失败，则以字符串方式说明具体失败原因

示例
待补充

## 4.3.4删除闹铃配置

删除指定的闹铃规则
请求地址
${设备地址}/api_v2/alarm/delete
请求参数
通过HTTP POST 方式请求
选项名	类型	描述
index	数字	要删除的号码规则的索引值
响应参数

选项名	类型	描述
status	字符串	请求结果
succ： 成功
fail：失败
result	字符串	若失败，则以字符串方式说明具体失败原因
示例
待补充

## 4.4禁止号码/黑名单

## 4.4.1查询禁止号码

请求地址
${设备地址}/api_v2/blocked_numbers/list

请求参数 
通过HTTP GET 方式请求，无参数

响应参数
选项名	类型	描述
index	数字	索引值，该黑名单规则的索引id，作为后续的修改，删除操作依据
name	字符串	黑名单规则名称
number	数组	号码规则，支持正则表达式
type	字符串	该规则的匹配类型
   inbound：仅对呼入生效
   outbound：仅对呼出生效
   both：呼入呼出都生效
status	字符串	状态， on/off
示例
待补充

## 4.4.2新建禁止号码

新建一条禁止号码配置
请求地址
${设备地址}/api_v2/ blocked_numbers/create

请求参数
通过HTTP POST 方式请求
选项名	类型	描述
index	数字	索引值，该黑名单规则的索引id，作为后续的修改，删除操作依据
name	字符串	黑名单规则名称
number	数组	号码规则，支持正则表达式
type	字符串	该规则的匹配类型
   inbound：仅对呼入生效
   outbound：仅对呼出生效
   both：呼入呼出都生效
status	字符串	状态， on/off

响应参数

选项名	类型	描述
status	字符串	请求结果
   succ： 成功
   fail：失败
result	字符串	若失败，则以字符串方式说明具体失败原因
示例
待补充

## 4.4.3修改禁止号码

请求地址
${设备地址}/api_v2/ blocked_numbers/edit

请求参数
通过HTTP POST 方式请求

选项名	类型	描述
index	数字	索引值，该黑名单规则的索引id，作为后续的修改，删除操作依据
name	字符串	黑名单规则名称
number	数组	号码规则，支持正则表达式
type	字符串	该规则的匹配类型
   inbound：仅对呼入生效
   outbound：仅对呼出生效
   both：呼入呼出都生效
status	字符串	状态， on/off

响应参数

选项名	类型	描述
status	字符串	请求结果
   succ： 成功
   fail：失败
result	字符串	若失败，则以字符串方式说明具体失败原因

示例
待补充

## 4.4.4删除黑名单配置

删除已有黑名单配置
请求地址
${设备地址}/api_v2/ blocked_numbers/delete

请求参数
通过HTTP POST 方式请求
选项名	类型	描述
index	数字	要删除的号码规则的索引值

响应参数

选项名	类型	描述
status	字符串	请求结果
   succ： 成功
   fail：失败
result	字符串	若失败，则以字符串方式说明具体失败原因
示例
待补充

## 4.5系统提示音

## 4.5.1查询系统提示音

查询系统提示音(对应web页面菜单“系统”->“语音”)信息，方便在闹铃配置中引用
请求地址
${设备地址}/api_v2/tone/list

请求参数
通过HTTP GET 方式请求，无参数

响应参数

选项名	类型	描述
status	字符串	请求结果
   succ： 成功
   fail：失败
result	对象/字符串	若成功，值为包含结果的对象
   失败，则以字符串方式说明具体失败原因

选项名	类型	描述
indexname	字符串	索引名称，在闹铃配置中的提示音选项中使用
name	字符串	该提示音的名称
description	字符串	该提示音的描述信息
示例

## 4.6会议室

## 4.6.1查询会议室

请求地址
${设备地址}/api_v2/ conference /list

请求参数
通过HTTP GET 方式请求，无参数

响应参数

选项名	类型	描述
status	字符串	请求结果
   succ： 成功
   fail：失败
result	对象/字符串	若成功，值为包含结果的对象
   失败，则以字符串方式说明具体失败原因

选项名	类型	描述
index	数字	会议室编号索引，范围1-32
name	字符串	会议室名称
number	数字	会议室号码，不能与当前所有的分机号，DID，振铃组号码，寻呼组号码及其它会议室号码重复
public_mode	字符串	是否公共模式，公共模式下无需密码即可进入。true/false
password	数字	当会议室不是公共模式时的验证密码，只能使用数字0-9或星号*，最大不超过32位
admin_password	数字	管理员密码，当会议室不是公共模式时验证管理员身份使用，只能使用数字0-9或星号*，最大不超过32位
quiet_mode	字符串	是否开启安静模式，若开启安静模式，将不会播放任何广播语音。true/false
wait_admin	字符串	是否等待管理员，待管理员进入会议后，会议才开始，否则处于空闲状态。true/false
play_waiting_music_when_idle	字符串	空闲时是否播放等待音乐。true/false
enable_menu	字符串	是否启用菜单，启用后，所有成员可使用dtmf菜单。 true/false
enable_invite	字符串	启用菜单情况下，非管理员是否可以通过dtmf菜单邀请成员进会议室
示例
待补充

## 4.6.2新建会议室

请求地址
${设备地址}/api_v2/ conference/create

请求参数
通过HTTP POST 方式请求

选项名	类型	描述
index	数字	会议室编号索引，范围1-32
name	字符串	会议室名称
number	数字	会议室号码，不能与当前所有的分机号，DID，振铃组号码，寻呼组号码及其它会议室号码重复
public_mode	字符串	是否公共模式，公共模式下无需密码即可进入。true/false
password	数字	当会议室不是公共模式时的验证密码，只能使用数字0-9或星号*，最大不超过32位
admin_password	数字	管理员密码，当会议室不是公共模式时验证管理员身份使用，只能使用数字0-9或星号*，最大不超过32位
quiet_mode	字符串	是否开启安静模式，若开启安静模式，将不会播放任何广播语音。true/false
wait_admin	字符串	是否等待管理员，待管理员进入会议后，会议才开始，否则处于空闲状态。true/false
play_waiting_music_when_idle	字符串	空闲时是否播放等待音乐。true/false
enable_menu	字符串	是否启用菜单，启用后，所有成员可使用dtmf菜单。 true/false
enable_invite	字符串	启用菜单情况下，非管理员是否可以通过dtmf菜单邀请成员进会议室

响应参数

选项名	类型	描述
status	字符串	请求结果
   succ： 成功
   fail：失败
result	字符串	若失败，则以字符串方式说明具体失败原因
示例
待补充

## 4.6.3修改会议室

请求地址
${设备地址}/api_v2/ conference/edit

请求参数
通过HTTP POST 方式请求
选项名	类型	描述
index	数字	会议室编号索引，范围1-32
name	字符串	会议室名称
number	数字	会议室号码，不能与当前所有的分机号，DID，振铃组号码，寻呼组号码及其它会议室号码重复
public_mode	字符串	是否公共模式，公共模式下无需密码即可进入。true/false
password	数字	当会议室不是公共模式时的验证密码，只能使用数字0-9或星号*，最大不超过32位
admin_password	数字	管理员密码，当会议室不是公共模式时验证管理员身份使用，只能使用数字0-9或星号*，最大不超过32位
quiet_mode	字符串	是否开启安静模式，若开启安静模式，将不会播放任何广播语音。true/false
wait_admin	字符串	是否等待管理员，待管理员进入会议后，会议才开始，否则处于空闲状态。true/false
play_waiting_music_when_idle	字符串	空闲时是否播放等待音乐。true/false
enable_menu	字符串	是否启用菜单，启用后，所有成员可使用dtmf菜单。 true/false
enable_invite	字符串	启用菜单情况下，非管理员是否可以通过dtmf菜单邀请成员进会议室

响应参数

选项名	类型	描述
status	字符串	请求结果
   succ： 成功
   fail：失败
result	字符串	若失败，则以字符串方式说明具体失败原因
示例
待补充

## 4.6.4查询会议室状态

查询设备当前所有活动的会议室状态

请求地址
${设备地址}/api_v2/ conference/status

请求参数
通过HTTP GET 方式请求，无参数

响应参数
选项名	类型	描述
number	数字	会议室号码
total	数字	当前与会者总数
locked	布尔	会议室是否已锁定
start_time	字符串	会议开始时间，格式为YYYY-MM-DD HH:MM:SS
start_epoch	数字	会议开始时间，linux   epoch时间戳格式
members	对象	以数组的方式列出当前每个与会者的详细信息
members对象中的详细信息
id	数字	在当前会议室的编号
admin	布尔	是否为管理员
join_time	字符串	加入会议时间，格式为YYYY-MM-DD HH:MM:SS
join_epoch	数字	加入会议时间，linux epoch时间戳格式
muted	布尔	是否已静音
caller_number	数字	该与会者的号码
caller_name	字符串	该与会者的名称
chan_name	字符串	该与会者的通道标识

示例
待补充

## 4.6.5邀请成员加入会议室

请求地址
${设备地址}/api_v2/ conference/ invite

请求参数
通过HTTP POST 方式请求
选项名	类型	描述
conference_number	数字	会议室号码，邀请被叫进入哪个会议室
invite_type	字符串	member    普通类型，无需确认
   member_confirm  普通类型，需确认
   conference 会议室，用于桥接不同的会议室
   outside_line 外线
destination	数字	邀请与会者的被叫号码
invite_trunk	字符串	外呼时使用的中继线路名称，当邀请与会者的被叫号码不是内部分机号，需外呼时使用
   FXO中继：FXOP-slotXportY  (X为FXO端口所在槽位,Y是所在端口，例如0槽1端口应该为FXOP-slot0port1)
   SIP中继: SIPT-X(X为SIP中继的编号)
   E1中继:DTU-X(X为E1所在用户板的槽位号)
响应参数
待补充
示例
待补充

## 4.6.6会议室成员静音

请求地址
${设备地址}/api_v2/ conference/ mute  

请求参数
通过HTTP POST 方式请求
选项名	类型	描述
conference_number	数字	会议室号码，指定对哪个会议室的成员进行操作
member_id	数字	静音操作对象的与会者在会议中的编号
响应参数
待补充
示例
待补充

## 4.6.7会议室成员解除静音

请求地址
${设备地址}/api_v2/ conference/unmute  

请求参数
通过HTTP POST 方式请求

选项名	类型	描述
conference_number	数字	会议室号码，指定对哪个会议室的成员进行操作
member_id	数字	解除静音操作对象的与会者在会议中的编号
响应参数
待补充
示例
待补充

## 4.7通话

## 4.7.1 查询当前通话状态

请求地址
${设备地址}/api_v2/ call/status  

请求参数
通过HTTP  GET方式请求
响应参数
选项名	类型	描述
uuid	字符串	当前会话通道的标识
name	字符串	当前会话通道名
call_state	字符串	通话状态
direction	字符串	会话方向
created_time	字符串	会话创建时间，格式为YYYY-MM-DD HH:MM:SS
created_epoch	数字	会话创建时间，linux epoch时间戳格式
called_number	字符串	被叫号码
caller_number	字符串	主叫号码

注：需要注意的是，一路通话是有主被叫两方的，是各自独立的，所以一路正常通话，设备会返回两个通道信息，后续拆线，监听，强插等，都是针对某个通道为对象进行操作。
示例
待补充

## 4.7.2发起呼叫

请求地址
${设备地址}/api_v2/call/create

请求参数
通过HTTP  POST方式请求
选项名	类型	描述
caller	字符串	主叫侧目的号码
   api 呼叫时，会先呼主叫侧，主叫侧应答后，才会呼叫被叫侧
caller_dest	字符串	主叫侧通道，支持的有:
   FXS  FXS口话机(同web->分机->FXS)
   FXO  FXO外线(同web->中继->FXO)
   sip_user   SIP分机(同web->分机->SIP)
   sip_trunk    SIP中继(同web->中继->SIP)
called	字符串	被叫侧目的号码
caller_dest	字符串	被叫侧通道，支持的有：
   FXS  FXS口话机(同web->分机->FXS)
   FXO  FXO外线(同web->中继->FXO)
   sip_user   SIP分机(同web->分机->SIP)
   sip_trunk  SIP中继(同web->中继->SIP)
   play_file   播放语音文件
voice_file	字符串	播放的语音文件名，仅called_dest类型为play_file时生效。有效值为：
 ivr_default   系统->语音 页面看到的默认ivr欢迎词
   waiting_music_default  系统->语音 页面看到的默认等待音乐
 以上两个默认的语音文件，可用做未上传自定义语音时测试用。

 对于自定义上传的语音，文件名为ivr_x 或 waiting_music_x， X为上传的自定义语音文件子在系统->语音列表中各自类型的序号，也可以通过api_v2/tone/list 接口获取当前设备语音列表
answer_timeout	数字	呼叫接续/应答超时时间
duration	字符串	最大通话时长
ringback	字符串	当被叫侧目的地不是play_file时，呼叫被叫侧时，主叫侧听到的回铃音，值同voice_file
响应参数
待补充
示例
待补充

## 4.7.3拆线

请求地址
${设备地址}/api_v2/ call/hangup

请求参数
通过HTTP  POST方式请求
选项名	类型	描述
uuid	字符串	需要进行拆线操作的会话通道的标识 

*若该通道已经和另一个通道桥接成一路通话，则另一方也会被拆掉
响应参数
待补充
示例
待补充

## 4.7.4呼叫转接

请求地址
${设备地址}/api_v2/ call/transfer

请求参数
通过HTTP  POST方式请求
选项名	类型	描述
uuid	字符串	需要进行转接操作的会话通道的标识 
called	字符串	转接目的地的号码
caller	字符串	发起转接操作的主叫号码
called_dest	字符串	转接目的地的类型，如果是内部分机，填user
响应参数
待补充
示例
待补充

## 4.7.5呼叫保持

请求地址
${设备地址}/api_v2/ call/hold

请求参数
通过HTTP  POST方式请求
选项名	类型	描述
uuid	字符串	需要进行保持操作的会话通道的标识 
响应参数
待补充
示例
待补充

## 4.7.6解除呼叫保持

请求地址
${设备地址}/api_v2/ call/unhold

请求参数
通过HTTP  POST方式请求
选项名	类型	描述
uuid	字符串	需要进行解除操作的会话通道的标识 
响应参数
待补充
示例
待补充

## 4.7.7监听

请求地址
${设备地址}/api_v2/ call/ monitor 

请求参数
通过HTTP  POST方式请求
选项名	类型	描述
caller_number	数字	监听发起者的分机号
called_number	数字	被监听的分机号
mode	字符串	监听模式
   listen ：收听模式
   whisper：密语模式
   barge-in：强插模式

注意：被监听的分机，必须先在分机配置中启用了允许被监听的权限

响应参数
待补充
示例
待补充

## 4.8事件推送

## 4.8.1话单推送

在设备页面点击菜单“系统”->“事件上报” 页面中，启用话单部分，即可在通话结束后，实时推送话单到指定的http服务器，方便对接第三方进行计费等统计操作
请求地址
地址为用户在设备上配置的话单URL上报地址

请求参数
以HTTP POST方式提交

响应参数
话单服务器，收到后回复 200 OK即可
示例
待补充

## 4.8.2 呼叫状态推送

在设备页面点击菜单“系统”->“事件上报” 页面中，启用呼叫状态部分，即可在有呼叫时，实时推送呼叫状态到指定的http服务器，方便对接第三方话务台等进行状态显示
请求地址
地址为用户在设备上配置的话单URL上报地址

请求参数
以HTTP POST方式提交

响应参数
话单服务器，收到后回复 200 OK即可
示例
待补充

## 4.8.3 MiniBar

请求地址
/api_v2/minibar/edit
请求参数
通过HTTP POST 方式请求
选项名	类型	描述
number	数字	minibar 号码
url	字符串	收到被叫号码为mimibar号码前缀的呼叫时，上报的目的地址url，url可支持以下变量：
   $caller: 主叫号码
   $called: 被叫号码
   例如，设置minibar号码为*999，上报url为 [http://www.test.com/minibar?romnumber=$caller&product=$called](http://www.test.com/minibar?romnumber=$caller&product=$called),   当房间号1001的客房拨打了*999*3000*01*01电话后，pbx会发出一个http请求，[http://www.test.com/minibar?romnumber=1001&product=*999*3000](http://www.test.com/minibar?romnumber=1001&product=*999*3000)*01*01*  
*json	字符串	是否以json格式发送 on/off
   例如开启后，设置房间状态号码为*999，上报url为 [http://www.test.com/minibar](http://www.test.com/minibar) 当房间号1001的客房拨打了*999*3000*01*01电话后，pbx会发出一个http post请求，[http://www.test.com/minibar](http://www.test.com/minibar)
   {
   "caller":"1001",
   "called":"*999*3000*01*01",
   }
响应参数

选项名	类型	描述
status	字符串	请求结果
   succ： 成功
   fail：失败
result	字符串	若则以字符串方式说明具体失败原因
示例
待补充

## 4.8.4 房间清洁状态

请求地址
/api_v2/roomstatus/edit
请求参数
通过HTTP POST 方式请求
选项名	类型	描述
number	数字	房间状态 号码
url	字符串	收到被叫号码为房间状态号码前缀的呼叫时，上报的目的地址url，url可支持以下变量：
   $caller: 主叫号码
   $called: 被叫号码
   例如，设置房间状态号码为*23，上报url为   [http://www.test.com/roomstatus?romnumber=$caller&status=$called](http://www.test.com/roomstatus?romnumber=$caller&status=$called),   当房间号1001的客房拨打了*231电话后，pbx会发出一个http请求，[http://www.test.com/roomstatus?romnumber=1001&status=*231](http://www.test.com/roomstatus?romnumber=1001&status=*231)
json	字符串	是否以json格式发送，on/off
   例如开启后，设置房间状态号码为*23，上报url为 [http://www.test.com/roomstatus](http://www.test.com/roomstatus) 当房间号1001的客房拨打了*231电话后，pbx会发出一个http   post请求，[http://www.test.com/rootstatus](http://www.test.com/rootstatus)
   {
   "caller":"1001",
   "called":"*231",
   }
响应参数

选项名	类型	描述
status	字符串	请求结果
   succ： 成功
   fail：失败
result	字符串	若则以字符串方式说明具体失败原因
示例
待补充

## 4.9话单查询

## 4.9.1查询设备当前话单

请求地址
${设备地址}/api_v2/cdr/list

请求参数
通过HTTP POST方式请求
选项名	类型	描述
page	数字	分页查询时，指定第几页,默认1
page_num	数字	分页查询时，指定每页多少条记录
start_epoch_time	字符串	话单的起始时间，使用EPOCH格式
end_epoch_time	字符串	话单的结束时间，使用EPOCH格式
响应参数
待补充
示例
待补充