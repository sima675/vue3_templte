<template>
  <div class="alarm-page">
    <div class="page-header">
      <h2>闹钟任务管理</h2>
    </div>

    <div class="toolbar">
      <a-space>
        <a-select v-model:value="filters.status" class="status-select">
          <a-select-option value="all">全部状态</a-select-option>
          <a-select-option value="active">生效中</a-select-option>
          <a-select-option value="failed">失败</a-select-option>
          <a-select-option value="stopped">已停止</a-select-option>
        </a-select>
        <a-input-search
          v-model:value="filters.keyword"
          class="search-input"
          placeholder="任务名称/分机号码/备注"
        />
      </a-space>
      <a-button type="primary" @click="taskVisible = true">新建闹钟任务</a-button>
    </div>

    <a-table :columns="columns" :data-source="tasks" :pagination="false" row-key="id">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a-space :size="6">
            <span v-if="record.status === 'failed'" class="failed-dot"></span>
            <a-button type="link" class="name-link">{{ record.name }}</a-button>
          </a-space>
        </template>
        <template v-else-if="column.key === 'status'">
          <CheckCircleFilled v-if="record.status === 'active'" class="status-icon active" />
          <CloseCircleFilled v-else-if="record.status === 'failed'" class="status-icon failed" />
          <StopFilled v-else class="status-icon stopped" />
        </template>
        <template v-else-if="column.key === 'action'">
          <a-space :size="8">
            <a-button type="link" size="small" title="编辑闹钟">
              <EditOutlined />
            </a-button>
            <a-button type="link" size="small" title="停止闹钟">
              <PauseCircleOutlined />
            </a-button>
          </a-space>
        </template>
      </template>
    </a-table>

    <a-modal
      v-model:visible="taskVisible"
      title="新建闹钟任务"
      width="420px"
      ok-text="确定"
      cancel-text="取消"
    >
      <a-form :model="taskForm" layout="vertical">
        <a-form-item label="任务名称" required>
          <a-input v-model:value="taskForm.name" />
        </a-form-item>
        <a-form-item label="分机号码" required>
          <a-select
            v-model:value="taskForm.extensions"
            mode="multiple"
            show-search
            placeholder=""
            :max-tag-count="3"
          >
            <a-select-option value="2123">2123</a-select-option>
            <a-select-option value="2126">2126</a-select-option>
            <a-select-option value="8008">8008</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="闹钟语音" required>
          <a-select v-model:value="taskForm.voice">
            <a-select-option value="default">默认语音</a-select-option>
            <a-select-option value="morning">Morning Call</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="闹钟类型" required>
          <a-radio-group v-model:value="taskForm.type">
            <a-radio value="once">单次闹钟</a-radio>
            <a-radio value="cycle">周期闹钟</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="闹钟时间" required>
          <a-date-picker
            v-model:value="taskForm.time"
            show-time
            class="full-control"
            placeholder=""
          />
        </a-form-item>
        <a-form-item label="备注">
          <a-textarea v-model:value="taskForm.remark" :rows="3" :maxlength="100" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import {
    CheckCircleFilled,
    CloseCircleFilled,
    EditOutlined,
    PauseCircleOutlined,
    StopFilled,
  } from '@ant-design/icons-vue';

  const filters = reactive({ status: 'all', keyword: '' });
  const taskVisible = ref(false);
  const taskForm = reactive({
    name: '',
    extensions: [],
    voice: undefined,
    type: 'once',
    time: undefined,
    remark: '',
  });
  const columns = [
    { title: '任务名称', dataIndex: 'name', key: 'name' },
    { title: '分机号码', dataIndex: 'extension', key: 'extension' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '下次执行时间', dataIndex: 'nextTime', key: 'nextTime' },
    { title: '闹钟类型', dataIndex: 'typeLabel', key: 'typeLabel' },
    { title: '有效期', dataIndex: 'validDate', key: 'validDate' },
    { title: '备注', dataIndex: 'remark', key: 'remark' },
    { title: '操作', key: 'action', width: 120 },
  ];
  const tasks = [
    {
      id: 1,
      name: '测试2',
      extension: '2126',
      status: 'failed',
      nextTime: '',
      typeLabel: '单次闹钟',
      validDate: '2025-01-20',
      remark: '',
    },
    {
      id: 2,
      name: '测试',
      extension: '2126',
      status: 'active',
      nextTime: '',
      typeLabel: '单次闹钟',
      validDate: '2025-01-20',
      remark: '',
    },
  ];
</script>

<style lang="less" scoped>
  .alarm-page {
    min-height: calc(100vh - 128px);
    background: #ffffff;
  }

  .page-header {
    padding-bottom: 18px;
    margin-bottom: 18px;
    border-bottom: 1px solid #f0f0f0;

    h2 {
      margin: 0;
      color: #1f1f1f;
      font-size: 20px;
      font-weight: 600;
    }
  }

  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .status-select {
    width: 220px;
  }

  .search-input {
    width: 260px;
  }

  .name-link {
    height: auto;
    padding: 0;
  }

  .failed-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ff4d4f;
  }

  .status-icon {
    color: #d9d9d9;
    font-size: 14px;

    &.active {
      color: #d9d9d9;
    }

    &.failed {
      color: #ff4d4f;
    }

    &.stopped {
      color: #d9d9d9;
    }
  }

  .full-control {
    width: 100%;
  }

  :deep(.ant-table-thead > tr > th) {
    color: #262626;
    font-weight: 600;
    background: #fafafa;
  }

  :deep(.ant-modal-body) {
    padding-top: 22px;
  }
</style>
