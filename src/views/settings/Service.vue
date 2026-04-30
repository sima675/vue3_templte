<template>
  <div class="settings-page">
    <div class="page-header">
      <h2>业务设置</h2>
      <a-button type="primary" @click="router.push('/app/settings/service/edit')">编辑</a-button>
    </div>

    <a-card title="业务信息" :bordered="false" :loading="loading">
      <a-descriptions :column="2">
        <a-descriptions-item label="语音邮箱">
          <a-switch :checked="business.voicemail === 'on'" disabled />
        </a-descriptions-item>
        <a-descriptions-item label="个人邮箱提示语">{{ business.promptName || business.voicemail_greeting || '-' }}</a-descriptions-item>
        <a-descriptions-item label="邮箱密码">******</a-descriptions-item>
      </a-descriptions>

      <a-divider />
      <h3>呼叫转移</h3>
      <a-descriptions :column="2">
        <a-descriptions-item label="无条件呼叫转移">{{ formatForward(business.forward_uncondition) }}</a-descriptions-item>
        <a-descriptions-item label="未注册呼叫转移">{{ formatForward(business.forward_unregister) }}</a-descriptions-item>
        <a-descriptions-item label="遇忙呼叫转移">{{ formatForward(business.forward_busy) }}</a-descriptions-item>
        <a-descriptions-item label="无应答呼叫转移">{{ formatForward(business.forward_noreply) }}</a-descriptions-item>
      </a-descriptions>

      <a-divider />
      <h3>终端振铃顺序</h3>
      <a-descriptions :column="2">
        <a-descriptions-item label="振铃策略">{{ formatStrategy(business.strategy) }}</a-descriptions-item>
        <a-descriptions-item label="SIP终端">{{ ringOrder.sip || '-' }}</a-descriptions-item>
        <a-descriptions-item label="APP移动客户端">{{ ringOrder.app || '-' }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { getBusinessSettingApi } from '/@/api/extensionUser';

  const router = useRouter();
  const loading = ref(false);
  const business = ref<Record<string, any>>({});

  const ringOrder = computed(() => {
    const value = business.value.ring_seque;
    if (Array.isArray(value)) {
      return { sip: value[0], app: value[1] };
    }
    const [sip, app] = String(value || '').split(',');
    return { sip, app };
  });

  const formatForward = (value: string) => {
    const map: Record<string, string> = {
      Deactivate: '关闭',
      voicemail: '语音信箱',
      extension: 'SIP分机号',
      ringGroup: '振铃组',
      queue: '呼叫队列',
      ivr: 'IVR',
      other: '其它号码',
    };
    return map[value] || value || '关闭';
  };

  const formatStrategy = (value: string) => {
    const map: Record<string, string> = {
      simultaneous: '同时振铃',
      sequential: '顺序振铃',
    };
    return map[value] || value || '-';
  };

  const loadBusiness = async () => {
    loading.value = true;
    try {
      business.value = await getBusinessSettingApi();
    } finally {
      loading.value = false;
    }
  };

  onMounted(loadBusiness);
</script>

<style lang="less" scoped>
  .settings-page {
    min-height: calc(100vh - 128px);
    background: #ffffff;
  }
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
    }
  }
  h3 {
    font-size: 16px;
    font-weight: 600;
  }
</style>
