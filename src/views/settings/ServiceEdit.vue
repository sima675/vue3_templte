<template>
  <div class="settings-page">
    <div class="page-header">
      <a-space>
        <a-button type="link" class="back-btn" @click="router.back()"><LeftOutlined /></a-button>
        <h2>编辑基础信息</h2>
      </a-space>
    </div>

    <a-form :model="formModel" layout="vertical" class="service-form" :disabled="loading">
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
                    <a-button type="link" size="small" @click="promptManageVisible = true">管理</a-button>
                    <a-button type="link" size="small" @click="promptVisible = true">新建提示语</a-button>
                  </span>
                </div>
              </template>
              <a-select v-model:value="formModel.prompt" allow-clear>
                <a-select-option v-for="prompt in prompts" :key="prompt.fileUrl" :value="prompt.fileUrl">
                  {{ prompt.name }}
                </a-select-option>
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
              <a-select v-model:value="formModel[item.key]" :disabled="isForwardDisabled(item.key)">
                <a-select-option value="off">关闭</a-select-option>
                <a-select-option value="voicemail">语音信箱</a-select-option>
                <a-select-option value="extension">SIP分机号</a-select-option>
                <a-select-option value="ringGroup">振铃组</a-select-option>
                <a-select-option value="queue">呼叫队列</a-select-option>
                <a-select-option value="ivr">IVR</a-select-option>
                <a-select-option value="other">其它号码</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item v-if="needForwardDestination(formModel[item.key])" :label="`${item.label}目的地`">
              <a-input
                v-model:value="formModel[item.dstKey]"
                :disabled="isForwardDisabled(item.key)"
                placeholder="请输入号码或目的地"
                maxlength="32"
              />
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
          <a-button type="primary" :loading="saving" @click="handleSave">保存</a-button>
        </a-space>
      </div>
    </a-form>

    <a-modal
      v-model:visible="promptVisible"
      title="新建提示语"
      ok-text="确定"
      cancel-text="取消"
      :confirm-loading="promptSaving"
      @ok="handleCreatePrompt"
    >
      <a-form layout="vertical">
        <a-form-item label="名称" required><a-input v-model:value="promptForm.name" placeholder="请输入" /></a-form-item>
        <a-form-item label="描述"><a-input v-model:value="promptForm.describe" placeholder="请输入" /></a-form-item>
        <a-form-item label="提示语文件">
          <a-upload-dragger :before-upload="handlePromptUpload" :show-upload-list="false">
            <p class="upload-icon"><FileAddOutlined /></p>
            <p>{{ promptForm.fileUrl || '点击或将文件拖拽到这里上传' }}</p>
            <p class="upload-tip">支持扩展名：.wav，3M以内</p>
          </a-upload-dragger>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model:visible="promptManageVisible" title="管理提示语" :footer="null" width="720px">
      <a-table :columns="promptColumns" :data-source="prompts" row-key="id" size="small" :pagination="false">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-popconfirm title="确认删除该提示语？" @confirm="handleDeletePrompt(record.id)">
              <a-button type="link" size="small" danger>删除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { FileAddOutlined, InfoCircleOutlined, LeftOutlined } from '@ant-design/icons-vue';
  import {
    addPromptApi,
    deletePromptApi,
    getBusinessSettingApi,
    getPromptListApi,
    saveBusinessSettingApi,
    uploadFileApi,
  } from '/@/api/extensionUser';
  import { useMessage } from '/@/hooks/useMessage';

  const router = useRouter();
  const { createMessage } = useMessage();
  const promptVisible = ref(false);
  const promptManageVisible = ref(false);
  const loading = ref(false);
  const saving = ref(false);
  const promptSaving = ref(false);
  const prompts = ref<any[]>([]);
  const formModel = reactive<Record<string, any>>({
    voicemail: true,
    mailboxPassword: '',
    prompt: undefined,
    unconditional: 'off',
    unconditionalDst: '',
    unregistered: 'off',
    unregisteredDst: '',
    busy: 'off',
    busyDst: '',
    noAnswer: 'off',
    noAnswerDst: '',
    ringStrategy: 'sequential',
    sipOrder: '2',
    appOrder: '1',
  });
  const promptForm = reactive({
    name: '',
    describe: '',
    fileUrl: '',
  });
  const transferFields = [
    { key: 'unconditional', dstKey: 'unconditionalDst', label: '无条件呼叫转移' },
    { key: 'unregistered', dstKey: 'unregisteredDst', label: '未注册呼叫转移' },
    { key: 'busy', dstKey: 'busyDst', label: '遇忙呼叫转移' },
    { key: 'noAnswer', dstKey: 'noAnswerDst', label: '无应答呼叫转移' },
  ];
  const promptColumns = [
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '描述', dataIndex: 'describe', key: 'describe' },
    { title: '文件', dataIndex: 'fileUrl', key: 'fileUrl' },
    { title: '操作', key: 'action', width: 90 },
  ];

  const fromForwardValue = (value: string) => (value === 'Deactivate' ? 'off' : value || 'off');
  const toForwardValue = (value: string) => (value === 'off' ? 'Deactivate' : value);
  const needForwardDestination = (value: string) => !['off', 'voicemail'].includes(value);
  const isForwardDisabled = (key: string) => key !== 'unconditional' && formModel.unconditional !== 'off';

  const loadData = async () => {
    loading.value = true;
    try {
      const [business, promptList] = await Promise.all([
        getBusinessSettingApi(),
        getPromptListApi(),
      ]);

      formModel.voicemail = business?.voicemail === 'on';
      formModel.mailboxPassword = business?.voicemail_passwd || '';
      formModel.prompt = business?.voicemail_greeting || undefined;
      formModel.unconditional = fromForwardValue(business?.forward_uncondition);
      formModel.unconditionalDst = business?.forward_uncondition_dst || '';
      formModel.unregistered = fromForwardValue(business?.forward_unregister);
      formModel.unregisteredDst = business?.forward_unregister_dst || '';
      formModel.busy = fromForwardValue(business?.forward_busy);
      formModel.busyDst = business?.forward_busy_dst || '';
      formModel.noAnswer = fromForwardValue(business?.forward_noreply);
      formModel.noAnswerDst = business?.forward_noreply_dst || '';
      formModel.ringStrategy = business?.strategy || 'sequential';

      const ringSeque = Array.isArray(business?.ring_seque)
        ? business.ring_seque
        : String(business?.ring_seque || '2,1').split(',');
      formModel.sipOrder = ringSeque[0] || '2';
      formModel.appOrder = ringSeque[1] || '1';
      prompts.value = promptList || [];
    } finally {
      loading.value = false;
    }
  };

  const handleSave = async () => {
    const invalidForward = transferFields.some(
      (item) =>
        !isForwardDisabled(item.key) &&
        needForwardDestination(formModel[item.key]) &&
        !String(formModel[item.dstKey] || '').trim(),
    );
    if (invalidForward) {
      createMessage.warning('请填写已开启呼叫转移的目的地');
      return;
    }

    saving.value = true;
    try {
      await saveBusinessSettingApi({
        voicemail: formModel.voicemail ? 'on' : 'off',
        voicemail_passwd: formModel.mailboxPassword,
        voicemail_greeting: formModel.prompt || '',
        forward_uncondition: toForwardValue(formModel.unconditional),
        forward_uncondition_dst: formModel.unconditionalDst || '',
        forward_unregister: toForwardValue(formModel.unregistered),
        forward_unregister_dst: formModel.unregisteredDst || '',
        forward_busy: toForwardValue(formModel.busy),
        forward_busy_dst: formModel.busyDst || '',
        forward_noreply: toForwardValue(formModel.noAnswer),
        forward_noreply_dst: formModel.noAnswerDst || '',
        forward_noreply_timeout: '',
        strategy: formModel.ringStrategy,
        ring_seque: [formModel.sipOrder, formModel.appOrder],
        apply: '',
      });
      createMessage.success('保存成功');
      router.back();
    } finally {
      saving.value = false;
    }
  };

  const handlePromptUpload = async (file: File) => {
    promptForm.fileUrl = await uploadFileApi(file, 'prompt');
    createMessage.success('上传成功');
    return false;
  };

  const handleCreatePrompt = async () => {
    if (!promptForm.name || !promptForm.fileUrl) {
      createMessage.warning('请填写名称并上传提示语文件');
      return;
    }

    promptSaving.value = true;
    try {
      await addPromptApi({
        name: promptForm.name,
        describe: promptForm.describe,
        fileUrl: promptForm.fileUrl,
      });
      createMessage.success('新建成功');
      promptVisible.value = false;
      formModel.prompt = promptForm.fileUrl;
      promptForm.name = '';
      promptForm.describe = '';
      promptForm.fileUrl = '';
      prompts.value = await getPromptListApi();
    } finally {
      promptSaving.value = false;
    }
  };

  const handleDeletePrompt = async (id: number) => {
    await deletePromptApi(id);
    if (prompts.value.find((item) => item.id === id)?.fileUrl === formModel.prompt) {
      formModel.prompt = undefined;
    }
    prompts.value = await getPromptListApi();
    createMessage.success('删除成功');
  };

  onMounted(loadData);
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
