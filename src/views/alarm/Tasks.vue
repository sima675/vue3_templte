<template>
  <div class="alarm-page">
    <div class="page-header">
      <h2>闹钟任务管理</h2>
    </div>

    <div class="toolbar">
      <a-space>
        <a-select v-model:value="filters.status" class="status-select" @change="handleStatusChange">
          <a-select-option value="all">全部状态</a-select-option>
          <a-select-option value="active">生效中</a-select-option>
          <a-select-option value="failed">失败</a-select-option>
          <a-select-option value="stopped">已停止</a-select-option>
        </a-select>
        <a-input-search
          v-model:value="filters.keyword"
          class="search-input"
          placeholder="任务名称/分机号码/备注"
          allow-clear
          @search="loadTasks"
        />
      </a-space>
      <a-button type="primary" @click="openCreateTask">新建闹钟任务</a-button>
    </div>

    <a-table
      :columns="columns"
      :data-source="filteredTasks"
      :loading="loading"
      :pagination="pagination"
      row-key="id"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a-space :size="6">
            <span v-if="record.faild_count > 0" class="failed-dot"></span>
            <a-button type="link" class="name-link" @click="openEditTask(record)">{{ record.name }}</a-button>
          </a-space>
        </template>
        <template v-else-if="column.key === 'status'">
          <a-tag :color="getStatusMeta(record).color">{{ getStatusMeta(record).label }}</a-tag>
        </template>
        <template v-else-if="column.key === 'sip'">
          {{ (record.sip || []).join(', ') || '-' }}
        </template>
        <template v-else-if="column.key === 'typeLabel'">
          {{ record.circulation === 1 ? '周期闹钟' : '单次闹钟' }}
        </template>
        <template v-else-if="column.key === 'validDate'">
          {{ record.circulation === 1 ? `${record.start_time || '-'} 至 ${record.end_time || '-'}` : record.run_time || '-' }}
        </template>
        <template v-else-if="column.key === 'action'">
          <a-space :size="8">
            <a-button type="link" size="small" title="编辑闹钟" @click="openEditTask(record)">
              <EditOutlined />
            </a-button>
            <a-button
              type="link"
              size="small"
              title="停止闹钟"
              :disabled="record.status === 0"
              @click="handleStopTask(record)"
            >
              <PauseCircleOutlined />
            </a-button>
          </a-space>
        </template>
      </template>
    </a-table>

    <a-modal
      v-model:visible="taskVisible"
      :title="isEdit ? '编辑闹钟任务' : '新建闹钟任务'"
      width="520px"
      ok-text="确定"
      cancel-text="取消"
      :confirm-loading="saving"
      @ok="handleSaveTask"
    >
      <a-form ref="formRef" :model="taskForm" :rules="rules" layout="vertical">
        <a-form-item label="任务名称" name="name">
          <a-input v-model:value="taskForm.name" placeholder="请输入任务名称" />
        </a-form-item>
        <a-form-item label="分机号码" name="sip">
          <a-select
            v-model:value="taskForm.sip"
            mode="multiple"
            show-search
            placeholder="请选择分机"
            :max-tag-count="3"
          >
            <a-select-option v-for="item in extensionOptions" :key="item.user" :value="item.user">
              {{ item.user }}{{ item.name ? `（${item.name}）` : '' }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="闹钟语音" name="tone">
          <a-select v-model:value="taskForm.tone" placeholder="请选择闹钟语音">
            <a-select-option v-for="tone in toneOptions" :key="tone.id" :value="tone.id">
              {{ tone.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="闹钟类型" name="circulation">
          <a-radio-group v-model:value="taskForm.circulation">
            <a-radio :value="0">单次闹钟</a-radio>
            <a-radio :value="1">周期闹钟</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="闹钟时间" name="runTime">
          <a-date-picker
            v-model:value="taskForm.runTime"
            show-time
            class="full-control"
            value-format="YYYY-MM-DD HH:mm"
            placeholder="请选择闹钟时间"
          />
        </a-form-item>
        <a-form-item v-if="taskForm.circulation === 1" label="有效期" name="dateRange">
          <a-range-picker
            v-model:value="taskForm.dateRange"
            class="full-control"
            value-format="YYYY-MM-DD"
          />
        </a-form-item>
        <a-form-item v-if="taskForm.circulation === 1" label="重复间隔" name="repeat_rate">
          <a-input-number v-model:value="taskForm.repeat_rate" :min="1" :max="365" addon-after="天" class="full-control" />
        </a-form-item>
        <a-form-item label="备注" name="descript">
          <a-textarea v-model:value="taskForm.descript" :rows="3" :maxlength="100" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import {
    EditOutlined,
    PauseCircleOutlined,
  } from '@ant-design/icons-vue';
  import type { FormInstance } from 'ant-design-vue';
  import { su2AlarmApi, su2CallApi } from '/@/api/su2';
  import type { Su2AlarmTask, Su2AlarmTone, Su2SipExtension } from '/@/api/su2/model';
  import { useMessage } from '/@/hooks/useMessage';

  type StatusFilter = 'all' | 'active' | 'failed' | 'stopped';

  const { createMessage, createConfirm } = useMessage();
  const formRef = ref<FormInstance>();
  const loading = ref(false);
  const saving = ref(false);
  const taskVisible = ref(false);
  const isEdit = ref(false);
  const editingId = ref<number | null>(null);
  const filters = reactive<{ status: StatusFilter; keyword: string }>({ status: 'all', keyword: '' });
  const tasks = ref<Su2AlarmTask[]>([]);
  const toneOptions = ref<Su2AlarmTone[]>([]);
  const extensionOptions = ref<Su2SipExtension[]>([]);
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
  });

  const taskForm = reactive({
    name: '',
    sip: [] as string[],
    tone: '0',
    circulation: 0,
    runTime: '',
    dateRange: [] as string[],
    repeat_rate: 1,
    descript: '',
  });

  const columns = [
    { title: '任务名称', dataIndex: 'name', key: 'name' },
    { title: '分机号码', dataIndex: 'sip', key: 'sip' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '下次执行时间', dataIndex: 'run_time', key: 'run_time' },
    { title: '闹钟类型', key: 'typeLabel' },
    { title: '有效期', key: 'validDate' },
    { title: '备注', dataIndex: 'descript', key: 'descript' },
    { title: '操作', key: 'action', width: 120 },
  ];

  const rules: Record<string, any[]> = {
    name: [
      { required: true, message: '请输入任务名称' },
      {
        validator: async (_rule, value: string) => {
          if (!value) return Promise.resolve();
          if (!/^[\u4e00-\u9fa5A-Za-z0-9 _-]+$/.test(value)) {
            return Promise.reject('仅支持中英文、数字、空格、-、_');
          }
          if (value.length > 32) {
            return Promise.reject('任务名称不能超过32个字符');
          }
          return Promise.resolve();
        },
      },
    ],
    sip: [
      { required: true, type: 'array', message: '请选择分机号码' },
      {
        validator: async (_rule, value: string[]) => {
          if ((value || []).length > 30) {
            return Promise.reject('最多可添加30个分机');
          }
          return Promise.resolve();
        },
      },
    ],
    tone: [{ required: true, message: '请选择闹钟语音' }],
    runTime: [{ required: true, message: '请选择闹钟时间' }],
    dateRange: [
      {
        validator: async () => {
          if (taskForm.circulation === 1 && taskForm.dateRange.length !== 2) {
            return Promise.reject('请选择有效期');
          }
          return Promise.resolve();
        },
      },
    ],
    repeat_rate: [{ required: true, message: '请输入重复间隔' }],
    descript: [
      {
        validator: async (_rule, value: string) => {
          if ((value || '').length > 100) {
            return Promise.reject('备注不能超过100字符');
          }
          return Promise.resolve();
        },
      },
    ],
  };

  const statusParam = computed(() => {
    if (filters.status === 'active') return 1;
    if (filters.status === 'stopped') return 0;
    return undefined;
  });

  const filteredTasks = computed(() => {
    const keyword = filters.keyword.trim();
    return tasks.value.filter((task) => {
      const statusMatched = filters.status !== 'failed' || Number(task.faild_count || 0) > 0;
      const keywordMatched =
        !keyword ||
        task.name.includes(keyword) ||
        (task.descript || '').includes(keyword) ||
        (task.sip || []).some((sip) => sip.includes(keyword));
      return statusMatched && keywordMatched;
    });
  });

  const getStatusMeta = (record: Su2AlarmTask) => {
    if (Number(record.faild_count || 0) > 0) return { label: '失败', color: 'red' };
    if (record.status === 1) return { label: '生效中', color: 'blue' };
    return { label: '已停止', color: 'default' };
  };

  const resetForm = () => {
    taskForm.name = '';
    taskForm.sip = [];
    taskForm.tone = toneOptions.value[0]?.id || '0';
    taskForm.circulation = 0;
    taskForm.runTime = '';
    taskForm.dateRange = [];
    taskForm.repeat_rate = 1;
    taskForm.descript = '';
    formRef.value?.clearValidate();
  };

  const openCreateTask = () => {
    isEdit.value = false;
    editingId.value = null;
    resetForm();
    taskVisible.value = true;
  };

  const openEditTask = (record: Su2AlarmTask) => {
    isEdit.value = true;
    editingId.value = record.id;
    taskForm.name = record.name || '';
    taskForm.sip = [...(record.sip || [])];
    taskForm.tone = record.tone || toneOptions.value[0]?.id || '0';
    taskForm.circulation = record.circulation || 0;
    taskForm.runTime = record.run_time || '';
    taskForm.dateRange = record.start_time && record.end_time ? [record.start_time, record.end_time] : [];
    taskForm.repeat_rate = record.repeat_rate || 1;
    taskForm.descript = record.descript || '';
    formRef.value?.clearValidate();
    taskVisible.value = true;
  };

  const toPayload = () => ({
    name: taskForm.name.trim(),
    run_time: taskForm.runTime,
    tone: taskForm.tone,
    descript: taskForm.descript.trim(),
    circulation_type: taskForm.circulation === 1 ? 1 : 0,
    circulation: taskForm.circulation,
    start_time: taskForm.circulation === 1 ? taskForm.dateRange[0] : null,
    end_time: taskForm.circulation === 1 ? taskForm.dateRange[1] : null,
    repeat_rate: taskForm.repeat_rate,
    sip: taskForm.sip,
  });

  const handleSaveTask = async () => {
    await formRef.value?.validate();
    saving.value = true;
    try {
      if (isEdit.value && editingId.value != null) {
        await su2AlarmApi.updateTask({ ...toPayload(), id: editingId.value });
        createMessage.success('编辑成功');
      } else {
        await su2AlarmApi.createTask(toPayload());
        createMessage.success('新增成功');
      }
      taskVisible.value = false;
      await loadTasks();
    } finally {
      saving.value = false;
    }
  };

  const handleStopTask = (record: Su2AlarmTask) => {
    createConfirm({
      iconType: 'warning',
      title: '停止闹钟？',
      content: `确认停止闹钟任务“${record.name}”？`,
      onOk: async () => {
        await su2AlarmApi.stopTask(record.id);
        createMessage.success('已停止');
        await loadTasks();
      },
    });
  };

  const handleTableChange = (pageInfo: any) => {
    pagination.current = pageInfo.current;
    pagination.pageSize = pageInfo.pageSize;
    loadTasks();
  };

  const handleStatusChange = () => {
    pagination.current = 1;
    loadTasks();
  };

  const loadTasks = async () => {
    loading.value = true;
    try {
      const res = await su2AlarmApi.getTasks({
        pageNum: pagination.current,
        pageSize: pagination.pageSize,
        status: statusParam.value,
      });
      tasks.value = res?.list || [];
      pagination.total = res?.total || 0;
    } finally {
      loading.value = false;
    }
  };

  const loadOptions = async () => {
    const [tones, sips] = await Promise.all([
      su2AlarmApi.getTones(),
      su2CallApi.getSipList(''),
    ]);
    toneOptions.value = tones || [];
    extensionOptions.value = sips || [];
    taskForm.tone = toneOptions.value[0]?.id || '0';
  };

  onMounted(async () => {
    await loadOptions();
    await loadTasks();
  });
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
