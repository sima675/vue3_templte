<template>
  <div class="alarm-page">
    <div class="page-header">
      <h2>闹钟任务日志</h2>
    </div>

    <a-input-search
      v-model:value="keyword"
      class="search-input"
      placeholder="任务名称/分机号码"
      allow-clear
      @search="handleSearch"
    />

    <a-table
      :columns="columns"
      :data-source="logs"
      :loading="loading"
      :pagination="pagination"
      row-key="id"
      class="log-table"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          {{ getEventLabel(record.eventType) }} / {{ record.userSip || '-' }} / {{ record.msg || '-' }}
        </template>
        <template v-else-if="column.key === 'name'">
          {{ record.taskName || '-' }}
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
  import { su2AlarmApi } from '/@/api/su2';
  import type { Su2AlarmLog } from '/@/api/su2/model';

  type AlarmLogRow = Su2AlarmLog & { id: string };

  const keyword = ref('');
  const loading = ref(false);
  const logs = ref<AlarmLogRow[]>([]);
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
  });

  const columns = [
    { title: '时间', dataIndex: 'at', key: 'at' },
    { title: '任务名称', dataIndex: 'taskName', key: 'name' },
    { title: '分机号码', dataIndex: 'sip', key: 'sip' },
    { title: '操作', key: 'action' },
  ];

  const eventMap: Record<string, string> = {
    ADD: '新增',
    EDIT: '编辑',
    STOP: '停止',
    RUN: '执行',
    END: '结束',
    FAIL: '失败',
  };

  const getEventLabel = (eventType: string) => eventMap[eventType] || eventType || '-';

  const loadLogs = async () => {
    loading.value = true;
    try {
      const res = await su2AlarmApi.getLogs({
        pageNum: pagination.current,
        pageSize: pagination.pageSize,
        kw: keyword.value || undefined,
      });
      logs.value = (res?.list || []).map((item, index) => ({
        ...item,
        id: `${item.alarm_id}-${item.at}-${index}`,
      }));
      pagination.total = res?.total || 0;
    } finally {
      loading.value = false;
    }
  };

  const handleSearch = () => {
    pagination.current = 1;
    loadLogs();
  };

  const handleTableChange = (pageInfo: any) => {
    pagination.current = pageInfo.current;
    pagination.pageSize = pageInfo.pageSize;
    loadLogs();
  };

  onMounted(loadLogs);
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

  .search-input {
    width: 260px;
    margin-bottom: 18px;
  }

  .log-table {
    max-width: 1188px;
  }

  :deep(.ant-table-thead > tr > th) {
    color: #262626;
    font-weight: 600;
    background: #fafafa;
  }
</style>
