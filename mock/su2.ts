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

let operatorSignedStatus = 'Logged Out';

let nightStrategies = [
  {
    id: 1,
    policyName: '默认夜服',
    activationType: 'sipExtension',
    extensionNumber: '8008',
    extensionIndex: 9,
    number: '',
    closeType: 'playback',
    soundName: '默认提示音',
    soundKey: '0',
    createAt: '2026-04-29 05:46:45',
    updateAt: '2026-04-29 05:46:45',
    remark: '下班后播放提示音',
  },
];

let currentNightStrategyId = 0;

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

const attendantCdrRecords = [
  {
    ...cdrRecords[0],
    uuid: 'attendant-call-1',
    destination_number: '8003',
    direction: 'in',
    cdrTypeName: '呼入',
    name: '8003',
    extension: '8000',
    sip: '8000',
    duration: '32',
    start_time: '2026-04-30 09:30:00',
    area_call: '内部',
    queue: '123456',
  },
  {
    ...cdrRecords[1],
    uuid: 'attendant-call-2',
    destination_number: '13800000000',
    direction: 'out',
    cdrTypeName: '呼出',
    name: '客户A',
    extension: '8000',
    sip: '8000',
    duration: '186',
    start_time: '2026-04-30 10:12:00',
    area_call: '国内',
    queue: '123456',
  },
];

const hotelCdrRecords = [
  {
    ...cdrRecords[0],
    uuid: 'hotel-call-1',
    destination_number: '10086',
    direction: 'out',
    cdrTypeName: '呼出',
    room_number: '101',
    guest_name: '张三',
    extension: '8040',
    sip: '8040',
    duration: '65',
    start_time: '2026-04-30 12:10:00',
    area_call: '国内',
  },
  {
    ...cdrRecords[1],
    uuid: 'hotel-call-2',
    destination_number: '8000',
    direction: 'in',
    cdrTypeName: '呼入',
    room_number: '201',
    guest_name: '李四',
    extension: '8041',
    sip: '8041',
    duration: '22',
    start_time: '2026-04-30 13:20:00',
    area_call: '内部',
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

let hotelPositions = [
  {
    id: 1,
    name: '1栋',
    pid: 0,
    children: [
      { id: 3, name: '1层', pid: 1, children: null },
      { id: 4, name: '2层', pid: 1, children: null },
    ],
  },
];

let hotelRoomTypes = [
  { id: 1, name: '单人房', cup: 1 },
  { id: 2, name: '中房', cup: 2 },
];

let hotelRooms = [
  {
    id: 1,
    position_id: 3,
    position: '1栋-1层',
    extension: '8040',
    room_number: '101',
    room_type_id: 2,
    room_type: '中房',
    room_cup: 2,
    status: 2,
    alarm_count: 0,
    vacant: 1,
    vip: 0,
    repair_status: 1,
    clean_status: 1,
    check_status: 1,
    guest_name: '',
  },
  {
    id: 2,
    position_id: 4,
    position: '1栋-2层',
    extension: '8041',
    room_number: '201',
    room_type_id: 1,
    room_type: '单人房',
    room_cup: 1,
    status: 2,
    alarm_count: 1,
    vacant: 2,
    vip: 1,
    repair_status: 2,
    clean_status: 1,
    check_status: 1,
    guest_name: '张三',
  },
];

let hotelWaiters = [
  { id: 1, name: '清洁', pinCode: '1001' },
  { id: 2, name: '维修', pinCode: '1002' },
];

let hotelServiceCode = {
  accessNumber: '8',
  serviceCodeSwitch: 'on',
  functionCodeSwitch: 'on',
  serviceCodeChildren: [
    { type: 1, status: 1, code: '1' },
    { type: 1, status: 2, code: '2' },
    { type: 1, status: 5, code: '3' },
    { type: 2, status: 3, code: '4' },
    { type: 2, status: 4, code: '5' },
  ],
  functionCodeChildren: [
    { type: 1, status: 1, functionCode: '1' },
    { type: 1, status: 2, functionCode: '2' },
    { type: 1, status: 5, functionCode: '3' },
    { type: 2, status: 3, functionCode: '4' },
    { type: 2, status: 4, functionCode: '5' },
  ],
};

let hotelOperationRecords = [
  { id: 1, time: '2026-04-30 10:30:00', room: '101', code: '1', staff: '清洁', status: '干净' },
  { id: 2, time: '2026-04-30 11:05:00', room: '201', code: '5', staff: '维修', status: '待维修' },
];

const hotelCheckinRecords = [
  {
    id: '2604301001-101',
    room_number: '101',
    checkin_at: '2026-04-30 10:01:00',
    checkout_at: '2026-04-30 13:30:00',
    guest_name: '张三',
    level: '普通',
    phone: '13800000000',
  },
];

const hotelUserExtensions = [
  { index: '41', name: '8040', extension: '8040' },
  { index: '42', name: '8041', extension: '8041' },
  { index: '43', name: '8042', extension: '8042' },
];

const getHotelRoomSnapshot = (body: Record<string, any>) => {
  const roomType = hotelRoomTypes.find((item) => item.id === Number(body?.room_type_id));
  const floor = hotelPositions.flatMap((item) => item.children || []).find((item) => item.id === Number(body?.position_id));
  const building = hotelPositions.find((item) => (item.children || []).some((child) => child.id === Number(body?.position_id)));
  return {
    position_id: Number(body?.position_id),
    position: `${building?.name || ''}-${floor?.name || ''}`,
    extension: body?.extension || '',
    room_number: body?.room_number || '',
    room_type_id: Number(body?.room_type_id),
    room_type: roomType?.name || '',
    room_cup: roomType?.cup || 1,
    status: Number(body?.status || 2),
  };
};

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
    url: '/api/webapi/portal/queue/queue-operator',
    method: 'get',
    response: () => ok(queues),
  },
  {
    url: '/api/webapi/portal/queue/sign-in',
    method: 'post',
    response: ({ body }) => {
      operatorSignedStatus = body?.status || 'Logged Out';
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/queue/online',
    method: 'get',
    response: () => ok(sipList.filter((item) => item.status === 'online')),
  },
  {
    url: '/api/webapi/portal/queue/line-up',
    method: 'post',
    response: () => ok(operatorSignedStatus === 'Logged Out' ? [] : [
      { id: 1, caller: '8003', number: '8003', status: 'waiting', position: '1' },
      { id: 2, caller: '13800000000', number: '13800000000', status: 'waiting', position: '2' },
    ]),
  },
  {
    url: '/api/webapi/portal/queue/anchor',
    method: 'get',
    response: () => ok(operatorSignedStatus === 'Logged Out' ? [] : [
      { id: 1, number: '100', caller: '8006', status: 'parked', position: '100' },
    ]),
  },
  {
    url: '/api/webapi/portal/queue/sip-list',
    method: 'post',
    response: () => ok(sipList),
  },
  {
    url: '/api/webapi/portal/queue/operator-list',
    method: 'post',
    response: () => ok([
      { user: '8000', name: '8000', status: operatorSignedStatus === 'Logged Out' ? 'Logged Out' : 'Logged In', state: operatorSignedStatus },
      { user: '8001', name: '8001', status: 'Logged Out', state: 'rest' },
    ]),
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
    response: () => ok(operatorSignedStatus === 'Logged Out' ? [] : [
      { uuid: 'monitor-1', caller: '8003', callee: '8000', state: 'talking', start_time: '2026-04-30 10:30:00' },
    ]),
  },
  {
    url: '/api/webapi/portal/nightwear-strategy/list',
    method: 'get',
    response: () => ok(nightStrategies),
  },
  {
    url: '/api/webapi/portal/nightwear-strategy/page',
    method: 'post',
    response: ({ body }) => {
      const kw = String(body?.policyName || '').trim();
      const filtered = nightStrategies.filter((item) => !kw || item.policyName.includes(kw));
      return ok({
        total: filtered.length,
        pageSize: body?.pageSize || 10,
        pageNum: body?.pageNum || 1,
        records: filtered,
      });
    },
  },
  {
    url: '/api/webapi/portal/nightwear-strategy/add',
    method: 'post',
    response: ({ body }) => {
      nightStrategies = [
        {
          id: Date.now(),
          createAt: nowText(),
          updateAt: nowText(),
          extensionIndex: 0,
          soundName: '',
          soundKey: '',
          number: '',
          extensionNumber: '',
          remark: '',
          ...body,
        },
        ...nightStrategies,
      ];
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/nightwear-strategy/edit',
    method: 'post',
    response: ({ body }) => {
      nightStrategies = nightStrategies.map((item) =>
        item.id === Number(body?.id) ? { ...item, ...body, updateAt: nowText() } : item,
      );
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/nightwear-strategy/hot-update',
    method: 'get',
    response: () => ok(),
  },
  {
    url: '/api/webapi/portal/nightwear-strategy/del',
    method: 'get',
    response: ({ query }) => {
      nightStrategies = nightStrategies.filter((item) => item.id !== Number(query?.id));
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/nightwear-strategy/find-strategy',
    method: 'get',
    response: () => ok(nightStrategies.find((item) => item.id === currentNightStrategyId) || {
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
    response: ({ body }) => {
      currentNightStrategyId = body?.ifOpen ? Number(body?.strategyId || 0) : 0;
      return ok();
    },
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
    response: ({ body }) => {
      const records = body?.type === 'Pms' ? hotelCdrRecords : body?.type === 'Attendant' ? attendantCdrRecords : cdrRecords;
      return ok({
        total: records.length,
        pageSize: body?.pageSize || 10,
        pageNum: body?.pageNum || 1,
        records,
      });
    },
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
        queue_sum: 1,
        queue_available: operatorSignedStatus === 'Logged Out' ? 0 : 1,
        in_count: 18,
        connect_count: 15,
        caller_busy_count: 2,
        talk_sum_time: 2680,
        talk_time_max: 420,
        talk_time_min: 8,
        waiting_time_sum: 360,
        waiting_time_max: 70,
      }),
  },
  {
    url: '/api/webapi/portal/cdr/extension-page',
    method: 'post',
    response: ({ body }) => ok({
      page_num: body?.page_num || 1,
      page_size: body?.page_size || 10,
      total: 2,
      data: [
        { extension: '8000', name: '8000', connect_count: 12, talk_sum_time: 1820, waiting_time_sum: 120 },
        { extension: '8001', name: '8001', connect_count: 3, talk_sum_time: 860, waiting_time_sum: 240 },
      ],
    }),
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
    response: ({ body, query }) => {
      promptList = promptList.filter((item) => item.id !== Number(query?.id || body?.id));
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/room/list',
    method: 'get',
    response: ({ query }) => {
      const kw = String(query?.kw || '').trim();
      return ok(
        hotelRooms.filter((item) => {
          const matchKw =
            !kw ||
            item.room_number.includes(kw) ||
            item.extension.includes(kw) ||
            item.guest_name.includes(kw);
          const matchPosition = !query?.position || item.position_id === Number(query.position);
          const matchVacant = !query?.vacant || item.vacant === Number(query.vacant);
          const matchStatus = !query?.ifok || item.status === Number(query.ifok);
          return matchKw && matchPosition && matchVacant && matchStatus;
        }),
      );
    },
  },
  {
    url: '/api/webapi/portal/room/repair-status',
    method: 'put',
    response: ({ body }) => {
      hotelRooms = hotelRooms.map((item) =>
        item.id === Number(body?.id) ? { ...item, repair_status: body?.repair_status } : item,
      );
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/room/clean-status',
    method: 'put',
    response: ({ body }) => {
      hotelRooms = hotelRooms.map((item) =>
        item.id === Number(body?.id) ? { ...item, clean_status: body?.clean_status } : item,
      );
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/room/check-status',
    method: 'put',
    response: ({ body }) => {
      hotelRooms = hotelRooms.map((item) =>
        item.id === Number(body?.id) ? { ...item, check_status: body?.check_status } : item,
      );
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/checkin-detail/list',
    method: 'get',
    response: ({ query }) => ok({
      pageNum: Number(query?.pageNum || 1),
      pageSize: Number(query?.pageSize || 10),
      total: hotelCheckinRecords.length,
      data: hotelCheckinRecords,
    }),
  },
  {
    url: '/api/webapi/portal/service-code/list',
    method: 'post',
    response: () => ok(hotelServiceCode),
  },
  {
    url: '/api/webapi/portal/service-code/edit',
    method: 'post',
    response: ({ body }) => {
      hotelServiceCode = { ...hotelServiceCode, ...body };
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/waiter/page',
    method: 'post',
    response: ({ body }) => {
      const kw = String(body?.kw || '').trim();
      const filtered = hotelWaiters.filter((item) => !kw || item.name.includes(kw) || item.pinCode.includes(kw));
      return ok({
        total: filtered.length,
        pageSize: body?.pageSize || 10,
        pageNum: body?.pageNum || 1,
        records: filtered,
      });
    },
  },
  {
    url: '/api/webapi/portal/waiter/add',
    method: 'post',
    response: ({ body }) => {
      hotelWaiters = [...hotelWaiters, { id: Date.now(), name: body?.name || '', pinCode: body?.pinCode || '' }];
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/waiter/edit',
    method: 'post',
    response: ({ body }) => {
      hotelWaiters = hotelWaiters.map((item) =>
        item.id === Number(body?.id) ? { ...item, name: body?.name || '', pinCode: body?.pinCode || '' } : item,
      );
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/waiter/del',
    method: 'post',
    response: ({ body }) => {
      const ids = (body?.ids || []).map(Number);
      hotelWaiters = hotelWaiters.filter((item) => !ids.includes(item.id));
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/operation-record/page',
    method: 'post',
    response: ({ body }) => {
      const kw = String(body?.condition || '').trim();
      const filtered = hotelOperationRecords.filter(
        (item) => !kw || item.room.includes(kw) || item.staff.includes(kw) || item.code.includes(kw),
      );
      return ok({
        total: filtered.length,
        pageSize: body?.pageSize || 10,
        pageNum: body?.pageNum || 1,
        records: filtered,
      });
    },
  },
  {
    url: '/api/webapi/portal/room-type/list',
    method: 'get',
    response: () => ok({ total: hotelRoomTypes.length, page_num: 1, page_size: 30, data: hotelRoomTypes }),
  },
  {
    url: '/api/webapi/portal/room-type/admin/add',
    method: 'post',
    response: ({ body }) => {
      hotelRoomTypes = [...hotelRoomTypes, { id: Date.now(), name: body?.name || '', cup: Number(body?.cup || 1) }];
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/room-type/admin/edit',
    method: 'post',
    response: ({ body }) => {
      hotelRoomTypes = hotelRoomTypes.map((item) =>
        item.id === Number(body?.id) ? { ...item, name: body?.name || '', cup: Number(body?.cup || 1) } : item,
      );
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/room-type/admin/delete',
    method: 'delete',
    response: ({ body }) => {
      hotelRoomTypes = hotelRoomTypes.filter((item) => item.id !== Number(body?.id));
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/room-type/admin/bind',
    method: 'post',
    response: ({ body }) => {
      const ids = (body?.id || []).map(Number);
      return ok(hotelRooms.filter((item) => ids.includes(item.room_type_id)));
    },
  },
  {
    url: '/api/webapi/portal/position/list',
    method: 'get',
    response: () => ok(hotelPositions),
  },
  {
    url: '/api/webapi/portal/position/admin/add',
    method: 'post',
    response: ({ body }) => {
      const row = { id: Date.now(), name: body?.name || '', pid: Number(body?.pid || 0), children: body?.pid ? null : [] };
      if (row.pid === 0) {
        hotelPositions = [...hotelPositions, row];
      } else {
        hotelPositions = hotelPositions.map((item) =>
          item.id === row.pid ? { ...item, children: [...(item.children || []), row] } : item,
        );
      }
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/position/admin/edit',
    method: 'post',
    response: ({ body }) => {
      hotelPositions = hotelPositions.map((building) => {
        if (building.id === Number(body?.id)) return { ...building, name: body?.name || '' };
        return {
          ...building,
          children: (building.children || []).map((floor) =>
            floor.id === Number(body?.id) ? { ...floor, name: body?.name || '' } : floor,
          ),
        };
      });
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/position/admin/delete',
    method: 'delete',
    response: ({ body }) => {
      const id = Number(body?.id);
      hotelPositions = hotelPositions
        .filter((item) => item.id !== id)
        .map((building) => ({ ...building, children: (building.children || []).filter((floor) => floor.id !== id) }));
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/position/admin/bind',
    method: 'get',
    response: ({ query }) => {
      const id = Number(query?.id);
      const building = hotelPositions.find((item) => item.id === id);
      const ids = building ? [id, ...(building.children || []).map((child) => child.id)] : [id];
      return ok(hotelRooms.filter((item) => ids.includes(item.position_id)));
    },
  },
  {
    url: '/api/webapi/portal/room/admin/list',
    method: 'get',
    response: ({ query }) => {
      const kw = String(query?.kw || '').trim();
      const filtered = hotelRooms.filter((item) => {
        const matchKw = !kw || item.room_number.includes(kw) || item.extension.includes(kw);
        const matchPosition = !query?.position_id || item.position_id === Number(query.position_id);
        const matchRoomType = !query?.room_type_id || item.room_type_id === Number(query.room_type_id);
        const matchStatus = !query?.status || item.status === Number(query.status);
        return matchKw && matchPosition && matchRoomType && matchStatus;
      });
      return ok({
        total: filtered.length,
        page_num: Number(query?.pageNum || 1),
        page_size: Number(query?.pageSize || 10),
        data: filtered,
      });
    },
  },
  {
    url: '/api/webapi/portal/user/user-list',
    method: 'get',
    response: () => ok({ total: hotelUserExtensions.length, PageNum: 0, PageSize: 50, list: hotelUserExtensions }),
  },
  {
    url: '/api/webapi/portal/room/admin/add',
    method: 'post',
    response: ({ body }) => {
      hotelRooms = [
        ...hotelRooms,
        {
          id: Date.now(),
          ...getHotelRoomSnapshot(body),
          alarm_count: 0,
          vacant: 1,
          vip: 0,
          repair_status: 1,
          clean_status: 2,
          check_status: 1,
          guest_name: '',
        },
      ];
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/room/admin/edit',
    method: 'post',
    response: ({ body }) => {
      hotelRooms = hotelRooms.map((item) =>
        item.id === Number(body?.id)
          ? {
              ...item,
              ...getHotelRoomSnapshot(body),
            }
          : item,
      );
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/room/admin/add/bulk',
    method: 'post',
    response: ({ body }) => {
      const rows = Array.isArray(body) ? body : [];
      hotelRooms = [
        ...hotelRooms,
        ...rows.map((row, index) => ({
          id: Date.now() + index,
          ...getHotelRoomSnapshot(row),
          alarm_count: 0,
          vacant: 1,
          vip: 0,
          repair_status: 1,
          clean_status: 2,
          check_status: 1,
          guest_name: '',
        })),
      ];
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/room/admin/edit/bulk',
    method: 'post',
    response: ({ body }) => {
      const ids = (body?.ids || []).map(Number);
      hotelRooms = hotelRooms.map((item) => {
        if (!ids.includes(item.id)) return item;
        const next = { ...item };
        if (body?.position_id != null) {
          const floor = hotelPositions.flatMap((pos) => pos.children || []).find((pos) => pos.id === Number(body.position_id));
          const building = hotelPositions.find((pos) => (pos.children || []).some((child) => child.id === Number(body.position_id)));
          next.position_id = Number(body.position_id);
          next.position = `${building?.name || ''}-${floor?.name || ''}`;
        }
        if (body?.room_type_id != null) {
          const roomType = hotelRoomTypes.find((type) => type.id === Number(body.room_type_id));
          next.room_type_id = Number(body.room_type_id);
          next.room_type = roomType?.name || next.room_type;
          next.room_cup = roomType?.cup || next.room_cup;
        }
        if (body?.status != null) next.status = Number(body.status);
        return next;
      });
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/room/admin/delete',
    method: 'delete',
    response: ({ body }) => {
      const ids = (body?.id || []).map(Number);
      hotelRooms = hotelRooms.filter((item) => !ids.includes(item.id));
      return ok();
    },
  },
  {
    url: '/api/webapi/portal/dinlink/pms/is-app',
    method: 'get',
    response: () => ok({ isOpen: false }),
  },
];
