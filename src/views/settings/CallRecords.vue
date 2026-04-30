<template>
  <div class="settings-page">
    <div class="page-header">
      <h2>通话记录</h2>
      <a-button type="primary">导出</a-button>
    </div>

    <a-form layout="inline" class="filter-form">
      <a-form-item>
        <a-select v-model:value="filters.type" class="filter-select">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="out">呼出</a-select-option>
          <a-select-option value="in">呼入</a-select-option>
          <a-select-option value="missed">未接</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-input-search v-model:value="filters.keyword" class="search-input" placeholder="姓名/号码/组织名称" />
      </a-form-item>
    </a-form>

    <a-table
      :columns="columns"
      :data-source="records"
      :row-selection="{ selectedRowKeys: [] }"
      :pagination="pagination"
      :loading="loading"
      row-key="id"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a-space>
            <a-avatar size="small" class="avatar">{{ record.avatar }}</a-avatar>
            <span>{{ record.name }}</span>
          </a-space>
        </template>
        <template v-if="column.key === 'direction'">
          <a-tag :color="directionColor[record.direction]">{{ directionLabel[record.direction] }}</a-tag>
        </template>
        <template v-if="column.key === 'action'">
          <a-button type="link" size="small" @click="handleOpenRemark(record)">
            <EditOutlined />
          </a-button>
        </template>
      </template>
    </a-table>

    <a-modal
      v-model:visible="remarkVisible"
      title="编辑备注"
      ok-text="确定"
      cancel-text="取消"
      :confirm-loading="remarkSaving"
      @ok="handleSaveRemark"
    >
      <a-textarea v-model:value="remarkText" :rows="4" placeholder="请输入备注" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { EditOutlined } from '@ant-design/icons-vue';
  import { addCallRecordRemarkApi, getCallRecordPageApi } from '/@/api/extensionUser';
  import { useMessage } from '/@/hooks/useMessage';

  const { createMessage } = useMessage();
  const loading = ref(false);
  const remarkVisible = ref(false);
  const remarkSaving = ref(false);
  const currentRecord = ref<Record<string, any> | null>(null);
  const remarkText = ref('');
  const filters = reactive({ type: 'all', keyword: '' });
  const directionLabel = { out: '呼出', in: '呼入', missed: '未接' };
  const directionColor = { out: 'blue', in: 'green', missed: 'red' };
  const columns = [
    { title: '', key: 'expand', width: 48 },
    { title: '姓名/号码', dataIndex: 'name', key: 'name' },
    { title: '组织名称', dataIndex: 'org', key: 'org' },
    { title: '呼叫方向', dataIndex: 'direction', key: 'direction' },
    { title: '通话开始时间', dataIndex: 'startTime', key: 'startTime' },
    { title: '通话时长', dataIndex: 'duration', key: 'duration' },
    { title: '备注', dataIndex: 'remark', key: 'remark' },
    { title: '操作', key: 'action', width: 90 },
  ];
  const records = ref<any[]>([]);
  const pagination = reactive({ total: 0, current: 1, pageSize: 10, showSizeChanger: true });

  const cdrTypeMap: Record<string, number | null> = {
    all: null,
    out: 2,
    in: 1,
    missed: 3,
  };

  const formatDuration = (value: string | number) => {
    if (String(value || '').includes(':')) return String(value);
    const total = Number(value || 0);
    const h = String(Math.floor(total / 3600)).padStart(2, '0');
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
    const s = String(total % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const toRecord = (item: any) => ({
    id: item.uuid,
    avatar: (item.name || item.destination_number || '').slice(-2) || '通',
    name: `${item.name || item.destination_number || '-'} / ${item.destination_number || '-'}`,
    org: item.department || item.organization || '-',
    direction: item.direction || 'out',
    startTime: item.start_time || '-',
    duration: formatDuration(item.duration),
    remark: item.remark || '-',
    raw: item,
  });

  const loadRecords = async () => {
    loading.value = true;
    try {
      const res = await getCallRecordPageApi({
        cdrType: cdrTypeMap[filters.type],
        condition: filters.keyword || null,
        pageNum: pagination.current,
        pageSize: pagination.pageSize,
      });
      records.value = (res?.records || []).map(toRecord);
      pagination.total = res?.total || 0;
    } finally {
      loading.value = false;
    }
  };

  const handleTableChange = (page: any) => {
    pagination.current = page.current;
    pagination.pageSize = page.pageSize;
    loadRecords();
  };

  const handleOpenRemark = (record: any) => {
    currentRecord.value = record;
    remarkText.value = record.raw?.remark || '';
    remarkVisible.value = true;
  };

  const handleSaveRemark = async () => {
    if (!currentRecord.value) return;
    remarkSaving.value = true;
    try {
      await addCallRecordRemarkApi({
        uuid: currentRecord.value.raw.uuid,
        remark: remarkText.value,
      });
      createMessage.success('保存成功');
      remarkVisible.value = false;
      await loadRecords();
    } finally {
      remarkSaving.value = false;
    }
  };

  watch(
    () => [filters.type, filters.keyword],
    () => {
      pagination.current = 1;
      loadRecords();
    },
  );

  onMounted(loadRecords);
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
  .filter-form {
    margin-bottom: 16px;
  }
  .filter-select {
    width: 220px;
  }
  .search-input {
    width: 280px;
  }
  .avatar {
    color: #1677ff;
    background: #e8f4ff;
  }
</style>
