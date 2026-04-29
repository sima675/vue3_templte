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
      :pagination="false"
      row-key="id"
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
  const messages = [
    { id: 1, played: false, name: '赵吉', caller: '8003', org: '-', duration: '00:00:05', time: '2025-01-20 14:00:20', size: '82.86KB', remark: '-' },
    { id: 2, played: true, name: '李东方', caller: '70019', org: '-', duration: '00:00:12', time: '2025-01-18 09:21:10', size: '126.20KB', remark: '已回拨' },
  ];
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
