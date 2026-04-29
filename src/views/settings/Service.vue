<template>
  <div class="settings-page">
    <div class="page-header">
      <h2>业务设置</h2>
      <a-button type="primary" @click="router.push('/app/settings/service/edit')">编辑</a-button>
    </div>

    <a-card title="业务信息" :bordered="false">
      <a-descriptions :column="2">
        <a-descriptions-item label="语音邮箱">
          <a-switch checked disabled />
        </a-descriptions-item>
        <a-descriptions-item label="个人邮箱提示语">adsasda</a-descriptions-item>
        <a-descriptions-item label="邮箱密码">******</a-descriptions-item>
      </a-descriptions>

      <a-divider />
      <h3>呼叫转移</h3>
      <a-descriptions :column="2">
        <a-descriptions-item label="无条件呼叫转移">关闭</a-descriptions-item>
        <a-descriptions-item label="未注册呼叫转移">关闭</a-descriptions-item>
        <a-descriptions-item label="遇忙呼叫转移">关闭</a-descriptions-item>
        <a-descriptions-item label="无应答呼叫转移">关闭</a-descriptions-item>
      </a-descriptions>

      <a-divider />
      <h3>终端振铃顺序</h3>
      <a-descriptions :column="2">
        <a-descriptions-item label="振铃策略">顺序振铃</a-descriptions-item>
        <a-descriptions-item label="SIP终端">2</a-descriptions-item>
        <a-descriptions-item label="APP移动客户端">1</a-descriptions-item>
      </a-descriptions>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  const router = useRouter();
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
