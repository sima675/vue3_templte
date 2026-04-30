toDesk 510365733 访问密码：nk5h2xy0
参考地址：https://192.168.10.31/
调试使用的地址前缀： https://192.168.10.30/
登录账号：8000 密码: 12345678a

通讯录
LOGO
## 用途	LOGO
URL	/webapi/portal/login/logo-banner
Method	GET
参数	
返回	{"data":{"data":"QT8000","type":"character"},"status":true}


语言
## 用途	语言
URL	/webapi/portal/login/language
Method	GET
参数	
返回	{"data":"zh_cn","status":true}


设备类型
## 用途	设备类型
URL	/webapi/portal/login/device-type
Method	GET
参数	
返回	{"data":"QT8000","status":true}


登录key
## 用途	事件上报-录音配置
URL	/webapi/portal/login/key
Method	GET
参数	
返回	{
    "data": {
        "key": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6ddl8iGYCD8e26upvzTP\nW9jehN7E46wr2FwMjYHM+Jq9itTWiK0lXLVYxTBBEW4gj5nHFCCjzvgXOrmDcGlQ\nenKRnX0bICegTjmd+LahEww72IcNmwTqHpVPCz8gxEL+SZjcYUGwpJKFZuWGH4W0\nw/KDY2DLGZ1R/iSC2sCoYRWUKQDBxRE+KCfGu4xD/QjI6kOOHCZK2nJicE0ilV5G\n/sM5ZOiXz3KVEQQ5zQAyiSXHyk15FVeu4ms4x2MHNJYslieGeNTH5H+7Y9ZWUb5s\n26V82HozcdmsubDrhzQmxTrz7m3KSwEwzMgF8yLZhsOhnhQfBNuFLvsMgYACQCGY\npwIDAQAB\n-----END PUBLIC KEY-----\n"
    },
    "status": true
}


登录
## 用途	登录
URL	/webapi/portal/login/account
Method	POST
参数	{
    "acc": "8000",
    "passwd": "G66dZ3EbLM159O9zjXxumKqt8qsGEdsFQY/bdfXkx6X6+zWIOQeiLtNrLnIQh/CTDHZv5ryrOwQYM6PzdHJnmh6BqyLBv7c8YAIcgcJyz5iSxl66vuCnrnL7b1lRjVuI7goS+uPpcId/mbQbHzEhuBVDzgaCkdS8CNJLT80Fv/pMlH1NXCRtPlOMCtCUq5ywAS61hZbaocc8rahHbdgkvfGHwomQSaKZMaZ7bfPSs4oo326B46PovhduD1PIgvc67J+SRvtVf//pS9MkDYgb8jtYeHc2C+TP4YKM63aH53v+T7eFmqZ9NM2h/H0UzzL+Ra4v/uy6C2OX+O1ZWu6sGA==",
    "clientType": "portal"
}
返回	{
    "data": {
        "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJRCI6MiwiVXNlcm5hbWUiOiI4MDAwIiwiSWZBZG1pbiI6ZmFsc2UsIkNsaWVudFR5cGUiOiJwb3J0YWwiLCJleHAiOjE3NzczOTU5NDEsImlhdCI6MTc3NzM5MjM0MSwiaXNzIjoiQ2hlbmdEdSBDb21tc25zIENvbXBhbnkiLCJuYmYiOjE3NzczOTIzNDF9.SQ9qIpnjFPrPW5eLiMVGCDxrecHS94pysCEHhg1m9h8BlIXJk8eo9fmcEeBTvGE8YkfIvO9CzP_diF69KaSZsw",
        "user": {
            "id": 2,
            "sipExtension": "8000",
            "ifFirstLogin": false
        },
        "sipPwd": "Pico@2025",
        "sipProfile": "1"
    },
    "status": true
}

退出
## 用途	退出
URL	/webapi/portal/login/quit?clientType=portal
Method	GET
参数	
返回	{
    "status": true
}


首次登录检查应用密码
## 用途	首次登录检查应用密码
URL	/webapi/portal/user/check-linkPwd
Method	POST
参数	{
    "old_dinlink_passwd": "qwWLuGyL8ycG68y/dW8nUkjdDvmODP7p5W1auRdfpiBWQjbrjQ8VuEjY45OCu0sC39i7TLK9M9i4Gm/gK9Wtmm6QeE1N6Suay1I9z115H34CdJEwtLV8GdR+P1BqIOWB02TTzAHPFBERDCuMf7RiHDFmMAFOacGnuVYjWT5Qzf7iSU9hPpUJLUO3+4VfF7BLO8xt6qDDFwGOWdfE35mB3UJyfjDxOohiz/JYqtadDwCoyOSUo7kRJqAUKXi82RKaHBIQ0pfP6mt18Y8SOKkhBzSbgvOMBfr0tG44UKGwoPwEvaR0YmUs7Z8vO/jhWIDM6AVOBf25DZYktZA11G9XfA=="
}
返回	{
    "data": true,
    "status": true
}


首次登录设置密保问题
## 用途	首次登录设置密保问题
URL	/webapi/portal/user/set-protectQuestions
Method	POST
参数	[
    {
        "questionCode": "NICK_NAME",
        "questionAnswer": "test"
    },
    {
        "questionCode": "CITY",
        "questionAnswer": "wz"
    }
]
返回	{
    "status": true
}


首次登录设置用户信息
## 用途	首次登录设置用户信息
URL	/webapi/portal/user/set-userInfo
Method	POST
参数	{
    "firstName": "test",
    "lastName": "test",
    "gender": "male",
    "officeNumber": null,
    "phoneNumber": null,
    "photo": null
}
返回	{
    "status": true
}


首次登录设置应用密码
## 用途	首次登录设置应用密码
URL	/webapi/portal/user/edit-linkPwd
Method	POST
参数	{
    "old_dinlink_passwd": "HrCsH4UlBmZxXUGsFhhnBNJhad82AfECgZeTOhEtrwH/oSsff7U8l73SY2tsJ8UTfvIrpbQBDsyCRrGRjLLi9OgGmXqYgfwwp0SnwyQlzpRsAfHU0jFzWJi/f/M0J+GREY3krEEa/77WG36nLdO8YHAC2UcCSugqHVBz3HWDu9Og1FVb/Lu9ijEmsAVEaNvUCRn3sEESUv3hBQ4DhzUHt2yKuZX1BXEKVmx3uC3qL+IL+qgUWGFSuIOm03L9V2rFmY+cfteytQ0AGmYLPCcn3vxPHzkG+5nI6kBfiajyn2DB9VrUTB1XS0g9H4QcavfPGY8YRhruVlvvyLQyZkW8qg==",
    "dinlink_passwd": "GmNMOD7LVMRYlyADbxroxOP2W2I33LKItdwptCB6HzS4Tqytv2DLqidyPwxxSswz4LBiMNHEv58mn9SmYwcTLQUTIZVpXZAK2VV9a5ZhkFHgDw8Rpf3BEbw+ZNqLSEyW2iaXuhqDHbE4WSujrebkcGn4jdALwulDBTkQqp9YpJSOPOQ6V/N6qvesW3Qogl6mWqsvQayONhxUKcFYApVljH8YzsLDCYbo/JIpg1iG5kW6ALUKNJCi/FWNjzujUQpu9KOdAR/3QD4pfxwSxwbWqsBbbJSks+TWJoNq8+MyHuK0Bu+lyn7izqCP2/YZqnoxR3dhLpie42QiFO5+Z3gUEQ=="
}
返回	{
    "status": true
}


忘记密码-1
## 用途	忘记密码-1
URL	/webapi/portal/security-question/sip-question/forget?acc=8000
Method	GET
参数	
返回	{
    "data": [
        {
            "id": 6,
            "sipExtension": "8000",
            "question": "您的昵称",
            "questionCode": "NICK_NAME",
            "type": 0
        },
        {
            "id": 7,
            "sipExtension": "8000",
            "question": "您出生的城市",
            "questionCode": "CITY",
            "type": 0
        }
    ],
    "status": true
}

忘记密码-2
## 用途	忘记密码-2
URL	/webapi/portal/security-question/verify-security
Method	POST
参数	{
    "acc": "8000",
    "protectQuestions": [
        {
            "questionCode": "NICK_NAME",
            "questionAnswer": "sun"
        },
        {
            "questionCode": "CITY",
            "questionAnswer": "dd"
        }
    ]
}
返回	{
    "data": true,
    "status": true
}


忘记密码-3
## 用途	忘记密码-3
URL	/webapi/portal/security-question/verify-security
Method	POST
参数	{
    "acc": "8000",
    "protectQuestions": [
        {
            "questionCode": "NICK_NAME",
            "questionAnswer": "sun"
        },
        {
            "questionCode": "CITY",
            "questionAnswer": "dd"
        }
    ]
}
返回	{
    "data": true,
    "status": true
}

忘记密码-4
## 用途	忘记密码-4
URL	/webapi/portal/user/forget-pwd
Method	PUT
参数	{
    "acc": "8000",
    "newPwd": "WhUSuxJUYaGXto9rDEZY/5mP0XOR8HhJDJEuEQieacSuv1KSgSRCfE5+vSBCgtKT8yNGCBchOtljo1ojpF9/yMUT6UqRuoIJkL3EPv0uJE4HRRiirccMxPfZ9qQzYpJap/88KygfNvqNyQ5a+2kRZKCrv5CwX61iPHj8ETkCD0wgOM6I0GIrv4og5HAjsfGX80Vp2vzzv8h5Oos2AK1bCsj5NrnEeWch4An6hD7CvaA8iaSbsRV4ALt+L0Bp3c8Jpx5INhwGHyHxnndiZO9/LD8LvgPVKbY0bNmwqeDAXXolMucf5fwnIAlTKInz6glXAINgqPvrWkGcgdtup1gs3A=="
}
返回	{
    "status": true
}


用户信息
## 用途	用户信息
URL	/webapi/portal/user/user-info
Method	GET
参数	
返回	{
    "data": {
        "id": "1",
        "extensionNo": "8000",
        "photo": "",
        "firstName": "",
        "lastName": "sun",
        "callerName": "8000",
        "organization": "",
        "department": "",
        "position": "",
        "mailbox": "",
        "gender": "male",
        "phoneNumber": "",
        "alternatePhoneNumber": "",
        "fixedPhoneNumber": "",
        "officePhoneNumber": "",
        "faxPhoneNumber": "",
        "address": "",
        "remarks": "",
        "enable": "0",
        "sipId": 1
    },
    "status": true
}

新建/编辑分组
## 用途	新建/编辑分组
URL	/webapi/portal/account/address-book/group/edit
Method	POST
参数	上传的是全量数据
{
    "groups": [
        "test"
    ]
}
返回	{"status":true}


编辑分组
## 用途	编辑分组
URL	/webapi/portal/account/address-book/group/edit
Method	POST
参数	{
    "groups": [
        "test"
    ]
}
返回	{"status":true}

分组列表
## 用途	分组列表
URL	/webapi/portal/account/address-book/group/list
Method	GET
参数	
返回	{"data":["test"],"status":true}


外部分组列表
## 用途	外部分组列表
URL	/webapi/portal/account/address-book/group-external/list
Method	GET
参数	
返回	{"data":["test"],"status":true}

常用联系人
## 用途	常用联系人
URL	/webapi/portal/frequent-contacts/list
Method	GET
参数	
返回	{"data":[],"status":true}


公共联系人
## 用途	公共联系人
URL	/webapi/portal/public-contacts/contacts/list
Method	POST
参数	{
    "groups": null,
    "condition": null,
    "enable": "1"
}
返回	{"data":null,"status":true}


外部公共联系人
## 用途	外部公共联系人
URL	/webapi/portal/public-contacts/contacts-external/list
Method	POST
参数	{
    "groups": null,
    "condition": null
}
返回	{"data":null,"status":true}


图片上传
## 用途	图片上传
URL	/webapi/portal/file/upload-file?fileType=photo
Method	POST
参数	Form-data
file:文件
返回	{"data":"1777393245.jpg","status":true}


访问图片
## 用途	访问图片
URL	/webapi/portal/file/download-file?fileName=1777393245.jpg&fileType=photo
Method	GET
参数	
返回	图片文件


添加联系人
## 用途	添加联系人
URL	/webapi/portal/account/address-book/contacts
Method	POST
参数	{
    "photo": "1777393245.jpg",
    "lastName": "g",
    "firstName": "zy",
    "gender": "male",
    "phoneNumber": "22",
    "officePhoneNumber": "22",
    "groups": [
        "test3"
    ],
    "organization": null,
    "department": "fdafda",
    "position": null,
    "mailbox": null,
    "alternatePhoneNumber": null,
    "fixedPhoneNumber": null,
    "faxPhoneNumber": null,
    "address": "test",
    "remarks": null
}
返回	{"status":true}

编辑联系人
## 用途	编辑联系人
URL	/webapi/portal/account/address-book/batchContacts
Method	PUT
参数	{
    "photo": "1777393245.jpg",
    "lastName": "g",
    "firstName": "zy",
    "gender": "male",
    "phoneNumber": "22",
    "officePhoneNumber": "22",
    "groups": [
        "test3"
    ],
    "organization": "",
    "department": "fdafda",
    "position": "",
    "mailbox": "",
    "alternatePhoneNumber": "",
    "fixedPhoneNumber": "",
    "faxPhoneNumber": "",
    "address": "test",
    "remarks": "",
    "id": [
        "1"
    ]
}
返回	{"status":true}

删除联系人
## 用途	删除联系人
URL	/webapi/portal/account/address-book/contacts
Method	DELETE
参数	{
    "id": [
        "2",
        "1"
    ]
}
返回	{"status":true}


联系人列表
## 用途	联系人列表
URL	/webapi/portal/account/address-book/contacts/list
Method	POST
参数	{
    "groups": "test3"
}
返回	{
    "data": [
        {
            "id": "1",
            "photo": "1777393245.jpg",
            "groups": [
                "test3"
            ],
            "firstName": "zy",
            "lastName": "g",
            "extensionNo": "",
            "callerName": "",
            "gender": "male",
            "position": "",
            "mailbox": "",
            "department": "fdafda",
            "organization": "",
            "phoneNumber": "22",
            "alternatePhoneNumber": "",
            "fixedPhoneNumber": "",
            "officePhoneNumber": "22",
            "faxPhoneNumber": "",
            "address": "test",
            "remarks": "",
            "isCollect": false,
            "initial": "",
            "frequentContactId": 0
        }
    ],
    "status": true
}

变更联系人分组
## 用途	变更联系人分组
URL	/webapi/portal/account/address-book/contacts
Method	PUT
参数	[
    {
        "id": [
            "1"
        ],
        "groups": [
            "test3",
            "DD"
        ]
    }
]
返回	{"status":true}


添加至常用联系人
## 用途	添加至常用联系人
URL	/webapi/portal/frequent-contacts/prompt/add
Method	POST
参数	{
    "uuid": "1",
    "type": 0,
    "name": "g zy",
    "company": "fdafda",
    "mobile": "22",
    "photo": "1777393245.jpg"
}
返回	{"status":true}

从常用联系人移除
## 用途	从常用联系人移除
URL	/webapi/portal/frequent-contacts/prompt/del
Method	DELETE
参数	{
    "id": 1
}
返回	{"status":true}



证书查询
## 用途	证书查询
URL	/webapi/portal/license/find
Method	GET
参数	
返回	{
    "data": {
        "ifAdmin": true,
        "ifOperatorMember": false,
        "pms": "disable",
        "attendant": "disable"
    },
    "status": true
}

分机组
## 用途	分机组
URL	/webapi/portal/extension-group/groups?id=1
Method	GET
参数	
返回	{"data":null,"status":true}




通讯录证书
## 用途	通讯录证书
URL	/webapi/portal/account/address-book/license
Method	GET
参数	
返回	{"data":{"private_unused":1010},"status":true}



通讯录
## 用途	通讯录
URL	/webapi/portal/login/addrbook
Method	GET
参数	
返回	{"data":"lastName, firstName","status":true}




呼叫
呼叫通过wss收发消息实现
wss://192.168.10.31/wss?Prefix=/wss&Schema=wss&Target=192.168.10.31&Port=7443
## 用途	呼入电话
URL	/webapi/portal/public-contacts/contacts/list-call-show
Method	POST
参数	{
    "condition": "8004",
    "fuzzyQuery": "off",
    "type": "internal"
}
返回	{
    "data": null,
    "status": true
}

呼入电话

签入队列
## 用途	签入队列
URL	/webapi/portal/queue/sign-in
Method	POST
参数	{
    "queue": "123456",
    "status": "Logged Out"
}
返回	{
    "status": 500,
    "err": "UC_SERVER_ERROR",
    "cause": "queue_num does not exist in the cfg!"
}


夜服策略列表
## 用途	夜服策略列表
URL	/webapi/portal/nightwear-strategy/list
Method	GET
参数	
返回	{"data":[],"status":true}


语音邮箱
## 用途	语音邮箱
URL	/webapi/portal/voicemail/page
Method	POST
参数	{
    "pageNum": 1,
    "pageSize": 10
}
返回	{
    "data": {
        "total": 0,
        "pageSize": 10,
        "pageNum": 1,
        "records": null,
        "count": 0
    },
    "status": true
}



SIP地址
## 用途	SIP地址
URL	/webapi/portal/login/sip-addr?sipProfile=1
Method	GET
参数	
返回	{
    "data": {
        "Prefix": "/wss",
        "Schema": "wss",
        "Target": "192.168.10.31",
        "Port": "7443"
    },
    "status": true
}

呼叫队列列表
## 用途	呼叫队列列表
URL	/webapi/portal/queue/list
Method	GET
参数	
返回	//下面number=123456的传参均取自该值
{
    "data": [
        {
            "index": "1",
            "name": "test",
            "number": "123456"
        }
    ],
    "status": true
}



酒店业务
客房数量
## 用途	客房数量
URL	/webapi/portal/room/list-count
Method	GET
参数	
返回	{"data":0,"status":true}


客房列表
## 用途	客房列表
URL	/webapi/portal/room/list?kw=&kw_type=1&alarm=0&today=false&offset=0&page_num=1&page_size=30
Method	GET
参数	position: 位置id
vacant:未入住 1表示未入驻 2表示已入住
ifok:是否可用 1表示不可用 2表示可用
kw: 关键字
kw_type:关键字类型 1房间号 2客户姓名 3身份证 4电话号码
clean:是否干净 2脏
alarm:告警
repair:维修 2维修
today:今日计划退房 true/false
返回	{
    "data": [
        {
            "id": 2,
            "name": "中房",
            "cup": 2
        }
    ],
    "status": true
}

设置客房需要维修
## 用途	设置客房需要维修
URL	/webapi/portal/room/repair-status
Method	PUT
参数	{
    "id": 1,
    "repair_status": 2
}
返回	{
    "status": true
}


设置客房完成清扫
## 用途	设置客房完成清扫
URL	/webapi/portal/room/clean-status
Method	PUT
参数	{
    "id": 1,
    "clean_status": 1
}
返回	{
    "status": true
}


设置客房需要检查
## 用途	设置客房需要检查
URL	/webapi/portal/room/check-status
Method	PUT
参数	{
    "id": 1,
    "check_status": 2
}
返回	{
    "status": true
}

入住记录数量
## 用途	入住记录数量
URL	/webapi/portal/checkin-detail/list-count
Method	GET
参数	
返回	{"data":0,"status":true}


入住记录
## 用途	入住记录数量
URL	/webapi/portal/checkin-detail/list
Method	GET
参数	pageSize:10
pageNum:1
from:2026-04-07 00:00:00
to:2026-04-30 23:59:59
返回	{
    "data": {
        "pageNum": 1,
        "pageSize": 10,
        "total": 0,
        "data": null
    },
    "status": true
}

客房通话
## 用途	入住记录数量
URL	/webapi/portal/cdr/page
Method	POST
参数	{
    "condition": null, //关键字
    "pageNum": 1,
    "pageSize": 0,
    "start_epoch_time": 1775404800,
    "end_epoch_time": 1779724799,
    "type": "Pms"
}
返回	{
    "data": {
        "pageNum": 1,
        "pageSize": 10,
        "total": 0,
        "records": null
    },
    "status": true
}



服务码列表
## 用途	服务码列表
URL	/webapi/portal/service-code/list
Method	POST
参数	
返回	{
    "data": {
        "accessNumber": "8",
        "serviceCodeSwitch": "on",
        "functionCodeSwitch": "on",
        "serviceCodeChildren": [
            {
                "type": 1,
                "status": 1,
                "code": ""
            },
            {
                "type": 1,
                "status": 2,
                "code": ""
            },
            {
                "type": 1,
                "status": 5,
                "code": ""
            },
            {
                "type": 2,
                "status": 3,
                "code": ""
            },
            {
                "type": 2,
                "status": 4,
                "code": ""
            }
        ],
        "functionCodeChildren": [
            {
                "type": 1,
                "status": 1,
                "functionCode": ""
            },
            {
                "type": 1,
                "status": 2,
                "functionCode": ""
            },
            {
                "type": 1,
                "status": 5,
                "functionCode": ""
            },
            {
                "type": 2,
                "status": 3,
                "functionCode": ""
            },
            {
                "type": 2,
                "status": 4,
                "functionCode": ""
            }
        ]
    },
    "status": true
}

保存客房服务码
## 用途	服务码列表
URL	/webapi/portal/service-code/edit
Method	POST
参数	{
    "accessNumber": "8",
    "serviceCodeSwitch": "off",
    "functionCodeSwitch": "on",
    "serviceCodeChildren": [
        {
            "type": 1,
            "status": 1,
            "code": ""
        },
        {
            "type": 1,
            "status": 2,
            "code": ""
        },
        {
            "type": 1,
            "status": 5,
            "code": ""
        },
        {
            "type": 2,
            "status": 3,
            "code": ""
        },
        {
            "type": 2,
            "status": 4,
            "code": ""
        }
    ],
    "functionCodeChildren": [
        {
            "type": 1,
            "status": 1,
            "functionCode": "1"
        },
        {
            "type": 1,
            "status": 2,
            "functionCode": "2"
        },
        {
            "type": 1,
            "status": 5,
            "functionCode": "3"
        },
        {
            "type": 2,
            "status": 3,
            "functionCode": "4"
        },
        {
            "type": 2,
            "status": 4,
            "functionCode": "5"
        }
    ]
}
返回	{"status":true}

服务员列表
## 用途	服务员列表
URL	/webapi/portal/waiter/page
Method	POST
参数	{
    "kw": "",
    "pageSize": 10,
    "pageNum": 1
}
返回	{
    "data": {
        "total": 0,
        "pageSize": 10,
        "pageNum": 1,
        "records": null
    },
    "status": true
}

新增服务员
## 用途	新增服务员
URL	/webapi/portal/waiter/add
Method	POST
参数	{
    "name": "test",
    "pinCode": "123456"
}
返回	{
    "status": true
}




编辑服务员
## 用途	编辑服务员
URL	/webapi/portal/waiter/edit
Method	POST
参数	{
    "id": 1,
    "name": "test",
    "pinCode": "123456"
}
返回	{
    "status": true
}

批量删除服务员

## 用途	批量删除服务员
URL	/webapi/portal/waiter/del
Method	POST
参数	{
    "ids": [
        1
    ]
}
返回	{
    "status": true
}




客房服务记录
## 用途	客房服务记录
URL	/webapi/portal/operation-record/page
Method	POST
参数	{
    "pageSize": 10,
    "pageNum": 1,
    "condition": null,
    "startTime": "2026-04-14 00:00:00",
    "endTime": "2026-04-30 23:59:59"
}
返回	{
    "data": {
        "total": 0,
        "pageSize": 10,
        "pageNum": 1,
        "records": null
    },
    "status": true
}

房型列表
## 用途	房型列表
URL	/webapi/portal/room-type/list
Method	GET
参数	
返回	{
    "data": {
        "total": 0,
        "page_num": 1,
        "page_size": 30,
        "data": []
    },
    "status": true
}

添加房型
## 用途	添加房型
URL	/webapi/portal/room-type/admin/add
Method	POST
参数	{
    "name": "大房",
    "cup": 3
}
返回	{"status":true}


编辑房型
## 用途	编辑房型
URL	/webapi/portal/room-type/admin/edit
Method	POST
参数	{
"name": "大房",
"id": 3,
    "cup": 3
}
返回	{"status":true}

删除房型
## 用途	删除房型
URL	/webapi/portal/room-type/admin/delete
Method	DELETE
参数	{
"id": 3
}
返回	{"status":true}


查看绑定房型的房间
## 用途	查看绑定房型的房间(删除前调用)
URL	/webapi/portal/room-type/admin/bind
Method	POST
参数	{
"id": [3]
}
返回	{"data":[],"status":true}


位置列表
## 用途	位置列表
URL	/webapi/portal/position/list
Method	GET
参数	
返回	{
    "data": [
        {
            "id": 1,
            "name": "2",
            "pid": 0,
            "children": [
                {
                    "id": 3,
                    "name": "测试楼层1",
                    "pid": 1,
                    "children": null
                }
            ]
        }
    ],
    "status": true
}


添加位置
## 用途	添加位置
URL	/webapi/portal/position/admin/add
Method	POST
参数	//pid为楼栋id，为0表示添加楼栋，否则表示添加楼层
{
    "name": "2",
    "pid": 0
}
返回	{"status":true}


编辑位置
## 用途	编辑位置
URL	/webapi/portal/position/admin/edit
Method	POST
参数	{
    "name": "2",
    "id": 1
}
返回	{"status":true}


删除位置
## 用途	删除位置
URL	/webapi/portal/position/admin/delete
Method	DELETE
参数	{
    "id": 1
}
返回	{"status":true}


查看绑定位置的房间
## 用途	查看绑定位置的房间(删除前调用)
URL	/webapi/portal/position/admin/bind?id=4
Method	GET
参数	
返回	{"data":[],"status":true}


房间列表
## 用途	房间列表
URL	/webapi/portal/room/admin/list?pageSize=10&pageNum=1
Method	GET
参数	
返回	{
    "data": {
        "total": 1,
        "page_num": 1,
        "page_size": 10,
        "data": [
            {
                "id": 1,
                "position": "2-测试楼层1",
                "extension": "8040",
                "room_number": "1",
                "room_type": "中房",
                "room_cup": 2,
                "status": 2,
                "alarm_count": 0,
                "vacant": 1,
                "vip": 0
            }
        ]
    },
    "status": true
}


查询分机列表
## 用途	查询分机列表
URL	/webapi/portal/user/user-list?unbind=true&excludeXFS=true
Method	GET
参数	unbind:未绑定
kw:关键字
返回	{
    "data": {
        "total": 50,
        "PageNum": 0,
        "PageSize": 50,
        "list": [
            {
                "index": "41",
                "name": "8040",
                "extension": "8040"
            },
            ...
        ]
    },
    "status": true
}


添加房间
## 用途	添加房间
URL	/webapi/portal/room/admin/add
Method	POST
参数	{
    "room_number": "1",
    "extension": "8040",
    "position_id": 3,
    "room_type_id": 2,
    "status": 2
}
返回	{"status":true}


编辑房间
## 用途	编辑房间
URL	/webapi/portal/room/admin/edit
Method	POST
参数	//status=1 不可用 status=2 可用
{
    "room_number": "1",
"extension": "8040",
"id": 3,
    "position_id": 3,
    "room_type_id": 2,
    "status": 2
}
返回	{"status":true}


批量新建房间
## 用途	批量新建房间
URL	/webapi/portal/room/admin/add/bulk
Method	POST
参数	[
    {
        "position_id": 3,
        "extension": "8048",
        "room_number": "test- 8048",
        "room_type_id": 2,
        "status": 2
    },
    {
        "position_id": 3,
        "extension": "8046",
        "room_number": "test- 8046",
        "room_type_id": 2,
        "status": 2
    },
    {
        "position_id": 3,
        "extension": "8003",
        "room_number": "test- 8003",
        "room_type_id": 2,
        "status": 2
    }
]
返回	{"status":true}


批量编辑房间
## 用途	批量编辑房间
URL	/webapi/portal/room/admin/edit/bulk
Method	POST
参数	{
    "position_id": 3,
    "room_type_id": null,
    "status": 2,
    "ids": [
        1,
        2,
        3
    ]
}
返回	{"status":true}

批量删除房间
## 用途	批量删除房间
URL	/webapi/portal/room/admin/delete
Method	DELETE
参数	{
    "id": [4]
}
返回	{"status":true}



话务台
话务台通话
## 用途	通话记录
URL	/webapi/portal/cdr/page
Method	POST
参数	//number参数为呼叫队列
{
    "cdrType": null,
    "condition": "1",
    "type": "Attendant",
    "number": "123456",
    "start_epoch_time": null,
    "end_epoch_time": null,
    "pageNum": 1,
    "pageSize": 0
}
返回	{
    "data": {
        "total": 23,
        "pageSize": 10,
        "pageNum": 1,
        "records": [
            {
                "destination_number": "25555",
                "direction": "out",
                "duration": "0",
                "start_time": "2026-04-29 01:24:24",
                "end_time": "2026-04-29 01:24:24",
                "start_epoch_time": "1777397064",
                "end_epoch_time": "1777397064",
                "record_file": "",
                "hangup_cause": "NO_ROUTE_DESTINATION",
                "name": "25555",
                "department": "",
                "uuid": "06ec428a-c069-43d2-bd49-d4a2f2d152b4",
                "partner_uuid": "",
                "cdrType": 2,
                "cdrTypeName": "呼出",
                "remark": "",
                "sip": "8000",
                "dialCount": 0,
                "photo": "",
                "destination_number_type": "external",
                "video": "",
                "queue": "",
                "refer_to": "",
                "refer_to_name": "",
                "refer_by": "",
                "refer_by_name": "",
                "area_call": "unkown",
                "extension": "8000",
                "fee": "-",
                "room_number": "",
                "guest_name": ""
            },
            {
                "destination_number": "22",
                "direction": "out",
                "duration": "0",
                "start_time": "2026-04-29 01:15:11",
                "end_time": "2026-04-29 01:15:11",
                "start_epoch_time": "1777396511",
                "end_epoch_time": "1777396511",
                "record_file": "",
                "hangup_cause": "NO_ROUTE_DESTINATION",
                "name": "g zy",
                "department": "fdafda",
                "uuid": "4975d8fb-cccd-4955-a30d-ad30fb0e0f1c",
                "partner_uuid": "",
                "cdrType": 2,
                "cdrTypeName": "呼出",
                "remark": "",
                "sip": "8000",
                "dialCount": 0,
                "photo": "1777393245.jpg",
                "destination_number_type": "external",
                "video": "",
                "queue": "",
                "refer_to": "",
                "refer_to_name": "",
                "refer_by": "",
                "refer_by_name": "",
                "area_call": "unkown",
                "extension": "8000",
                "fee": "-",
                "room_number": "",
                "guest_name": ""
            },
            {
                "destination_number": "22",
                "direction": "out",
                "duration": "0",
                "start_time": "2026-04-29 00:40:23",
                "end_time": "2026-04-29 00:40:23",
                "start_epoch_time": "1777394423",
                "end_epoch_time": "1777394423",
                "record_file": "",
                "hangup_cause": "NO_ROUTE_DESTINATION",
                "name": "g zy",
                "department": "fdafda",
                "uuid": "bb9fbd8d-42d1-459c-8719-22c029e7a017",
                "partner_uuid": "",
                "cdrType": 2,
                "cdrTypeName": "呼出",
                "remark": "",
                "sip": "8000",
                "dialCount": 0,
                "photo": "1777393245.jpg",
                "destination_number_type": "external",
                "video": "",
                "queue": "",
                "refer_to": "",
                "refer_to_name": "",
                "refer_by": "",
                "refer_by_name": "",
                "area_call": "unkown",
                "extension": "8000",
                "fee": "-",
                "room_number": "",
                "guest_name": ""
            },
...
        ]
    },
    "status": true
}

夜服策略列表
## 用途	夜服策略列表
URL	/webapi/portal/nightwear-strategy/page
Method	POST
参数	{
    "policyName": null,
    "pageSize": 10,
    "pageNum": 1
}
返回	{
    "data": {
        "total": 1,
        "pageSize": 10,
        "pageNum": 1,
        "records": [
            {
                "id": 1,
                "policyName": "test",
                "activationType": "sipExtension",
                "extensionNumber": "8008",
                "extensionIndex": 9,
                "number": "",
                "closeType": "playback",
                "soundName": "默认提示音",
                "soundKey": "0",
                "createAt": "2026-04-29 05:46:45",
                "updateAt": "2026-04-29 05:46:45",
                "remark": "fdaf"
            }
        ]
    },
    "status": true
}


语音
## 用途	语音
URL	/webapi/portal/uci/voice-sound
Method	GET
参数	
返回	{
    "data": null,
    "status": true
}


查找SIP分机
## 用途	查找SIP分机
URL	/webapi/portal/user/user-list?kw=8008
Method	GET
参数	
返回	{
    "data": {
        "total": 50,
        "PageNum": 0,
        "PageSize": 50,
        "list": [
           ...
            {
                "index": "11",
                "name": "8010",
                "extension": "8010"
            },
            {
                "index": "5",
                "name": "8004",
                "extension": "8004"
            },
            {
                "index": "19",
                "name": "8018",
                "extension": "8018"
            },
            {
                "index": "32",
                "name": "8031",
                "extension": "8031"
            }
        ]
    },
    "status": true
}


新建夜服策略
## 用途	新建夜服策略
URL	/webapi/portal/nightwear-strategy/add
Method	POST
参数	{
    "policyName": "test",
    "activationType": "sipExtension",
    "closeType": "playback",
    "remark": "fdaf",
    "extensionNumber": "8008",
    "extensionIndex": 9,
    "soundName": "默认提示音",
    "soundKey": "0"
}
返回	{
    "status": true
}


根据id查询夜服策略
## 用途	根据id查询夜服策略
URL	/webapi/portal/nightwear-strategy/info?id=1
Method	GET
参数	
返回	{
    "data": {
        "id": 1,
        "policyName": "test",
        "activationType": "sipExtension",
        "extensionNumber": "8008",
        "extensionIndex": 9,
        "number": "",
        "closeType": "playback",
        "soundName": "默认提示音",
        "soundKey": "0",
        "createAt": "2026-04-29 05:46:45",
        "updateAt": "2026-04-29 05:46:45",
        "remark": "fdaf"
    },
    "status": true
}

编辑夜服策略
## 用途	编辑夜服策略
URL	/webapi/portal/nightwear-strategy/edit
Method	POST
参数	{
    "id": 1,
    "policyName": "test",
    "activationType": "sipExtension",
    "closeType": "playback",
    "remark": "fdaf",
    "extensionNumber": "8008",
    "extensionIndex": 9,
    "soundName": "默认提示音",
    "soundKey": "0"
}
返回	{
    "status": true
}


夜服策略热更新
## 用途	夜服策略热更新(在编辑之后需要调用该方法)
URL	/webapi/portal/nightwear-strategy/hot-update?strategyId=2
Method	GET
参数	
返回	{
    "status": true
}

删除夜服策略
## 用途	删除夜服策略
URL	/webapi/portal/nightwear-strategy/del?id=2
Method	GET
参数	
返回	{
    "status": true
}


呼叫队列
## 用途	呼叫队列
URL	/webapi/portal/queue/queue-operator
Method	GET
参数	
返回	{
    "data": [
        {
            "index": "1",
            "name": "test",
            "number": "123456"
        }
    ],
    "status": true
}


在线的分机
## 用途	在线的分机
URL	/webapi/portal/queue/line-up
Method	POST
参数	{
    "index": "1"
}
返回	{
    "data": null,
    "status": true
}

停泊列表
## 用途	停泊列表
URL	/webapi/portal/queue/anchor?queue_num=123456
Method	GET
参数	
返回	{
    "data": null,
    "status": true
}


当前通话监控
## 用途	当前通话监控
URL	/webapi/portal/queue/call-monitor?number=123456
Method	GET
参数	
返回	{
    "data": null,
    "status": true
}


sip分机列表
## 用途	SIP分机列表
URL	/webapi/portal/queue/sip-list
Method	POST
参数	{
    "index": "1"
}
返回	{
    "data": [
        {
            "user": "8000",
            "name": "sun test2",
            "dnd": "off",
            "voicemail": "on",
            "status": "online",
            "state": "idle",
            "alarm_clock": false
        },
        {
            "user": "8001",
            "name": "8001",
            "dnd": "off",
            "voicemail": "off",
            "status": "offline",
            "state": "idle",
            "alarm_clock": false
        },
        {
            "user": "8002",
            "name": "8002",
            "dnd": "off",
            "voicemail": "off",
            "status": "offline",
            "state": "idle",
            "alarm_clock": false
        }
    ],
    "status": true
}

话务员列表
## 用途	呼叫队列
URL	/webapi/portal/queue/operator-list
Method	POST
参数	{
    "index": "1"
}
返回	{
    "data": null,
    "status": true
}

夜服状态
## 用途	夜服状态
URL	/webapi/portal/queue/night-status
Method	POST
参数	{
    "index": "1"
}
返回	{
    "data": {
        "leave_empty_queue": "off",
        "empty_queue_tone": "",
        "forward_empty_queue": "",
        "forward_empty_queue_dst": ""
    },
    "status": true
}


查找夜服策略
## 用途	查找夜服策略
URL	/webapi/portal/nightwear-strategy/find-strategy?queueIndex=1
Method	GET
参数	{
    "index": "1"
}
返回	{
    "data": {
        "id": 0,
        "policyName": "",
        "activationType": "",
        "extensionNumber": "",
        "extensionIndex": 0,
        "number": "",
        "closeType": "",
        "soundName": "",
        "soundKey": "",
        "createAt": null,
        "updateAt": null,
        "remark": ""
    },
    "status": true
}

夜服设置
## 用途	夜服设置
URL	/webapi/portal/nightwear-strategy/set-strategy
Method	POST
参数	{
    "strategyId": 1,
    "index": "1",
    "ifOpen": false
}
返回	{
    "status": 500,
    "err": "UC_SERVER_ERROR",
    "cause": {
        "Offset": 1
    }
}


数据概览
## 用途	数据概览
URL	/webapi/portal/cdr/data?queue=123456&time=week
Method	GET
参数	{
    "strategyId": 1,
    "index": "1",
    "ifOpen": false
}
返回	{
    "data": {
        "queue_sum": 0,
        "queue_available": 0,
        "in_count": 0,
        "connect_count": 0,
        "caller_busy_count": 0,
        "talk_sum_time": 0,
        "talk_time_max": 0,
        "talk_time_min": 0,
        "waiting_time_sum": 0,
        "waiting_time_max": 0
    },
    "status": true
}

座席统计数据
## 用途	座席统计数据
URL	/webapi/portal/cdr/extension-page
Method	POST
参数	{
    "queue": "123456",
    "time": "week",
    "page_num": 1,
    "page_size": 10
}
返回	{
    "data": {
        "page_num": 1,
        "page_size": 10,
        "total": 0,
        "data": null
    },
    "status": true
}

闹钟叫醒
闹钟语音列表
## 用途	闹钟语音列表
URL	/webapi/portal/alarm/tone
Method	GET
参数	
返回	{
    "data": [
        {
            "id": "0",
            "name": "default tone",
            "desc": ""
        }
    ],
    "status": true
}


闹钟任务列表
## 用途	闹钟任务列表
URL	/webapi/portal/alarm/list?pageSize=10&pageNum=1&status=1
Method	GET
参数	
返回	{
    "data": {
        "page": 1,
        "pageSize": 10,
        "total": 1,
        "list": [
            {
                "id": 1,
                "name": "test",
                "tone": "0",
                "status": 1,
                "start_time": "2026-04-30",
                "end_time": "2026-04-30",
                "descript": "fdasf",
                "create_at": "0001-01-01 00:00:00",
                "create_by": "",
                "sip": [
                    "8002"
                ],
                "run_time": "2026-04-30 10:06",
                "repeat_rate": 1,
                "circulation_type": 1,
                "circulation": 0,
                "faild_count": 0,
                "firstName": "",
                "lastName": ""
            }
        ]
    },
    "status": true
}

新建闹钟
## 用途	新建闹钟
URL	/webapi/portal/alarm/add
Method	POST
参数	{
    "name": "test",
    "run_time": "2026-04-30 10:06",
    "tone": "0",
    "descript": "fdasf",
    "circulation_type": 1,
    "circulation": 0,
    "start_time": null,
    "end_time": null,
    "status": null,
    "repeat_rate": 1,
    "sip": [
        "8002"
    ]
}
返回	{
    "status": true
}


编辑闹钟
## 用途	编辑闹钟
URL	/webapi/portal/alarm/edit
Method	PUT
参数	{
"name": "test",
"id": 1,
    "run_time": "2026-04-30 10:06",
    "tone": "0",
    "descript": "fdasf",
    "circulation_type": 1,
    "circulation": 0,
    "start_time": null,
    "end_time": null,
    "status": null,
    "repeat_rate": 1,
    "sip": [
        "8002"
    ]
}
返回	{
    "status": true
}


停止闹钟
## 用途	停止闹钟
URL	/webapi/portal/alarm/stop
Method	PUT
参数	{
    "alarm_id": 1
}
返回	{
    "status": true
}

闹钟任务日志
## 用途	闹钟任务日志
URL	/webapi/portal/alarm/logs?pageSize=10&pageNum=1&kw=8
Method	GET
参数	
返回	{
    "data": {
        "page": 1,
        "pageSize": 10,
        "total": 3,
        "list": [
            {
                "at": "2026-04-29 02:53:54",
                "alarm_id": 1,
                "taskName": "test",
                "eventType": "STOP",
                "msg": "",
                "userSip": "8000",
                "firstName": "8000",
                "lastName": "",
                "sip": "8002"
            },
            {
                "at": "2026-04-29 02:52:28",
                "alarm_id": 1,
                "taskName": "test",
                "eventType": "EDIT",
                "msg": "",
                "userSip": "8000",
                "firstName": "8000",
                "lastName": "",
                "sip": "8002"
            }
        ]
    },
    "status": true
}

个人设置
通话记录
## 用途	通话记录
URL	/webapi/portal/cdr/page
Method	POST
参数	{
    "cdrType": null,
    "condition": null,
    "pageNum": 1,
    "pageSize": 10
}
返回	{
    "data": {
        "total": 23,
        "pageSize": 10,
        "pageNum": 1,
        "records": [
            {
                "destination_number": "25555",
                "direction": "out",
                "duration": "0",
                "start_time": "2026-04-29 01:24:24",
                "end_time": "2026-04-29 01:24:24",
                "start_epoch_time": "1777397064",
                "end_epoch_time": "1777397064",
                "record_file": "",
                "hangup_cause": "NO_ROUTE_DESTINATION",
                "name": "25555",
                "department": "",
                "uuid": "06ec428a-c069-43d2-bd49-d4a2f2d152b4",
                "partner_uuid": "",
                "cdrType": 2,
                "cdrTypeName": "呼出",
                "remark": "",
                "sip": "8000",
                "dialCount": 0,
                "photo": "",
                "destination_number_type": "external",
                "video": "",
                "queue": "",
                "refer_to": "",
                "refer_to_name": "",
                "refer_by": "",
                "refer_by_name": "",
                "area_call": "unkown",
                "extension": "8000",
                "fee": "-",
                "room_number": "",
                "guest_name": ""
            },
            {
                "destination_number": "22",
                "direction": "out",
                "duration": "0",
                "start_time": "2026-04-29 01:15:11",
                "end_time": "2026-04-29 01:15:11",
                "start_epoch_time": "1777396511",
                "end_epoch_time": "1777396511",
                "record_file": "",
                "hangup_cause": "NO_ROUTE_DESTINATION",
                "name": "g zy",
                "department": "fdafda",
                "uuid": "4975d8fb-cccd-4955-a30d-ad30fb0e0f1c",
                "partner_uuid": "",
                "cdrType": 2,
                "cdrTypeName": "呼出",
                "remark": "",
                "sip": "8000",
                "dialCount": 0,
                "photo": "1777393245.jpg",
                "destination_number_type": "external",
                "video": "",
                "queue": "",
                "refer_to": "",
                "refer_to_name": "",
                "refer_by": "",
                "refer_by_name": "",
                "area_call": "unkown",
                "extension": "8000",
                "fee": "-",
                "room_number": "",
                "guest_name": ""
            },
            {
                "destination_number": "22",
                "direction": "out",
                "duration": "0",
                "start_time": "2026-04-29 00:40:23",
                "end_time": "2026-04-29 00:40:23",
                "start_epoch_time": "1777394423",
                "end_epoch_time": "1777394423",
                "record_file": "",
                "hangup_cause": "NO_ROUTE_DESTINATION",
                "name": "g zy",
                "department": "fdafda",
                "uuid": "bb9fbd8d-42d1-459c-8719-22c029e7a017",
                "partner_uuid": "",
                "cdrType": 2,
                "cdrTypeName": "呼出",
                "remark": "",
                "sip": "8000",
                "dialCount": 0,
                "photo": "1777393245.jpg",
                "destination_number_type": "external",
                "video": "",
                "queue": "",
                "refer_to": "",
                "refer_to_name": "",
                "refer_by": "",
                "refer_by_name": "",
                "area_call": "unkown",
                "extension": "8000",
                "fee": "-",
                "room_number": "",
                "guest_name": ""
            },
...
        ]
    },
    "status": true
}

给通话记录添加备注
## 用途	给通话记录添加备注
URL	/webapi/portal/cdr/add-remark
Method	POST
参数	{
    "remark": "ffafd",
    "uuid": "06ec428a-c069-43d2-bd49-d4a2f2d152b4"
}
返回	{
    "status": true
}

语音留言列表
## 用途	语音留言列表
URL	/webapi/portal/message/page
Method	POST
参数	{
    "pageNum": 1,
    "pageSize": 10
}
返回	{
    "data": {
        "total": 0,
        "pageSize": 10,
        "pageNum": 1,
        "records": null,
        "count": 0
    },
    "status": true
}




密码强度
## 用途	密码强度
URL	/webapi/portal/user/pwd-strength
Method	GET
参数	
返回	{
    "data": {
        "pwdStrength": 2,
        "dinlinkPwdStrength": 2
    },
    "status": true
}

是否app
## 用途	是否app
URL	/webapi/portal/dinlink/pms/is-app
Method	GET
参数	
返回	{
    "data": {
        "isOpen": false
    },
    "status": true
}




编辑用户基础信息
## 用途	编辑用户基础信息
URL	/webapi/portal/user/edit-base
Method	PUT
参数	{
    "firstName": "test2",
    "lastName": "sun",
    "gender": "male",
    "extensionNo": "8000",
    "officePhoneNumber": "123",
    "phoneNumber": "456",
    "photo": ""
}
返回	{
    "status": true
}

编辑用户其他信息
## 用途	编辑用户其他信息
URL	/webapi/portal/user/edit-other
Method	PUT
参数	{
    "id": "1",
    "extensionNo": "8000",
    "photo": "",
    "firstName": "test2",
    "lastName": "sun",
    "callerName": "8000",
    "organization": "test",
    "department": "test2",
    "position": "test3",
    "mailbox": "",
    "gender": "male",
    "phoneNumber": "456",
    "alternatePhoneNumber": "18658809999",
    "fixedPhoneNumber": "1",
    "officePhoneNumber": "123",
    "faxPhoneNumber": "2",
    "address": "3",
    "remarks": "4",
    "enable": "0",
    "sipId": 1
}
返回	{
    "status": true
}




修改当前用户SIP密码
## 用途	修改当前用户SIP密码
URL	/webapi/portal/user/edit-sipPwd
Method	POST
参数	{
    "extension": "8000",
    "password": "QzR2GSxUN7M7g8peISFp4Oo3gH67dNI9wISEoUQSyw5E+NaIUdw6v7aGBtFxHt/z5UTt96dGOdXe2pFco/CfekUfLy2TMaSY7nVBys2eeNiA8Xk+qiAfwa2NdVb/PYhu6Gwhg/yKX1Iu3+xfs+dmUIs9bXegY9xJr/iZH0ddQxifFmWjV5zzBvaYD5CTvyNjvKVJgB3V47oVXeP+K9VdC0F4x3JmtEb6yOPBFdkZUlY8iemumJPJhGzSksmyAxuGH7BcNv0Dor0mm6SNf+it4Hp0g2Huxovm2K/qnDEYGobWZHcmViBrqwJVFGRVc7g58jha1Um7NZEulZJMl5BD0A==",
    "old_sip_password": "kyBD/TtzjwmJnZM08ai7rN/KZ+w2av8bp9jlPnQQZlMQOzHyCL4/623emCyjPEa8kAo11nm7OK4kClHmjTsBZXn5iipAiry8nvGz/iUWlxyGm1P7blZzkSeTaucq0++5qCQ2DrOSJpSdNZZEn13WaZZUHxg2HaWTEIQ50ETey02NaHgIfNJLOnCNZtCBak7pEX3gy8Xsg9rAFBdS2AQ5dbnAysBLfAPA7KU2wrnSqvbfFZVJUJnsyv6tp1ApDf2CQyrD6X1nYukbNfZu+SbGPJBBNNnlLsP+BM+gQ/LMxjhd3M3Q2xCdSQZN0weUA/qeV7Tbe3FNSsyAzRqlYdSElg=="
}
返回	{
    "data": {
        "sipPwd": "12345678a"
    },
    "status": true
}




修改当前用户应用密码
## 用途	修改当前用户应用密码
URL	/webapi/portal/user/edit-linkPwd
Method	POST
参数	{
    "extension": "8000",
    "dinlink_passwd": "eYRR+35B2gh0Y+FifygLji/ruSoB86u4OKRicaGXyKukQaJI0E+ktAElL7PdT+wUcJSLlXyyvAsGrr1ksoCQU1rs11x/BvGOVv0cWsmrt9IikYW7F7OjZmbubxek10angZGMLeCZh935dkqk2JOqoJpEVv8bQt68Xp5Xp1vcHbsbuIUcPjc9zFNe4FH9zHbXuOOYPpO9IHZJxk1B/QfcCL4i93Q5HAhL9/YgrafSm8dP5dXpZf4bUUT/c8vpS94mdZDcITXAiOeYRPb+HrmnbS1xGvH0rJHXfU2bDka7lNwRdRCnLxOOcj8D4GHUldCRcxWuc+YihLddeUxLnt6vTA==",
    "old_dinlink_passwd": "eWF92ivTkP8cFwy7MIDPX3wDKXeYqwwNzZfCSjQZs/TE1B1RoZ8jebxQGKJaQiZ732VyUP2biPdfY9xQd7cnPmR49ifdWl9D/cLdEgQ9EuUiXVODfvzxUJnLdCRAioK0AtdqOAKehJkrMFksDdBY/wKeHD8nrHLO4ovuwM4pxFGeqIPWASvOMpenWdjvhrneXplYcHLrzhj/gUZ9UFfoSLxg2+zOAydzeuc6vBPwchW+dpSmqdgWPITlAR0/5vai+orXYf/l06X9Q6+tWFOFdj3cqPjME78St3APDjrQ2yBvRxBk/xjRRR8rbuzoetwiuEbOogj34laPuml7bHXHCg=="
}
返回	空

密码问题列表
## 用途	密保问题列表
URL	/webapi/portal/security-question/list
Method	GET
参数	
返回	{
    "data": [
        {
            "id": 1,
            "question": "您的昵称",
            "code": "NICK_NAME",
            "type": 0
        },
        {
            "id": 2,
            "question": "您的生日",
            "code": "BIRTHDAY",
            "type": 1
        },
        {
            "id": 3,
            "question": "您出生的城市",
            "code": "CITY",
            "type": 0
        },
        {
            "id": 4,
            "question": "您的紧急联系人姓名",
            "code": "EMERGENCY_CONTACT_NAME",
            "type": 0
        },
        {
            "id": 5,
            "question": "您的紧急联系人手机号码",
            "code": "EMERGENCY_CONTACT_PHONE",
            "type": 0
        }
    ],
    "status": true
}

当前用户的密保问题
## 用途	当前用户的密保问题
URL	/webapi/portal/security-question/sip-question?acc=8000
Method	GET
参数	
返回	{
    "data": [
        {
            "id": 4,
            "sipExtension": "8000",
            "question": "您的昵称",
            "questionCode": "NICK_NAME",
            "questionAnswer": "sun",
            "type": 0
        },
        {
            "id": 5,
            "sipExtension": "8000",
            "question": "您出生的城市",
            "questionCode": "CITY",
            "questionAnswer": "wz",
            "type": 0
        }
    ],
    "status": true
}

更新当前用户的密保问题
## 用途	更新当前用户的密保问题
URL	/webapi/portal/security-question/update-question
Method	POST
参数	[
    {
        "questionCode": "NICK_NAME",
        "questionAnswer": "sun"
    },
    {
        "questionCode": "CITY",
        "questionAnswer": "wz"
    }
]
返回	{
    "status": true
}




查询业务设置
## 用途	查询业务设置
URL	/webapi/portal/user/business
Method	GET
参数	
返回	{
    "data": {
        "extension": "8000",
        "voicemail": "off",
        "voicemail_passwd": "",
        "voicemail_greeting": "",
        "forward_uncondition": "Deactivate",
        "forward_uncondition_dst": "",
        "forward_unregister": "Deactivate",
        "forward_unregister_dst": "",
        "forward_busy": "Deactivate",
        "forward_busy_dst": "",
        "forward_noreply": "Deactivate",
        "forward_noreply_dst": "",
        "forward_noreply_timeout": "",
        "strategy": "",
        "ring_seque": "",
        "apply": "",
        "promptName": ""
    },
    "status": true
}

提示语列表
## 用途	提示语列表
URL	/webapi/portal/prompt/list
Method	GET
参数	
返回	{
    "data": [
        {
            "id": 1,
            "name": "test",
            "describe": "dd",
            "fileUrl": "voicemail_greeting_8000_1777404520.wav",
            "sipExtension": "8000"
        }
    ],
    "status": true
}

上传提示语文件
## 用途	上传提示语文件
URL	/webapi/portal/file/upload-file?fileType=prompt
Method	POST
参数	file:文件
返回	{
    "data": "voicemail_greeting_8000_1777404520.wav",
    "status": true
}




新建提示语
## 用途	新建提示语
URL	/webapi/portal/prompt
Method	POST
参数	{
    "name": "test",
    "describe": "dd",
    "fileUrl": "voicemail_greeting_8000_1777404520.wav"
}
返回	{
    "status": true
}




删除提示语
## 用途	删除提示语
URL	/webapi/portal/prompt?id=1
Method	DELETE
参数	{
    "name": "test",
    "describe": "dd",
    "fileUrl": "voicemail_greeting_8000_1777404520.wav"
}
返回	{
    "status": true
}




保存业务设置
## 用途	保存业务设置
URL	/webapi/portal/user/business
Method	PUT
参数	{
    "voicemail_greeting": "voicemail_greeting_8000_1777404520.wav",
    "voicemail": "on",
    "voicemail_passwd": "123456",
    "forward_uncondition": "Deactivate",
    "forward_unregister": "Deactivate",
    "forward_busy": "Deactivate",
    "forward_noreply": "Deactivate",
    "strategy": "simultaneous",
    "ring_seque": [
        "",
        "",
        "",
        ""
    ]
}
返回	{
    "status": true
}
