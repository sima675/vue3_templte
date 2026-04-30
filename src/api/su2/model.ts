export interface Su2LoginResult {
  token: string;
  user: {
    id: number;
    sipExtension: string;
    ifFirstLogin: boolean;
  };
  sipPwd: string;
  sipProfile: string;
}

export interface Su2UserInfo {
  id: string;
  extensionNo: string;
  photo: string;
  firstName: string;
  lastName: string;
  callerName: string;
  organization: string;
  department: string;
  position: string;
  mailbox: string;
  gender: 'male' | 'female' | 'unknown' | string;
  phoneNumber: string;
  alternatePhoneNumber: string;
  fixedPhoneNumber: string;
  officePhoneNumber: string;
  faxPhoneNumber: string;
  address: string;
  remarks: string;
  enable: string;
  sipId: number;
}

export interface Su2Contact {
  id: string;
  photo: string;
  groups: string[];
  firstName: string;
  lastName: string;
  extensionNo: string;
  callerName: string;
  gender: string;
  position: string;
  mailbox: string;
  department: string;
  organization: string;
  phoneNumber: string;
  alternatePhoneNumber: string;
  fixedPhoneNumber: string;
  officePhoneNumber: string;
  faxPhoneNumber: string;
  address: string;
  remarks: string;
  isCollect: boolean;
  initial: string;
  frequentContactId: number;
}

export interface Su2ContactPayload {
  photo?: string | null;
  lastName: string;
  firstName: string;
  gender?: string | null;
  phoneNumber?: string | null;
  officePhoneNumber?: string | null;
  groups?: string[];
  organization?: string | null;
  department?: string | null;
  position?: string | null;
  mailbox?: string | null;
  alternatePhoneNumber?: string | null;
  fixedPhoneNumber?: string | null;
  faxPhoneNumber?: string | null;
  address?: string | null;
  remarks?: string | null;
}

export interface Su2CdrRecord {
  destination_number: string;
  direction: 'out' | 'in' | string;
  duration: string;
  start_time: string;
  end_time: string;
  start_epoch_time: string;
  end_epoch_time: string;
  record_file: string;
  hangup_cause: string;
  name: string;
  department: string;
  uuid: string;
  partner_uuid: string;
  cdrType: number;
  cdrTypeName: string;
  remark: string;
  sip: string;
  dialCount: number;
  photo: string;
  destination_number_type: string;
  video: string;
  queue: string;
  refer_to: string;
  refer_to_name: string;
  refer_by: string;
  refer_by_name: string;
  area_call: string;
  extension: string;
  fee: string;
  room_number: string;
  guest_name: string;
}

export interface Su2PageResult<T> {
  total: number;
  pageSize: number;
  pageNum: number;
  records: T[] | null;
  count?: number;
}

export interface Su2BusinessSetting {
  extension: string;
  voicemail: 'on' | 'off' | string;
  voicemail_passwd: string;
  voicemail_greeting: string;
  forward_uncondition: string;
  forward_uncondition_dst: string;
  forward_unregister: string;
  forward_unregister_dst: string;
  forward_busy: string;
  forward_busy_dst: string;
  forward_noreply: string;
  forward_noreply_dst: string;
  forward_noreply_timeout: string;
  strategy: string;
  ring_seque: string | string[];
  apply: string;
  promptName: string;
}

export interface Su2Prompt {
  id: number;
  name: string;
  describe: string;
  fileUrl: string;
  sipExtension: string;
}

export interface Su2Queue {
  index: string;
  name: string;
  number: string;
}

export interface Su2SipExtension {
  user: string;
  name: string;
  dnd: string;
  voicemail: string;
  status: string;
  state: string;
  alarm_clock: boolean;
}

export interface Su2AlarmTone {
  id: string;
  name: string;
  desc: string;
}

export interface Su2AlarmTask {
  id: number;
  name: string;
  tone: string;
  status: number;
  start_time: string | null;
  end_time: string | null;
  descript: string;
  create_at: string;
  create_by: string;
  sip: string[];
  run_time: string;
  repeat_rate: number;
  circulation_type: number;
  circulation: number;
  faild_count: number;
  firstName: string;
  lastName: string;
}

export interface Su2ListResult<T> {
  page: number;
  pageSize: number;
  total: number;
  list: T[];
}

export interface Su2AlarmLog {
  at: string;
  alarm_id: number;
  taskName: string;
  eventType: string;
  msg: string;
  userSip: string;
  firstName: string;
  lastName: string;
  sip: string;
}
