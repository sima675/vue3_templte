<template>
  <div class="settings-page">
    <h2>信息维护</h2>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="basic" tab="基本设置">
        <a-card title="基础信息" :bordered="false">
          <template #extra><a-button type="primary">编辑</a-button></template>
          <a-descriptions :column="3">
            <a-descriptions-item label="头像">
              <a-avatar :size="72" class="avatar">一</a-avatar>
            </a-descriptions-item>
            <a-descriptions-item label="姓名">诸葛一</a-descriptions-item>
            <a-descriptions-item label="分机号">8008</a-descriptions-item>
            <a-descriptions-item label="手机号">13912358962</a-descriptions-item>
            <a-descriptions-item label="办公号码">-</a-descriptions-item>
          </a-descriptions>
        </a-card>

        <a-card title="其他信息" :bordered="false" class="mt16">
          <template #extra><a-button type="primary">编辑</a-button></template>
          <a-descriptions :column="3">
            <a-descriptions-item label="主叫名">8008</a-descriptions-item>
            <a-descriptions-item label="组织">-</a-descriptions-item>
            <a-descriptions-item label="部门">-</a-descriptions-item>
            <a-descriptions-item label="职位">-</a-descriptions-item>
            <a-descriptions-item label="邮箱">-</a-descriptions-item>
            <a-descriptions-item label="备用手机">-</a-descriptions-item>
            <a-descriptions-item label="家庭号码">-</a-descriptions-item>
            <a-descriptions-item label="传真号码">-</a-descriptions-item>
            <a-descriptions-item label="地址">-</a-descriptions-item>
            <a-descriptions-item label="备注">-</a-descriptions-item>
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

  const activeKey = ref('basic');
  const securityItems = [
    { title: 'SIP注册密码', desc: '当前密码强度：中' },
    { title: '应用密码', desc: '当前密码强度：强' },
    { title: '密保问题', desc: '已设置' },
  ];
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
