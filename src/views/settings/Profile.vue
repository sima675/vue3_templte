<template>
  <div class="settings-page">
    <h2>信息维护</h2>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="basic" tab="基本设置">
        <a-card title="基础信息" :bordered="false" :loading="loading">
          <template #extra><a-button type="primary" @click="openBasicEdit">编辑</a-button></template>
          <a-descriptions :column="3">
            <a-descriptions-item label="头像">
              <a-avatar :size="72" class="avatar" :src="avatarUrl">{{ userInitial }}</a-avatar>
            </a-descriptions-item>
            <a-descriptions-item label="姓名">{{ fullName }}</a-descriptions-item>
            <a-descriptions-item label="分机号">{{ userInfo.extensionNo || '-' }}</a-descriptions-item>
            <a-descriptions-item label="手机号">{{ userInfo.phoneNumber || '-' }}</a-descriptions-item>
            <a-descriptions-item label="办公号码">{{ userInfo.officePhoneNumber || '-' }}</a-descriptions-item>
          </a-descriptions>
        </a-card>

        <a-card title="其他信息" :bordered="false" class="mt16" :loading="loading">
          <template #extra><a-button type="primary" @click="openOtherEdit">编辑</a-button></template>
          <a-descriptions :column="3">
            <a-descriptions-item label="主叫名">{{ userInfo.callerName || '-' }}</a-descriptions-item>
            <a-descriptions-item label="组织">{{ userInfo.organization || '-' }}</a-descriptions-item>
            <a-descriptions-item label="部门">{{ userInfo.department || '-' }}</a-descriptions-item>
            <a-descriptions-item label="职位">{{ userInfo.position || '-' }}</a-descriptions-item>
            <a-descriptions-item label="邮箱">{{ userInfo.mailbox || '-' }}</a-descriptions-item>
            <a-descriptions-item label="备用手机">{{ userInfo.alternatePhoneNumber || '-' }}</a-descriptions-item>
            <a-descriptions-item label="家庭号码">{{ userInfo.fixedPhoneNumber || '-' }}</a-descriptions-item>
            <a-descriptions-item label="传真号码">{{ userInfo.faxPhoneNumber || '-' }}</a-descriptions-item>
            <a-descriptions-item label="地址">{{ userInfo.address || '-' }}</a-descriptions-item>
            <a-descriptions-item label="备注">{{ userInfo.remarks || '-' }}</a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="security" tab="安全设置">
        <div v-for="item in securityItems" :key="item.title" class="security-item">
          <div class="security-content">
            <div class="security-title">
              <span>{{ item.title }}</span>
              <InfoCircleOutlined class="info-icon" />
            </div>
            <p>{{ item.desc }}</p>
          </div>
          <a-button type="link" @click="item.action">修改</a-button>
        </div>
      </a-tab-pane>
    </a-tabs>

    <a-modal
      v-model:visible="basicVisible"
      title="编辑基础信息"
      ok-text="保存"
      cancel-text="取消"
      :confirm-loading="saving"
      @ok="handleSaveBasic"
    >
      <a-form layout="vertical" :model="basicForm" :rules="basicRules" ref="basicFormRef">
        <a-form-item label="头像">
          <a-upload
            v-model:file-list="photoFileList"
            list-type="picture-card"
            accept="image/*"
            :max-count="1"
            :before-upload="beforePhotoUpload"
            :custom-request="handlePhotoUpload"
            @remove="onPhotoRemove"
          >
            <div v-if="photoFileList.length < 1">
              <PlusOutlined />
              <div>上传照片</div>
            </div>
          </a-upload>
          <a-typography-text type="secondary">只支持静态图片，不支持动态图，2M以内</a-typography-text>
        </a-form-item>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="姓氏" name="lastName"><a-input v-model:value="basicForm.lastName" /></a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="名字" name="firstName"><a-input v-model:value="basicForm.firstName" /></a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="性别" name="gender">
          <a-select v-model:value="basicForm.gender">
            <a-select-option value="male">男</a-select-option>
            <a-select-option value="female">女</a-select-option>
            <a-select-option value="unknown">未知</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="分机号"><a-input v-model:value="basicForm.extensionNo" disabled /></a-form-item>
        <a-form-item label="办公号码" name="officePhoneNumber">
          <a-input v-model:value="basicForm.officePhoneNumber" />
        </a-form-item>
        <a-form-item label="手机号码" name="phoneNumber"><a-input v-model:value="basicForm.phoneNumber" /></a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="otherVisible"
      title="编辑其他信息"
      ok-text="保存"
      cancel-text="取消"
      :confirm-loading="saving"
      @ok="handleSaveOther"
    >
      <a-form layout="vertical" :model="otherForm" :rules="otherRules" ref="otherFormRef">
        <a-row :gutter="16">
          <a-col v-for="field in otherFields" :key="field.key" :span="12">
            <a-form-item :label="field.label" :name="field.key">
              <a-input v-model:value="otherForm[field.key]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="passwordVisible"
      :title="passwordType === 'sip' ? '修改SIP注册密码' : '修改应用密码'"
      ok-text="保存"
      cancel-text="取消"
      :confirm-loading="saving"
      @ok="handleSavePassword"
    >
      <a-form layout="vertical" :model="passwordForm" :rules="passwordRules" ref="passwordFormRef">
        <a-form-item label="当前密码" name="oldPassword">
          <a-input-password v-model:value="passwordForm.oldPassword" />
        </a-form-item>
        <a-form-item label="新密码" name="newPassword">
          <a-input-password v-model:value="passwordForm.newPassword" />
        </a-form-item>
        <a-form-item label="确认密码" name="confirmPassword">
          <a-input-password v-model:value="passwordForm.confirmPassword" />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="questionVisible"
      title="修改密保问题"
      ok-text="保存"
      cancel-text="取消"
      :confirm-loading="saving"
      @ok="handleSaveQuestions"
    >
      <a-space direction="vertical" size="middle" style="width: 100%">
        <template v-for="q in questionList" :key="q.code">
          <a-checkbox v-model:checked="questionSelected[q.code]">{{ q.question }}</a-checkbox>
          <a-input
            v-if="questionSelected[q.code]"
            v-model:value="questionAnswers[q.code]"
            :placeholder="`请填写：${q.question}`"
          />
        </template>
      </a-space>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import type { UploadFile, UploadProps } from 'ant-design-vue';
  import {
    editAppPasswordApi,
    editSipPasswordApi,
    editUserBaseInfoApi,
    editUserOtherInfoApi,
    getLoginPublicKeyApi,
    getCurrentSecurityQuestionsApi,
    getFileDownloadUrl,
    getPasswordStrengthApi,
    getSecurityQuestionsApi,
    getUserInfoApi,
    updateSecurityQuestionsApi,
    uploadFileApi,
  } from '/@/api/extensionUser';
  import { useMessage } from '/@/hooks/useMessage';
  import { encryptBySu2PublicKey } from '/@/utils/su2Crypto';

  const { createMessage } = useMessage();
  const activeKey = ref('basic');
  const loading = ref(false);
  const saving = ref(false);
  const userInfo = ref<Record<string, any>>({});
  const passwordStrength = ref<Record<string, any>>({});
  const securityQuestions = ref<any[]>([]);
  const questionList = ref<any[]>([]);
  const basicVisible = ref(false);
  const otherVisible = ref(false);
  const passwordVisible = ref(false);
  const questionVisible = ref(false);
  const passwordType = ref<'sip' | 'app'>('sip');
  const basicFormRef = ref();
  const otherFormRef = ref();
  const passwordFormRef = ref();
  const photoFileList = ref<UploadFile[]>([]);

  const basicForm = reactive<Record<string, any>>({
    photo: '',
    firstName: '',
    lastName: '',
    gender: 'unknown',
    extensionNo: '',
    officePhoneNumber: '',
    phoneNumber: '',
  });
  const otherForm = reactive<Record<string, any>>({});
  const passwordForm = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const questionSelected = reactive<Record<string, boolean>>({});
  const questionAnswers = reactive<Record<string, string>>({});
  const otherFields = [
    { key: 'organization', label: '组织' },
    { key: 'department', label: '部门' },
    { key: 'position', label: '职位' },
    { key: 'mailbox', label: '邮箱' },
    { key: 'alternatePhoneNumber', label: '备用手机' },
    { key: 'fixedPhoneNumber', label: '家庭号码' },
    { key: 'faxPhoneNumber', label: '传真号码' },
    { key: 'address', label: '地址' },
    { key: 'remarks', label: '备注' },
  ];

  const fullName = computed(() => {
    const name = `${userInfo.value.lastName || ''}${userInfo.value.firstName || ''}`;
    return name || userInfo.value.extensionNo || '-';
  });
  const userInitial = computed(() => fullName.value.slice(0, 1) || '用');
  const avatarUrl = computed(() =>
    userInfo.value.photo ? getFileDownloadUrl(userInfo.value.photo) : '',
  );
  const strengthText = (value: number | string | undefined) => {
    const map: Record<string, string> = { 1: '弱', 2: '中', 3: '强' };
    return map[String(value || '')] || '未知';
  };
  const openPasswordEdit = (type: 'sip' | 'app') => {
    passwordType.value = type;
    passwordForm.oldPassword = '';
    passwordForm.newPassword = '';
    passwordForm.confirmPassword = '';
    passwordVisible.value = true;
  };
  const securityItems = computed(() => [
    {
      title: 'SIP注册密码',
      desc: `当前密码强度：${strengthText(passwordStrength.value.pwdStrength)}`,
      action: () => openPasswordEdit('sip'),
    },
    {
      title: '应用密码',
      desc: `当前密码强度：${strengthText(passwordStrength.value.dinlinkPwdStrength)}`,
      action: () => openPasswordEdit('app'),
    },
    {
      title: '密保问题',
      desc: securityQuestions.value.length ? '已设置' : '未设置',
      action: () => openQuestionEdit(),
    },
  ]);

  const textValidator = async (_r, value: string) => {
    if (/[<>]/.test(value || '')) return Promise.reject('不可以输入符号<>');
    if ((value || '').length > 32) return Promise.reject('最大长度32');
    return Promise.resolve();
  };
  const phoneValidator = async (_r, value: string) => {
    if (!value) return Promise.resolve();
    if (!/^\d+$/.test(value)) return Promise.reject('只能输入数字');
    if (value.length > 32) return Promise.reject('最大长度32');
    return Promise.resolve();
  };
  const passwordStrengthOk = (pw: string) => {
    if (!pw || pw.length <= 8) return false;
    return [/[A-Za-z]/, /\d/, /[^A-Za-z0-9]/].filter((reg) => reg.test(pw)).length >= 2;
  };
  const basicRules = {
    lastName: [{ required: true, message: '请填写姓氏' }, { validator: textValidator, trigger: 'blur' }],
    firstName: [{ required: true, message: '请填写名字' }, { validator: textValidator, trigger: 'blur' }],
    officePhoneNumber: [{ validator: phoneValidator, trigger: 'blur' }],
    phoneNumber: [{ validator: phoneValidator, trigger: 'blur' }],
  };
  const otherRules = Object.fromEntries(
    otherFields.map((field) => [
      field.key,
      field.key.includes('PhoneNumber') || field.key === 'faxPhoneNumber'
        ? [{ validator: phoneValidator, trigger: 'blur' }]
        : [{ validator: textValidator, trigger: 'blur' }],
    ]),
  );
  const passwordRules = {
    oldPassword: [{ required: true, message: '请输入当前密码' }],
    newPassword: [
      { required: true, message: '请输入新密码' },
      {
        validator: async (_r, value: string) =>
          passwordStrengthOk(value || '') ? Promise.resolve() : Promise.reject('至少包含字母、符号或数字中的两项且长度超过8位'),
      },
    ],
    confirmPassword: [
      { required: true, message: '请确认新密码' },
      {
        validator: async (_r, value: string) =>
          value === passwordForm.newPassword ? Promise.resolve() : Promise.reject('两次输入的密码不一致'),
      },
    ],
  };

  const loadProfile = async () => {
    loading.value = true;
    try {
      userInfo.value = await getUserInfoApi();
      const [strength, questions] = await Promise.all([
        getPasswordStrengthApi(),
        getCurrentSecurityQuestionsApi(userInfo.value.extensionNo),
      ]);
      passwordStrength.value = strength || {};
      securityQuestions.value = questions || [];
    } finally {
      loading.value = false;
    }
  };

  const openBasicEdit = () => {
    Object.assign(basicForm, {
      photo: userInfo.value.photo || '',
      firstName: userInfo.value.firstName || '',
      lastName: userInfo.value.lastName || '',
      gender: userInfo.value.gender || 'unknown',
      extensionNo: userInfo.value.extensionNo || '',
      officePhoneNumber: userInfo.value.officePhoneNumber || '',
      phoneNumber: userInfo.value.phoneNumber || '',
    });
    photoFileList.value = basicForm.photo
      ? [{ uid: basicForm.photo, name: basicForm.photo, status: 'done', url: getFileDownloadUrl(basicForm.photo) }]
      : [];
    basicVisible.value = true;
  };

  const openOtherEdit = () => {
    otherFields.forEach((field) => {
      otherForm[field.key] = userInfo.value[field.key] || '';
    });
    otherVisible.value = true;
  };

  const openQuestionEdit = async () => {
    if (!questionList.value.length) {
      questionList.value = (await getSecurityQuestionsApi()) || [];
    }
    questionList.value.forEach((q) => {
      const current = securityQuestions.value.find((item) => item.questionCode === q.code);
      questionSelected[q.code] = Boolean(current);
      questionAnswers[q.code] = current?.questionAnswer || '';
    });
    questionVisible.value = true;
  };

  const beforePhotoUpload: UploadProps['beforeUpload'] = (file) => {
    if (!file.type.startsWith('image/')) {
      createMessage.error('仅支持图片文件');
      return false;
    }
    if (file.type === 'image/gif') {
      createMessage.error('不支持动图');
      return false;
    }
    if (file.size / 1024 / 1024 >= 2) {
      createMessage.error('图片需小于 2MB');
      return false;
    }
    return true;
  };

  const handlePhotoUpload: UploadProps['customRequest'] = async (options) => {
    const raw = options.file as File;
    try {
      const name = await uploadFileApi(raw, 'photo');
      basicForm.photo = name;
      photoFileList.value = [{ uid: String(Date.now()), name: raw.name || 'photo', status: 'done', url: getFileDownloadUrl(name) }];
      options.onSuccess?.(name);
    } catch (error) {
      options.onError?.(error as Error);
    }
  };

  const onPhotoRemove = () => {
    basicForm.photo = '';
    photoFileList.value = [];
  };

  const handleSaveBasic = async () => {
    await basicFormRef.value?.validate();
    saving.value = true;
    try {
      await editUserBaseInfoApi({ ...basicForm });
      createMessage.success('保存成功');
      basicVisible.value = false;
      await loadProfile();
    } finally {
      saving.value = false;
    }
  };

  const handleSaveOther = async () => {
    await otherFormRef.value?.validate();
    saving.value = true;
    try {
      await editUserOtherInfoApi({ ...userInfo.value, ...otherForm });
      createMessage.success('保存成功');
      otherVisible.value = false;
      await loadProfile();
    } finally {
      saving.value = false;
    }
  };

  const handleSavePassword = async () => {
    await passwordFormRef.value?.validate();
    saving.value = true;
    try {
      const { key } = await getLoginPublicKeyApi();
      const oldPassword = encryptBySu2PublicKey(passwordForm.oldPassword, key);
      const newPassword = encryptBySu2PublicKey(passwordForm.newPassword, key);
      if (passwordType.value === 'sip') {
        await editSipPasswordApi({
          extension: userInfo.value.extensionNo,
          old_sip_password: oldPassword,
          password: newPassword,
        });
      } else {
        await editAppPasswordApi({
          extension: userInfo.value.extensionNo,
          old_dinlink_passwd: oldPassword,
          dinlink_passwd: newPassword,
        });
      }
      createMessage.success('密码修改成功');
      passwordVisible.value = false;
      await loadProfile();
    } finally {
      saving.value = false;
    }
  };

  const handleSaveQuestions = async () => {
    const payload = questionList.value
      .filter((q) => questionSelected[q.code])
      .map((q) => ({ questionCode: q.code, questionAnswer: (questionAnswers[q.code] || '').trim() }));
    if (payload.length < 2 || payload.some((item) => !item.questionAnswer)) {
      createMessage.warning('请至少选择并填写两个密保问题');
      return;
    }
    saving.value = true;
    try {
      await updateSecurityQuestionsApi(payload);
      createMessage.success('密保问题已更新');
      questionVisible.value = false;
      await loadProfile();
    } finally {
      saving.value = false;
    }
  };

  onMounted(loadProfile);
</script>

<style lang="less" scoped>
  .settings-page {
    min-height: calc(100vh - 128px);
    background: #ffffff;
    h2 {
      margin: 0 0 18px;
      font-size: 20px;
      font-weight: 600;
    }
  }
  .avatar {
    color: #1677ff;
    background: #e8f4ff;
  }
  .mt16 {
    margin-top: 16px;
  }
  .security-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 92px;
    padding: 18px 24px 18px 20px;
    margin-bottom: 18px;
    border: 1px solid #f0f0f0;
    border-radius: 6px;
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

    .security-content {
      padding-left: 14px;
      border-left: 3px solid #1677ff;
    }

    .security-title {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 12px;
      color: #262626;
      font-size: 16px;
      font-weight: 600;
    }

    .info-icon {
      color: #bfbfbf;
      font-size: 14px;
    }

    p {
      margin: 0;
      color: #8c8c8c;
    }
  }
</style>
