<template>
  <div class="settings-page">
    <div class="page-header">
      <h2>语音留言</h2>
      <a-space>
        <a-button disabled>删除</a-button>
        <a-button disabled>标为已读</a-button>
      </a-space>
    </div>

    <a-form layout="inline" class="filter-form">
      <a-form-item>
        <a-select v-model:value="filters.status" class="filter-select">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="unread">未播放</a-select-option>
          <a-select-option value="read">已播放</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-input-search v-model:value="filters.keyword" class="search-input" placeholder="姓名/主叫号码/组织名称" />
      </a-form-item>
    </a-form>

    <a-table
      :columns="columns"
      :data-source="messages"
      :row-selection="{ selectedRowKeys: [] }"
      :pagination="pagination"
      :loading="loading"
      row-key="id"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
          <a-badge :status="record.played ? 'default' : 'processing'" />
        </template>
        <template v-if="column.key === 'action'">
          <a-space>
            <a-tooltip title="播放"><a-button type="link" size="small"><PlayCircleOutlined /></a-button></a-tooltip>
            <a-tooltip title="下载"><a-button type="link" size="small"><DownloadOutlined /></a-button></a-tooltip>
            <a-tooltip title="编辑备注"><a-button type="link" size="small"><EditOutlined /></a-button></a-tooltip>
            <a-tooltip title="删除"><a-button type="link" size="small" danger><DeleteOutlined /></a-button></a-tooltip>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
  import { DeleteOutlined, DownloadOutlined, EditOutlined, PlayCircleOutlined } from '@ant-design/icons-vue';
  import { getMessagePageApi } from '/@/api/extensionUser';

  const loading = ref(false);
  const filters = reactive({ status: 'all', keyword: '' });
  const columns = [
    { title: '状态', key: 'status', width: 80 },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '主叫号码', dataIndex: 'caller', key: 'caller' },
    { title: '组织名称', dataIndex: 'org', key: 'org' },
    { title: '时长', dataIndex: 'duration', key: 'duration' },
    { title: '时间', dataIndex: 'time', key: 'time' },
    { title: '大小', dataIndex: 'size', key: 'size' },
    { title: '备注', dataIndex: 'remark', key: 'remark' },
    { title: '操作', key: 'action', width: 180 },
  ];
  const messages = ref<any[]>([]);
  const pagination = reactive({ total: 0, current: 1, pageSize: 10, showSizeChanger: true });

  const formatDuration = (value: string | number) => {
    if (String(value || '').includes(':')) return String(value);
    const total = Number(value || 0);
    const h = String(Math.floor(total / 3600)).padStart(2, '0');
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
    const s = String(total % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const toMessage = (item: any) => ({
    id: item.id || item.uuid,
    played: Boolean(item.played || item.status === 'read'),
    name: item.name || item.caller_name || '-',
    caller: item.caller || item.caller_number || item.from || '-',
    org: item.org || item.organization || item.department || '-',
    duration: formatDuration(item.duration),
    time: item.time || item.create_at || item.start_time || '-',
    size: item.size || item.file_size || '-',
    remark: item.remark || '-',
    raw: item,
  });

  const loadMessages = async () => {
    loading.value = true;
    try {
      const res = await getMessagePageApi({
        status: filters.status === 'all' ? null : filters.status,
        condition: filters.keyword || null,
        pageNum: pagination.current,
        pageSize: pagination.pageSize,
      });
      messages.value = (res?.records || []).map(toMessage);
      pagination.total = res?.total || 0;
    } finally {
      loading.value = false;
    }
  };

  const handleTableChange = (page: any) => {
    pagination.current = page.current;
    pagination.pageSize = page.pageSize;
    loadMessages();
  };

  watch(
    () => [filters.status, filters.keyword],
    () => {
      pagination.current = 1;
      loadMessages();
    },
  );

  onMounted(loadMessages);
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
    width: 300px;
  }
</style>
