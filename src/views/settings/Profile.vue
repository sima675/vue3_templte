<template>
  <div class="settings-page">
    <h2>信息维护</h2>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="basic" tab="基本设置">
        <a-card title="基础信息" :bordered="false" :loading="loading">
          <template #extra><a-button type="primary">编辑</a-button></template>
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
          <template #extra><a-button type="primary">编辑</a-button></template>
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
          <a-button type="link">修改</a-button>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
  import { InfoCircleOutlined } from '@ant-design/icons-vue';
  import {
    getCurrentSecurityQuestionsApi,
    getFileDownloadUrl,
    getPasswordStrengthApi,
    getUserInfoApi,
  } from '/@/api/extensionUser';

  const activeKey = ref('basic');
  const loading = ref(false);
  const userInfo = ref<Record<string, any>>({});
  const passwordStrength = ref<Record<string, any>>({});
  const securityQuestions = ref<any[]>([]);

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
  const securityItems = computed(() => [
    { title: 'SIP注册密码', desc: `当前密码强度：${strengthText(passwordStrength.value.pwdStrength)}` },
    { title: '应用密码', desc: `当前密码强度：${strengthText(passwordStrength.value.dinlinkPwdStrength)}` },
    { title: '密保问题', desc: securityQuestions.value.length ? '已设置' : '未设置' },
  ]);

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
