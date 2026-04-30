type Su2Response<T = unknown> = {
  status: boolean | number;
  data?: T;
  err?: string;
  cause?: unknown;
};

const ok = <T = unknown>(data?: T): Su2Response<T> =>
  typeof data === 'undefined' ? { status: true } : { status: true, data };

const userInfo = {
  id: '1',
  extensionNo: '8000',
  photo: '',
  firstName: 'test2',
  lastName: 'sun',
  callerName: '8000',
  organization: 'test',
  department: 'test2',
  position: 'test3',
  mailbox: '',
  gender: 'male',
  phoneNumber: '456',
  alternatePhoneNumber: '18658809999',
  fixedPhoneNumber: '1',
  officePhoneNumber: '123',
  faxPhoneNumber: '2',
  address: '3',
  remarks: '4',
  enable: '0',
  sipId: 1,
};

let personalGroups = ['test', 'test3'];
let externalGroups = ['test'];

let contacts = [
  {
    id: '1',
    photo: '1777393245.jpg',
    groups: ['test3'],
    firstName: 'zy',
    lastName: 'g',
    extensionNo: '',
    callerName: '',
    gender: 'male',
    position: '',
    mailbox: '',
    department: 'fdafda',
    organization: '',
    phoneNumber: '22',
    alternatePhoneNumber: '',
    fixedPhoneNumber: '',
    officePhoneNumber: '22',
    faxPhoneNumber: '',
    address: 'test',
    remarks: '',
    isCollect: false,
    initial: '',
    frequentContactId: 0,
  },
];

const updateContactById = (id: string, data: Record<string, any>) => {
  contacts = contacts.map((item) => (item.id === id ? { ...item, ...data } : item));
};

const normalizeContact = (body: Record<string, any>) => ({
  id: body?.id ? String(body.id) : String(Date.now() + Math.floor(Math.random() * 1000)),
  photo: body?.photo || '',
  groups: body?.groups || [],
  firstName: body?.firstName || '',
  lastName: body?.lastName || '',
  extensionNo: body?.extensionNo || '',
  callerName: body?.callerName || '',
  gender: body?.gender || '',
  position: body?.position || '',
  mailbox: body?.mailbox || '',
  department: body?.department || '',
  organization: body?.organization || '',
  phoneNumber: body?.phoneNumber || '',
  alternatePhoneNumber: body?.alternatePhoneNumber || '',
  fixedPhoneNumber: body?.fixedPhoneNumber || '',
  officePhoneNumber: body?.officePhoneNumber || '',
  faxPhoneNumber: body?.faxPhoneNumber || '',
  address: body?.address || '',
  remarks: body?.remarks || '',
  isCollect: false,
  initial: '',
  frequentContactId: 0,
});

const queues = [
  {
    index: '1',
    name: 'test',
    number: '123456',
  },
];

let businessSetting = {
  extension: '8000',
  voicemail: 'off',
  voicemail_passwd: '',
  voicemail_greeting: '',
  forward_uncondition: 'Deactivate',
  forward_uncondition_dst: '',
  forward_unregister: 'Deactivate',
  forward_unregister_dst: '',
  forward_busy: 'Deactivate',
  forward_busy_dst: '',
  forward_noreply: 'Deactivate',
  forward_noreply_dst: '',
  forward_noreply_timeout: '',
  strategy: 'sequential',
  ring_seque: ['2', '1'],
  apply: '',
  promptName: '',
};

let promptList = [
  {
    id: 1,
    name: 'test',
    describe: 'dd',
    fileUrl: 'voicemail_greeting_8000_1777404520.wav',
    sipExtension: '8000',
  },
];

const cdrRecords = [
  {
    destination_number: '25555',
    direction: 'out',
    duration: '0',
    start_time: '2026-04-29 01:24:24',
    end_time: '2026-04-29 01:24:24',
    start_epoch_time: '1777397064',
    end_epoch_time: '1777397064',
    record_file: '',
    hangup_cause: 'NO_ROUTE_DESTINATION',
    name: '25555',
    department: '',
    uuid: '06ec428a-c069-43d2-bd49-d4a2f2d152b4',
    partner_uuid: '',
    cdrType: 2,
    cdrTypeName: '呼出',
    remark: '',
    sip: '8000',
    dialCount: 0,
    photo: '',
    destination_number_type: 'external',
    video: '',
    queue: '',
    refer_to: '',
    refer_to_name: '',
    refer_by: '',
    refer_by_name: '',
    area_call: 'unkown',
    extension: '8000',
    fee: '-',
    room_number: '',
    guest_name: '',
  },
  {
    destination_number: '22',
    direction: 'out',
    duration: '0',
    start_time: '2026-04-29 01:15:11',
    end_time: '2026-04-29 01:15:11',
    start_epoch_time: '1777396511',
    end_epoch_time: '1777396511',
    record_file: '',
    hangup_cause: 'NO_ROUTE_DESTINATION',
    name: 'g zy',
    department: 'fdafda',
    uuid: '4975d8fb-cccd-4955-a30d-ad30fb0e0f1c',
    partner_uuid: '',
    cdrType: 2,
    cdrTypeName: '呼出',
    remark: '',
    sip: '8000',
    dialCount: 0,
    photo: '1777393245.jpg',
    destination_number_type: 'external',
    video: '',
    queue: '',
    refer_to: '',
    refer_to_name: '',
    refer_by: '',
    refer_by_name: '',
    area_call: 'unkown',
    extension: '8000',
    fee: '-',
    room_number: '',
    guest_name: '',
  },
];

const messageRecords = [
  {
    id: 1,
    played: false,
    name: '赵吉',
    caller: '8003',
    org: '',
    duration: '5',
    time: '2026-04-29 14:00:20',
    size: '82.86KB',
    remark: '',
    fileUrl: 'message_8003_1777393220.wav',
  },
  {
    id: 2,
    played: true,
    name: '李东方',
    caller: '70019',
    org: '',
    duration: '12',
    time: '2026-04-29 09:21:10',
    size: '126.20KB',
    remark: '已回拨',
    fileUrl: 'message_70019_1777377670.wav',
  },
];

const sipList = [
  {
    user: '8000',
    name: 'sun test2',
    dnd: 'off',
    voicemail: 'on',
    status: 'online',
    state: 'idle',
    alarm_clock: false,
  },
  {
    user: '8001',
    name: '8001',
    dnd: 'off',
    voicemail: 'off',
    status: 'offline',
    state: 'idle',
    alarm_clock: false,
  },
  {
    user: '8002',
    name: '8002',
    dnd: 'off',
    voicemail: 'off',
    status: 'offline',
    state: 'idle',
    alarm_clock: false,
  },
];

const alarmTones = [
  { id: '0', name: 'default tone', desc: '' },
  { id: '1', name: 'morning call', desc: 'Morning wake up tone' },
];

let alarmTasks = [
  {
    id: 1,
    name: 'test',
    tone: '0',
    status: 1,
    start_time: '2026-04-30',
    end_time: '2026-04-30',
    descript: 'fdasf',
    create_at: '2026-04-29 02:52:33',
    create_by: '',
    sip: ['8002'],
    run_time: '2026-04-30 10:06',
    repeat_rate: 1,
    circulation_type: 1,
    circulation: 0,
    faild_count: 0,
    firstName: '',
    lastName: '',
  },
];

let alarmLogs = [
  {
    at: '2026-04-29 02:53:54',
    alarm_id: 1,
    taskName: 'test',
    eventType: 'STOP',
    msg: '',
    userSip: '8000',
    firstName: '8000',
    lastName: '',
    sip: '8002',
  },
];

const nowText = () => new Date().toISOString().slice(0, 19).replace('T', ' ');

const addAlarmLog = (task: any, eventType: string, msg = '') => {
  alarmLogs = [
    {
      at: nowText(),
      alarm_id: task.id,
      taskName: task.name,
      eventType,
      msg,
      userSip: '8000',
      firstName: '8000',
      lastName: '',
      sip: (task.sip || []).join(','),
    },
    ...alarmLogs,
  ];
};

export default [
  {
    url: '/api/webapi/portal/login/logo-banner',
    method: 'get',
    response: () => ok({ data: 'QT8000', type: 'character' }),
  },
  {
    url: '/api/webapi/portal/login/language',
    method: 'get',
    response: () => ok('zh_cn'),
  },
  {
    url: '/api/webapi/portal/login/device-type',
    method: 'get',
    response: () => ok('QT8000'),
  },
  {
    url: '/api/webapi/portal/login/key',
    method: 'get',
    response: () =>
      ok({
        key:
          '-----BEGIN PUBLIC KEY-----\n' +
          'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6ddl8iGYCD8e26upvzTP\n' +
          'W9jehN7E46wr2FwMjYHM+Jq9itTWiK0lXLVYxTBBEW4gj5nHFCCjzvgXOrmDcGlQ\n' +
          'enKRnX0bICegTjmd+LahEww72IcNmwTqHpVPCz8gxEL+SZjcYUGwpJKFZuWGH4W0\n' +
          'w/KDY2DLGZ1R/iSC2sCoYRWUKQDBxRE+KCfGu4xD/QjI6kOOHCZK2nJicE0ilV5G\n' +
          '/sM5ZOiXz3KVEQQ5zQAyiSXHyk15FVeu4ms4x2MHNJYslieGeNTH5H+7Y9ZWUb5s\n' +
          '26V82HozcdmsubDrhzQmxTrz7m3KSwEwzMgF8yLZhsOhnhQfBNuFLvsMgYACQCGY\n' +
          'pwIDAQAB\n' +
          '-----END PUBLIC KEY-----\n',
      }),
  },
  {
    url: '/api/webapi/portal/login/account',
    method: 'post',
    response: ({ body }) => {
      // 如需本地验证首次登录向导：登录分机号设为 firstlogin（任意密码走 mock RSA 链路）
      const acc = body?.acc != null ? String(body.acc) : '';
      const first = acc.toLowerCase() === 'firstlogin';
      return ok({
        token: 'mock-su2-token',
        user: {
          id: 2,
          sipExtension: acc || '8000',
          ifFirstLogin: first,
        },
        sipPwd: 'Pico@2025',
        sipProfile: '1',
      });
    },
  },
  {
    url: '/api/webapi/portal/login/quit',
    method: 'get',
    response: () => ok(),
  },
  {
    url: '/api/webapi/portal/login/sip-addr',
    method: 'get',
    response: () =>
      ok({
        Prefix: '/wss',
        Schema: 'wss',
        Target: '192.168.10.31',
        Port: '7443',
      }),
  },
  {
    url: '/api/webapi/portal/user/user-info',
    method: 'get',
    response: () => ok(userInfo),
  },
  {
    url: '/api/webapi/portal/user/check-linkPwd',
    method: 'post',
    response: () => ok(true),
  },
  {
    url: '/api/webapi/portal/user/set-protectQuestions',
    method: 'post',
    response: () => ok(),
  },
  {
    url: '/api/webapi/portal/user/set-userInfo',
    method: 'post',
    response: () => ok(),
  },
  {
    url: '/api/webapi/portal/user/edit-linkPwd',
    method: 'post',
    response: () => ok(),
  },
  {
    url: '/api/webapi/portal/user/edit-base',
    method: 'put',
    response: () => ok(),
  },
  {
    url: '/api/webapi/portal/user/edit-other',
    method: 'put',
    response: () => ok(),
  },
  {
    url: '/api/webapi/portal/user/edit-sipPwd',
    method: 'post',
    response: () => ok({ sipPwd: '12345678a' }),
  },
  {
    url: '/api/webapi/portal/user/pwd-strength',
    method: 'get',
    response: () => ok({ pwdStrength: 2, dinlinkPwdStrength: 2 }),
  },
  {
    url: '/api/webapi/portal/user/business',
    method: 'get',
    response: () => ok(businessSetting),
  },
  {
    url: '/api/webapi/portal/user/business',
    method: 'put',
    response: ({ body }) => {
      const prompt = promptList.find((item) => item.fileUrl === body?.voicemail_greeting);
      businessSetting = {
        ...businessSetting,
        ...body,
        promptName: prompt?.name || '',
      };
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/security-question/list',
    method: 'get',
    response: () =>
      ok([
        { id: 1, question: '您的昵称', code: 'NICK_NAME', type: 0 },
        { id: 2, question: '您的生日', code: 'BIRTHDAY', type: 1 },
        { id: 3, question: '您出生的城市', code: 'CITY', type: 0 },
        { id: 4, question: '您的紧急联系人姓名', code: 'EMERGENCY_CONTACT_NAME', type: 0 },
        { id: 5, question: '您的紧急联系人手机号码', code: 'EMERGENCY_CONTACT_PHONE', type: 0 },
      ]),
  },
  {
    url: '/api/webapi/portal/security-question/sip-question',
    method: 'get',
    response: () =>
      ok([
        {
          id: 4,
          sipExtension: '8000',
          question: '您的昵称',
          questionCode: 'NICK_NAME',
          questionAnswer: 'sun',
          type: 0,
        },
        {
          id: 5,
          sipExtension: '8000',
          question: '您出生的城市',
          questionCode: 'CITY',
          questionAnswer: 'wz',
          type: 0,
        },
      ]),
  },
  {
    url: '/api/webapi/portal/security-question/sip-question/forget',
    method: 'get',
    response: () =>
      ok([
        { id: 6, sipExtension: '8000', question: '您的昵称', questionCode: 'NICK_NAME', type: 0 },
        { id: 7, sipExtension: '8000', question: '您出生的城市', questionCode: 'CITY', type: 0 },
      ]),
  },
  {
    url: '/api/webapi/portal/security-question/verify-security',
    method: 'post',
    response: () => ok(true),
  },
  {
    url: '/api/webapi/portal/security-question/update-question',
    method: 'post',
    response: () => ok(),
  },
  {
    url: '/api/webapi/portal/user/forget-pwd',
    method: 'put',
    response: () => ok(),
  },
  {
    url: '/api/webapi/portal/account/address-book/group/edit',
    method: 'post',
    response: ({ body }) => {
      personalGroups = body?.groups || [];
      contacts = contacts.map((item) => ({
        ...item,
        groups: item.groups.filter((group) => personalGroups.includes(group)),
      }));
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/account/address-book/group/list',
    method: 'get',
    response: () => ok(personalGroups),
  },
  {
    url: '/api/webapi/portal/account/address-book/group-external/list',
    method: 'get',
    response: () => ok(externalGroups),
  },
  {
    url: '/api/webapi/portal/account/address-book/contacts/list',
    method: 'post',
    response: ({ body }) => {
      const group = body?.groups;
      const condition = body?.condition;
      return ok(
        contacts.filter((item) => {
          const matchGroup = !group || item.groups.includes(group);
          const keyword = String(condition || '').trim();
          const name = `${item.lastName}${item.firstName}`;
          const matchKeyword =
            !keyword ||
            name.includes(keyword) ||
            item.phoneNumber.includes(keyword) ||
            item.officePhoneNumber.includes(keyword);
          return matchGroup && matchKeyword;
        }),
      );
    },
  },
  {
    url: '/api/webapi/portal/account/address-book/contacts',
    method: 'post',
    response: ({ body }) => {
      contacts = [...contacts, normalizeContact(body)];
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/account/address-book/contacts/import',
    method: 'post',
    response: ({ body }) => {
      const rows = Array.isArray(body?.contacts) ? body.contacts : [];
      rows.forEach((item: Record<string, any>) => {
        contacts = [...contacts, normalizeContact(item)];
        personalGroups = Array.from(new Set([...personalGroups, ...(item.groups || [])]));
      });
      return ok({ count: rows.length });
    },
  },
  {
    url: '/api/webapi/portal/account/address-book/contacts/export',
    method: 'post',
    response: ({ body }) => {
      const ids = Array.isArray(body?.id) ? body.id.map(String) : [];
      const group = body?.groups;
      const keyword = String(body?.condition || '').trim();
      const rows = (ids.length ? contacts.filter((item) => ids.includes(item.id)) : contacts).filter((item) => {
        const matchGroup = !group || item.groups.includes(group);
        const name = `${item.lastName}${item.firstName}`;
        const matchKeyword =
          !keyword ||
          name.includes(keyword) ||
          item.phoneNumber.includes(keyword) ||
          item.officePhoneNumber.includes(keyword);
        return matchGroup && matchKeyword;
      });
      return ok({
        fileName: 'contacts.csv',
        content: rows
          .map((item) =>
            [
              item.lastName,
              item.firstName,
              item.gender,
              item.phoneNumber,
              item.officePhoneNumber,
              item.groups.join('/'),
              item.organization,
              item.department,
              item.position,
              item.mailbox,
              item.alternatePhoneNumber,
              item.fixedPhoneNumber,
              item.faxPhoneNumber,
              item.address,
              item.remarks,
            ].join(','),
          )
          .join('\n'),
      });
    },
  },
  {
    url: '/api/webapi/portal/account/address-book/contacts',
    method: 'put',
    response: ({ body }) => {
      (body || []).forEach((item: any) => {
        (item.id || []).forEach((id: string) => {
          updateContactById(id, { groups: item.groups || [] });
        });
      });
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/account/address-book/contacts',
    method: 'delete',
    response: ({ body }) => {
      const ids = body?.id || [];
      contacts = contacts.filter((item) => !ids.includes(item.id));
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/account/address-book/batchContacts',
    method: 'put',
    response: ({ body }) => {
      (body?.id || []).forEach((id: string) => {
        updateContactById(id, {
          photo: body?.photo || '',
          groups: body?.groups || [],
          firstName: body?.firstName || '',
          lastName: body?.lastName || '',
          gender: body?.gender || '',
          position: body?.position || '',
          mailbox: body?.mailbox || '',
          department: body?.department || '',
          organization: body?.organization || '',
          phoneNumber: body?.phoneNumber || '',
          alternatePhoneNumber: body?.alternatePhoneNumber || '',
          fixedPhoneNumber: body?.fixedPhoneNumber || '',
          officePhoneNumber: body?.officePhoneNumber || '',
          faxPhoneNumber: body?.faxPhoneNumber || '',
          address: body?.address || '',
          remarks: body?.remarks || '',
        });
      });
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/account/address-book/license',
    method: 'get',
    response: () => ok({ private_unused: 1010 }),
  },
  {
    url: '/api/webapi/portal/frequent-contacts/list',
    method: 'get',
    response: () => ok(contacts.filter((item) => item.isCollect)),
  },
  {
    url: '/api/webapi/portal/frequent-contacts/prompt/add',
    method: 'post',
    response: ({ body }) => {
      updateContactById(body?.uuid, {
        isCollect: true,
        frequentContactId: Number(body?.uuid) || Date.now(),
      });
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/frequent-contacts/prompt/del',
    method: 'delete',
    response: ({ body }) => {
      contacts = contacts.map((item) =>
        item.frequentContactId === body?.id || item.id === String(body?.id)
          ? { ...item, isCollect: false, frequentContactId: 0 }
          : item,
      );
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/public-contacts/contacts/list',
    method: 'post',
    response: ({ body }) => {
      const keyword = String(body?.condition || '').trim();
      return ok(
        contacts.filter((item) => {
          const name = `${item.lastName}${item.firstName}`;
          return (
            !keyword ||
            name.includes(keyword) ||
            item.phoneNumber.includes(keyword) ||
            item.officePhoneNumber.includes(keyword) ||
            item.extensionNo.includes(keyword)
          );
        }),
      );
    },
  },
  {
    url: '/api/webapi/portal/public-contacts/contacts-external/list',
    method: 'post',
    response: () => ok(contacts),
  },
  {
    url: '/api/webapi/portal/public-contacts/contacts/list-call-show',
    method: 'post',
    response: ({ body }) => {
      const keyword = String(body?.condition || '').trim();
      const matched = contacts.find(
        (item) =>
          item.extensionNo === keyword ||
          item.phoneNumber === keyword ||
          item.officePhoneNumber === keyword,
      );
      return ok(matched || null);
    },
  },
  {
    url: '/api/webapi/portal/file/upload-file',
    method: 'post',
    response: ({ query }) => ok(query?.fileType === 'prompt' ? 'voicemail_greeting_8000_1777404520.wav' : '1777393245.jpg'),
  },
  {
    url: '/api/webapi/portal/file/download-file',
    method: 'get',
    rawResponse: async (_, res) => {
      const svg =
        '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">' +
        '<rect width="120" height="120" fill="#e8f4ff"/>' +
        '<text x="60" y="68" text-anchor="middle" font-size="34" fill="#1677ff">头像</text>' +
        '</svg>';
      res.setHeader('Content-Type', 'image/svg+xml');
      res.statusCode = 200;
      res.end(svg);
    },
  },
  {
    url: '/api/webapi/portal/license/find',
    method: 'get',
    response: () =>
      ok({
        ifAdmin: true,
        ifOperatorMember: false,
        pms: 'disable',
        attendant: 'disable',
      }),
  },
  {
    url: '/api/webapi/portal/extension-group/groups',
    method: 'get',
    response: () => ok(null),
  },
  {
    url: '/api/webapi/portal/login/addrbook',
    method: 'get',
    response: () => ok('lastName, firstName'),
  },
  {
    url: '/api/webapi/portal/queue/list',
    method: 'get',
    response: () => ok(queues),
  },
  {
    url: '/api/webapi/portal/queue/sign-in',
    method: 'post',
    response: () => ok(),
  },
  {
    url: '/api/webapi/portal/queue/online',
    method: 'get',
    response: () => ok(sipList.filter((item) => item.status === 'online')),
  },
  {
    url: '/api/webapi/portal/queue/sip-list',
    method: 'post',
    response: () => ok(sipList),
  },
  {
    url: '/api/webapi/portal/queue/operator-list',
    method: 'post',
    response: () => ok(null),
  },
  {
    url: '/api/webapi/portal/queue/night-status',
    method: 'post',
    response: () =>
      ok({
        leave_empty_queue: 'off',
        empty_queue_tone: '',
        forward_empty_queue: '',
        forward_empty_queue_dst: '',
      }),
  },
  {
    url: '/api/webapi/portal/queue/call-monitor',
    method: 'get',
    response: () => ok(null),
  },
  {
    url: '/api/webapi/portal/nightwear-strategy/list',
    method: 'get',
    response: () => ok([]),
  },
  {
    url: '/api/webapi/portal/nightwear-strategy/find-strategy',
    method: 'get',
    response: () =>
      ok({
        id: 0,
        policyName: '',
        activationType: '',
        extensionNumber: '',
        extensionIndex: 0,
        number: '',
        closeType: '',
        soundName: '',
        soundKey: '',
        createAt: null,
        updateAt: null,
        remark: '',
      }),
  },
  {
    url: '/api/webapi/portal/nightwear-strategy/set-strategy',
    method: 'post',
    response: () => ok(),
  },
  {
    url: '/api/webapi/portal/voicemail/page',
    method: 'post',
    response: ({ body }) =>
      ok({
        total: messageRecords.length,
        pageSize: body?.pageSize || 10,
        pageNum: body?.pageNum || 1,
        records: messageRecords,
        count: messageRecords.length,
      }),
  },
  {
    url: '/api/webapi/portal/message/page',
    method: 'post',
    response: ({ body }) =>
      ok({
        total: messageRecords.length,
        pageSize: body?.pageSize || 10,
        pageNum: body?.pageNum || 1,
        records: messageRecords,
        count: messageRecords.length,
      }),
  },
  {
    url: '/api/webapi/portal/cdr/page',
    method: 'post',
    response: ({ body }) =>
      ok({
        total: cdrRecords.length,
        pageSize: body?.pageSize || 10,
        pageNum: body?.pageNum || 1,
        records: cdrRecords,
      }),
  },
  {
    url: '/api/webapi/portal/cdr/add-remark',
    method: 'post',
    response: ({ body }) => {
      const record = cdrRecords.find((item) => item.uuid === body?.uuid);
      if (record) {
        record.remark = body?.remark || '';
      }
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/cdr/data',
    method: 'get',
    response: () =>
      ok({
        queue_sum: 0,
        queue_available: 0,
        in_count: 0,
        connect_count: 0,
        caller_busy_count: 0,
        talk_sum_time: 0,
        talk_time_max: 0,
        talk_time_min: 0,
        waiting_time_sum: 0,
        waiting_time_max: 0,
      }),
  },
  {
    url: '/api/webapi/portal/cdr/extension-page',
    method: 'post',
    response: ({ body }) => ok({ page_num: body?.page_num || 1, page_size: body?.page_size || 10, total: 0, data: null }),
  },
  {
    url: '/api/webapi/portal/alarm/tone',
    method: 'get',
    response: () => ok(alarmTones),
  },
  {
    url: '/api/webapi/portal/alarm/list',
    method: 'get',
    response: ({ query }) => {
      const pageNum = Number(query?.pageNum || 1);
      const pageSize = Number(query?.pageSize || 10);
      const status = query?.status == null || query?.status === '' ? null : Number(query.status);
      const filtered = status == null ? alarmTasks : alarmTasks.filter((item) => item.status === status);
      const start = (pageNum - 1) * pageSize;
      return ok({
        page: pageNum,
        pageSize,
        total: filtered.length,
        list: filtered.slice(start, start + pageSize),
      });
    },
  },
  {
    url: '/api/webapi/portal/alarm/add',
    method: 'post',
    response: ({ body }) => {
      const task = {
        id: Date.now(),
        name: body?.name || '',
        tone: body?.tone || '0',
        status: 1,
        start_time: body?.start_time || null,
        end_time: body?.end_time || null,
        descript: body?.descript || '',
        create_at: nowText(),
        create_by: '',
        sip: body?.sip || [],
        run_time: body?.run_time || '',
        repeat_rate: body?.repeat_rate || 1,
        circulation_type: body?.circulation_type || 1,
        circulation: body?.circulation || 0,
        faild_count: 0,
        firstName: '',
        lastName: '',
      };
      alarmTasks = [task, ...alarmTasks];
      addAlarmLog(task, 'ADD');
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/alarm/edit',
    method: 'put',
    response: ({ body }) => {
      const id = Number(body?.id);
      alarmTasks = alarmTasks.map((item) => {
        if (item.id !== id) return item;
        const next = { ...item, ...body, status: body?.status ?? item.status };
        addAlarmLog(next, 'EDIT');
        return next;
      });
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/alarm/stop',
    method: 'put',
    response: ({ body }) => {
      const id = Number(body?.alarm_id);
      alarmTasks = alarmTasks.map((item) => {
        if (item.id !== id) return item;
        const next = { ...item, status: 0 };
        addAlarmLog(next, 'STOP');
        return next;
      });
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/alarm/logs',
    method: 'get',
    response: ({ query }) => {
      const pageNum = Number(query?.pageNum || 1);
      const pageSize = Number(query?.pageSize || 10);
      const kw = String(query?.kw || '').trim();
      const filtered = alarmLogs.filter(
        (item) => !kw || item.taskName.includes(kw) || item.sip.includes(kw) || item.eventType.includes(kw),
      );
      const start = (pageNum - 1) * pageSize;
      return ok({
        page: pageNum,
        pageSize,
        total: filtered.length,
        list: filtered.slice(start, start + pageSize),
      });
    },
  },
  {
    url: '/api/webapi/portal/prompt/list',
    method: 'get',
    response: () => ok(promptList),
  },
  {
    url: '/api/webapi/portal/prompt',
    method: 'post',
    response: ({ body }) => {
      promptList = [
        ...promptList,
        {
          id: Date.now(),
          name: body?.name || '',
          describe: body?.describe || '',
          fileUrl: body?.fileUrl || '',
          sipExtension: '8000',
        },
      ];
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/prompt',
    method: 'delete',
    response: ({ body }) => {
      promptList = promptList.filter((item) => item.id !== body?.id);
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/dinlink/pms/is-app',
    method: 'get',
    response: () => ok({ isOpen: false }),
  },
];
