<template>
  <a-layout>
    <a-layout-header style="height: 48px; line-height: 48px; background: #1677ff; color: #fff; font-weight: 700">
      DINSTAR
    </a-layout-header>

    <a-layout-content style="min-height: calc(100vh - 48px); padding: 0 72px 24px; background: #fff">
      <a-page-header title="首次登录" style="padding: 8px 0" @back="onHeaderBack" />

      <a-row justify="center">
        <a-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16">
          <div style="margin: 12px 0 40px">
            <a-steps :current="stepCurrent" size="small">
              <a-step title="设置密码" />
              <a-step title="设置密保" />
              <a-step title="完善个人信息" />
              <a-step title="完成" />
            </a-steps>
          </div>

          <a-card :body-style="{ padding: '24px 32px' }">
            <a-form
              v-if="stepCurrent === 0"
              :model="pwdForm"
              :rules="pwdRules"
              layout="vertical"
              @finish="onPwdNext"
            >
              <a-form-item label="用户名">
                <a-input v-model:value="extensionAcc" disabled />
              </a-form-item>
              <a-form-item label="当前密码" name="currentPwd">
                <a-input-password v-model:value="pwdForm.currentPwd" placeholder="请输入" />
              </a-form-item>
              <a-form-item label="新密码" name="newPwd">
                <a-input-password
                  v-model:value="pwdForm.newPwd"
                  placeholder="至少包含字母、符号或数字中的两项且长度超过8位"
                />
              </a-form-item>
              <a-form-item label="确认密码" name="confirmPwd">
                <a-input-password v-model:value="pwdForm.confirmPwd" placeholder="请输入" />
              </a-form-item>
              <a-form-item>
                <a-space>
                  <a-button type="primary" html-type="submit" :loading="stepLoading">下一步</a-button>
                  <a-button @click="onCancel">取消</a-button>
                </a-space>
              </a-form-item>
            </a-form>

            <a-space v-else-if="stepCurrent === 1" direction="vertical" size="middle" style="width: 100%">
              <a-typography-text strong>密保问题</a-typography-text>
              <a-typography-text type="secondary">至少设置两个密保问题</a-typography-text>

              <template v-for="q in questionList" :key="q.code">
                <a-checkbox v-model:checked="securitySelected[q.code]">{{ q.question }}</a-checkbox>
                <a-input
                  v-if="securitySelected[q.code]"
                  v-model:value="securityAnswers[q.code]"
                  :placeholder="`请填写：${q.question}`"
                />
              </template>

              <a-space>
                <a-button type="primary" :loading="stepLoading" @click="onSecurityNext">下一步</a-button>
                <a-button @click="stepCurrent = 0">上一步</a-button>
                <a-button @click="onCancel">取消</a-button>
              </a-space>
            </a-space>

            <a-form
              v-else-if="stepCurrent === 2"
              :model="profileForm"
              :rules="profileRules"
              layout="vertical"
              @finish="onProfileSubmit"
              @finishFailed="onProfileSubmitFailed"
            >
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
              <a-form-item label="姓氏" name="lastName">
                <a-input v-model:value="profileForm.lastName" placeholder="请输入姓氏" />
              </a-form-item>
              <a-form-item label="名字" name="firstName">
                <a-input v-model:value="profileForm.firstName" placeholder="请输入名字" />
              </a-form-item>
              <a-form-item label="性别" name="gender">
                <a-select v-model:value="profileForm.gender" placeholder="请选择">
                  <a-select-option value="male">男</a-select-option>
                  <a-select-option value="female">女</a-select-option>
                  <a-select-option value="unknown">未知</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="办公号码" name="officeNumber">
                <a-input v-model:value="profileForm.officeNumber" placeholder="请输入办公号码" />
              </a-form-item>
              <a-form-item label="手机号码" name="phoneNumber">
                <a-input v-model:value="profileForm.phoneNumber" placeholder="请输入手机号码" />
              </a-form-item>
              <a-form-item>
                <a-space>
                  <a-button type="primary" html-type="submit" :loading="stepLoading">提交</a-button>
                  <a-button @click="stepCurrent = 1">上一步</a-button>
                  <a-button @click="onCancel">取消</a-button>
                </a-space>
              </a-form-item>
            </a-form>

            <a-result v-else status="success" title="操作成功">
              <template #extra>
                <a-button type="primary" @click="exitToLoginNow">返回登录 {{ countdown }}s</a-button>
              </template>
            </a-result>
          </a-card>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
  import { PlusOutlined } from '@ant-design/icons-vue';
  import type { UploadFile, UploadProps } from 'ant-design-vue';
  import {
    checkAppPasswordApi,
    editAppPasswordApi,
    getFileDownloadUrl,
    getLoginPublicKeyApi,
    getSecurityQuestionsApi,
    logoutByAccountApi,
    setProtectQuestionsApi,
    setUserInfoApi,
    uploadFileApi,
  } from '/@/api/extensionUser';
  import { encryptBySu2PublicKey } from '/@/utils/su2Crypto';
  import {
    clearFirstLoginPending,
    getFirstLoginAcc,
    removeAccountType,
    removeToken,
  } from '/@/utils/auth';
  import { useUserStore } from '/@/store/modules/user';
  import { usePermissioStoreWithOut } from '/@/store/modules/permission';
  import { useMessage } from '/@/hooks/useMessage';

  const router = useRouter();
  const { createMessage, createConfirm } = useMessage();
  const userStore = useUserStore();
  const permissionStore = usePermissioStoreWithOut();

  const extensionAcc = ref(getFirstLoginAcc() || '');
  const stepCurrent = ref(0);
  const stepLoading = ref(false);
  const countdown = ref(10);
  let countdownTimer: ReturnType<typeof setInterval> | null = null;

  const pwdForm = reactive({
    currentPwd: '',
    newPwd: '',
    confirmPwd: '',
  });

  const passwordStrengthOk = (pw: string) => {
    if (!pw || pw.length <= 8) return false;
    let n = 0;
    if (/[A-Za-z]/.test(pw)) n += 1;
    if (/\d/.test(pw)) n += 1;
    if (/[^A-Za-z0-9]/.test(pw)) n += 1;
    return n >= 2;
  };

  const pwdRules: Record<string, any[]> = {
    currentPwd: [{ required: true, message: '请输入当前密码' }],
    newPwd: [
      { required: true, message: '请输入新密码' },
      {
        validator: async (_r, v: string) => {
          if (!passwordStrengthOk(v || '')) {
            return Promise.reject('至少包含字母、符号或数字中的两项且长度超过8位');
          }
          return Promise.resolve();
        },
      },
    ],
    confirmPwd: [
      { required: true, message: '请确认新密码' },
      {
        validator: async (_r, v: string) => {
          if (v !== pwdForm.newPwd) return Promise.reject('两次输入的密码不一致');
          return Promise.resolve();
        },
      },
    ],
  };

  interface QuestionRow {
    id: number;
    question: string;
    code: string;
    type: number;
  }

  const questionList = ref<QuestionRow[]>([]);
  const securitySelected = reactive<Record<string, boolean>>({});
  const securityAnswers = reactive<Record<string, string>>({});

  const profileForm = reactive({
    lastName: '',
    firstName: '',
    gender: 'male' as string,
    officeNumber: '' as string,
    phoneNumber: '' as string,
    photo: null as string | null,
  });

  const profileTextValidator = async (_r, value: string) => {
    if (/[<>]/.test(value || '')) {
      return Promise.reject('不可以输入符号<>');
    }
    if ((value || '').length > 32) {
      return Promise.reject('最大长度32');
    }
    return Promise.resolve();
  };

  const profilePhoneValidator = async (_r, value: string) => {
    if (!value) return Promise.resolve();
    if (!/^\d+$/.test(value)) {
      return Promise.reject('只能输入数字');
    }
    if (value.length > 32) {
      return Promise.reject('最大长度32');
    }
    return Promise.resolve();
  };

  const profileRules: Record<string, any[]> = {
    lastName: [
      { required: true, message: '请填写姓氏' },
      { validator: profileTextValidator, trigger: 'blur' },
    ],
    firstName: [
      { required: true, message: '请填写名字' },
      { validator: profileTextValidator, trigger: 'blur' },
    ],
    gender: [{ required: true, message: '请选择性别' }],
    officeNumber: [{ validator: profilePhoneValidator, trigger: 'blur' }],
    phoneNumber: [{ validator: profilePhoneValidator, trigger: 'blur' }],
  };

  const photoFileList = ref<UploadFile[]>([]);

  const getSubmitErrorMessage = (error: unknown, fallback: string) =>
    (error as Error)?.message || fallback;

  const exitToLoginNow = async () => {
    if (countdownTimer) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }
    clearFirstLoginPending();
    try {
      await logoutByAccountApi();
    } catch {
      //
    }
    removeToken();
    removeAccountType();
    userStore.resetState();
    permissionStore.resetState();
    await router.replace('/login');
  };

  const onCancel = () => {
    createConfirm({
      iconType: 'warning',
      title: '确认取消？',
      content: '将退出首次登录向导并返回登录页',
      onOk: () => exitToLoginNow(),
    });
  };

  const onHeaderBack = () => {
    if (stepCurrent.value === 3) {
      exitToLoginNow();
      return;
    }
    onCancel();
  };

  const onPwdNext = async () => {
    stepLoading.value = true;
    try {
      const { key } = await getLoginPublicKeyApi();
      const oldEnc = encryptBySu2PublicKey(pwdForm.currentPwd, key);
      await checkAppPasswordApi({ old_dinlink_passwd: oldEnc });
      const newEnc = encryptBySu2PublicKey(pwdForm.newPwd, key);
      await editAppPasswordApi({
        old_dinlink_passwd: oldEnc,
        dinlink_passwd: newEnc,
      });
      createMessage.success('密码已更新');
      stepCurrent.value = 1;
      await loadQuestions();
    } catch (error) {
      createMessage.error(getSubmitErrorMessage(error, '密码设置失败，请重试'));
    } finally {
      stepLoading.value = false;
    }
  };

  const loadQuestions = async () => {
    try {
      const list = await getSecurityQuestionsApi();
      questionList.value = Array.isArray(list) ? list : [];
      questionList.value.forEach((q) => {
        securitySelected[q.code] = false;
        securityAnswers[q.code] = '';
      });
    } catch (error) {
      createMessage.error(getSubmitErrorMessage(error, '密保问题加载失败，请重试'));
      throw error;
    }
  };

  const onSecurityNext = async () => {
    const picked = questionList.value.filter((q) => securitySelected[q.code]);
    const filled = picked.filter((q) => (securityAnswers[q.code] || '').trim());
    if (filled.length < 2) {
      createMessage.warning('请至少选择并填写两个密保问题');
      return;
    }
    if (picked.some((q) => !(securityAnswers[q.code] || '').trim())) {
      createMessage.warning('已勾选的密保问题请填写答案');
      return;
    }
    stepLoading.value = true;
    try {
      const payload = filled.map((q) => ({
        questionCode: q.code,
        questionAnswer: (securityAnswers[q.code] || '').trim(),
      }));
      await setProtectQuestionsApi(payload);
      createMessage.success('密保已保存');
      stepCurrent.value = 2;
    } catch (error) {
      createMessage.error(getSubmitErrorMessage(error, '密保保存失败，请重试'));
    } finally {
      stepLoading.value = false;
    }
  };

  const beforePhotoUpload: UploadProps['beforeUpload'] = (file) => {
    const isImg = file.type.startsWith('image/');
    if (!isImg) {
      createMessage.error('仅支持图片文件');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      createMessage.error('图片需小于 2MB');
      return false;
    }
    if (file.type === 'image/gif') {
      createMessage.error('不支持动图');
      return false;
    }
    return true;
  };

  const handlePhotoUpload: UploadProps['customRequest'] = async (options) => {
    const { file, onSuccess, onError } = options;
    const raw = file as File;
    try {
      const name = await uploadFileApi(raw, 'photo');
      profileForm.photo = name;
      photoFileList.value = [
        {
          uid: String(Date.now()),
          name: raw.name || 'photo',
          status: 'done',
          url: getFileDownloadUrl(name),
        },
      ];
      onSuccess?.(name);
    } catch (e) {
      onError?.(e as Error);
    }
  };

  const onPhotoRemove = () => {
    profileForm.photo = null;
    photoFileList.value = [];
  };

  const onProfileSubmitFailed = () => {
    createMessage.warning('请检查个人信息表单');
  };

  const onProfileSubmit = async () => {
    if (!profileForm.lastName?.trim() || !profileForm.firstName?.trim()) {
      createMessage.warning('请填写姓氏和名字');
      return;
    }
    stepLoading.value = true;
    try {
      await setUserInfoApi({
        firstName: profileForm.firstName.trim(),
        lastName: profileForm.lastName.trim(),
        gender: profileForm.gender,
        officeNumber: profileForm.officeNumber?.trim() || null,
        phoneNumber: profileForm.phoneNumber?.trim() || null,
        photo: profileForm.photo,
      });
      createMessage.success('个人信息已保存');
      stepCurrent.value = 3;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      countdown.value = 10;
      countdownTimer = setInterval(() => {
        countdown.value -= 1;
        if (countdown.value <= 0) {
          if (countdownTimer) clearInterval(countdownTimer);
          countdownTimer = null;
          exitToLoginNow();
        }
      }, 1000);
    } catch (error) {
      createMessage.error(getSubmitErrorMessage(error, '个人信息保存失败，请重试'));
    } finally {
      stepLoading.value = false;
    }
  };

  onMounted(() => {
    if (!extensionAcc.value) {
      extensionAcc.value = getFirstLoginAcc();
    }
  });

  onUnmounted(() => {
    if (countdownTimer) clearInterval(countdownTimer);
  });
</script>

