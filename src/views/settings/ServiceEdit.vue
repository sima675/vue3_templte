<template>
  <div class="settings-page">
    <div class="page-header">
      <a-space>
        <a-button type="link" class="back-btn" @click="router.back()"><LeftOutlined /></a-button>
        <h2>编辑基础信息</h2>
      </a-space>
    </div>

    <a-form :model="formModel" layout="vertical" class="service-form">
      <section class="form-section">
        <div class="section-title">
          <span>语音邮箱</span>
          <a-switch v-model:checked="formModel.voicemail" size="small" />
        </div>

        <a-row :gutter="80">
          <a-col :span="12">
            <a-form-item label="邮箱密码">
              <a-input-password v-model:value="formModel.mailboxPassword" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item>
              <template #label>
                <div class="label-with-actions">
                  <span>个人邮箱提示语</span>
                  <span class="prompt-actions">
                    <a-button type="link" size="small">管理</a-button>
                    <a-button type="link" size="small" @click="promptVisible = true">新建提示语</a-button>
                  </span>
                </div>
              </template>
              <a-select v-model:value="formModel.prompt">
                <a-select-option value="adsasda">adsasda</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </section>

      <section class="form-section">
        <div class="section-title">呼叫前转</div>

        <a-row :gutter="80">
          <a-col v-for="item in transferFields" :key="item.key" :span="12">
            <a-form-item :label="item.label">
              <a-select v-model:value="formModel[item.key]">
                <a-select-option value="off">关闭</a-select-option>
                <a-select-option value="voicemail">语音信箱</a-select-option>
                <a-select-option value="extension">SIP分机号</a-select-option>
                <a-select-option value="ringGroup">振铃组</a-select-option>
                <a-select-option value="queue">呼叫队列</a-select-option>
                <a-select-option value="ivr">IVR</a-select-option>
                <a-select-option value="other">其它号码</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </section>

      <section class="form-section">
        <div class="section-title">
          <span>终端振铃顺序</span>
          <InfoCircleOutlined class="info-icon" />
        </div>

        <a-form-item label="振铃策略">
          <a-select v-model:value="formModel.ringStrategy">
            <a-select-option value="simultaneous">同时振铃</a-select-option>
            <a-select-option value="sequential">顺序振铃</a-select-option>
          </a-select>
        </a-form-item>

        <div class="terminal-order">
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="SIP终端">
                <a-select v-model:value="formModel.sipOrder">
                  <a-select-option value="2">2</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="APP移动客户端">
                <a-select v-model:value="formModel.appOrder">
                  <a-select-option value="1">1</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
      </section>

      <div class="form-footer">
        <a-space>
          <a-button @click="router.back()">取消</a-button>
          <a-button type="primary">保存</a-button>
        </a-space>
      </div>
    </a-form>

    <a-modal v-model:visible="promptVisible" title="新建提示语" ok-text="确定" cancel-text="取消">
      <a-form layout="vertical">
        <a-form-item label="名称" required><a-input placeholder="请输入" /></a-form-item>
        <a-form-item label="描述"><a-input placeholder="请输入" /></a-form-item>
        <a-form-item label="提示语文件">
          <a-upload-dragger>
            <p class="upload-icon"><FileAddOutlined /></p>
            <p>点击或将文件拖拽到这里上传</p>
            <p class="upload-tip">支持扩展名：.wav，3M以内</p>
          </a-upload-dragger>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { FileAddOutlined, InfoCircleOutlined, LeftOutlined } from '@ant-design/icons-vue';

  const router = useRouter();
  const promptVisible = ref(false);
  const formModel = reactive<Record<string, any>>({
    voicemail: true,
    mailboxPassword: '123456',
    prompt: 'adsasda',
    unconditional: 'off',
    unregistered: 'off',
    busy: 'off',
    noAnswer: 'off',
    ringStrategy: 'sequential',
    sipOrder: '2',
    appOrder: '1',
  });
  const transferFields = [
    { key: 'unconditional', label: '无条件呼叫转移' },
    { key: 'unregistered', label: '未注册呼叫转移' },
    { key: 'busy', label: '遇忙呼叫转移' },
    { key: 'noAnswer', label: '无应答呼叫转移' },
  ];
</script>

<style lang="less" scoped>
  .settings-page {
    min-height: calc(100vh - 128px);
    margin: -24px;
    background: #ffffff;
  }

  .page-header {
    display: flex;
    align-items: center;
    height: 52px;
    padding: 0 16px;
    border-bottom: 1px solid #f0f0f0;

    .back-btn {
      padding: 0;
      color: #595959;
      font-size: 18px;
    }

    h2 {
      margin: 0;
      color: #1f1f1f;
      font-size: 16px;
      font-weight: 600;
    }
  }

  .service-form {
    padding: 18px 16px 0;
  }

  .form-section {
    margin-bottom: 22px;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 22px;
    margin-bottom: 18px;
    padding-left: 14px;
    border-left: 3px solid #1677ff;
    color: #262626;
    font-size: 15px;
    font-weight: 600;
    line-height: 22px;
  }

  .label-with-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .prompt-actions {
    display: flex;
    align-items: center;
    gap: 2px;

    :deep(.ant-btn-link) {
      height: auto;
      padding: 0;
      font-size: 12px;
      line-height: 1;
    }
  }

  .info-icon {
    color: #bfbfbf;
    font-size: 14px;
  }

  .terminal-order {
    margin-top: 8px;
    padding: 16px;
    background: #f7f7f7;
  }

  .form-footer {
    position: sticky;
    bottom: 0;
    padding: 16px;
    text-align: right;
    background: #ffffff;
  }

  .upload-icon {
    color: #1677ff;
    font-size: 32px;
  }

  .upload-tip {
    color: #8c8c8c;
  }

  :deep(.ant-form-item) {
    margin-bottom: 16px;
  }

  :deep(.ant-form-item-label) {
    width: 100%;
    padding-bottom: 4px;
    line-height: 20px;
  }

  :deep(.ant-form-item-label > label) {
    width: 100%;
    height: auto;
    color: #595959;
    font-size: 12px;
  }

  :deep(.ant-input),
  :deep(.ant-input-affix-wrapper),
  :deep(.ant-select-selector) {
    border-radius: 4px !important;
  }
</style>
