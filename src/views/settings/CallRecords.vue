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
      row-key="id"
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
          <a-button type="link" size="small">
            <EditOutlined />
          </a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
  import { EditOutlined } from '@ant-design/icons-vue';

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
  const records = [
    { id: 1, avatar: '08', name: '70008 / 70008', org: '-', direction: 'out', startTime: '2025-01-17 11:32:45', duration: '00:00:13', remark: '-' },
    { id: 2, avatar: '08', name: '70008 / 70008', org: '-', direction: 'out', startTime: '2025-01-17 11:32:44', duration: '00:00:00', remark: '-' },
    { id: 3, avatar: '08', name: '70008 / 70008', org: '-', direction: 'missed', startTime: '2025-01-17 11:31:45', duration: '00:00:00', remark: '-' },
    { id: 4, avatar: '19', name: '70019 / 70019', org: '-', direction: 'out', startTime: '2025-01-17 11:31:06', duration: '00:00:11', remark: '-' },
    { id: 5, avatar: '19', name: '70019 / 70019', org: '-', direction: 'in', startTime: '2025-01-17 11:30:22', duration: '00:00:05', remark: '-' },
  ];
  const pagination = { total: 72, current: 1, pageSize: 10, showSizeChanger: true };
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
