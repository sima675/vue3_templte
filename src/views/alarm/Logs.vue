<template>
  <div class="alarm-page">
    <div class="page-header">
      <h2>闹钟任务日志</h2>
    </div>

    <a-input-search
      v-model:value="keyword"
      class="search-input"
      placeholder="任务名称/分机号码"
    />

    <a-table
      :columns="columns"
      :data-source="logs"
      :pagination="false"
      row-key="id"
      class="log-table"
    />
  </div>
</template>

<script setup lang="ts">
  const keyword = ref('');
  const columns = [
    { title: '时间', dataIndex: 'time', key: 'time' },
    { title: '任务名称', dataIndex: 'name', key: 'name' },
    { title: '分机号码', dataIndex: 'extension', key: 'extension' },
    { title: '操作', dataIndex: 'action', key: 'action' },
  ];
  const logs = [
    { id: 1, time: '2025-01-20 14:08:30', name: '测试2', extension: '2126', action: '结束 / SYSTEM /' },
    { id: 2, time: '2025-01-20 14:07:00', name: '测试2', extension: '2126', action: '执行 / SYSTEM / -' },
    { id: 3, time: '2025-01-20 14:02:33', name: '测试2', extension: '2126', action: '新增 / - / 2123' },
    { id: 4, time: '2025-01-20 14:01:30', name: '测试', extension: '2126', action: '结束 / SYSTEM /' },
    { id: 5, time: '2025-01-20 14:00:00', name: '测试', extension: '2126', action: '执行 / SYSTEM / -' },
    { id: 6, time: '2025-01-20 13:55:47', name: '测试', extension: '2126', action: '新增 / - / 2123' },
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
