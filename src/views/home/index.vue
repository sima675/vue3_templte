<template>
  <div class="workbench">
    <a-row :gutter="[16, 16]">
      <a-col :xs="24" :sm="12" :xl="6" v-for="item in summaryCards" :key="item.title">
        <a-card :bordered="false">
          <a-statistic :title="item.title" :value="item.value" :suffix="item.suffix" />
          <div class="summary-extra">{{ item.description }}</div>
        </a-card>
      </a-col>
    </a-row>

    <a-row class="section-row" :gutter="[16, 16]">
      <a-col :xs="24" :xl="14">
        <a-card title="模板说明" :bordered="false">
          <p class="section-text">
            这个项目已经整理为通用后台模板，默认保留登录、权限路由、Pinia、请求封装、
            通用表格、筛选表单、Mock 数据和基础布局。
          </p>
          <p class="section-text">
            建议你优先替换路由、接口模块和业务页面，再根据实际需求决定是否保留 Mock 和权限演示。
          </p>
        </a-card>
      </a-col>
      <a-col :xs="24" :xl="10">
        <a-card title="开始前建议" :bordered="false">
          <a-timeline>
            <a-timeline-item v-for="item in todoList" :key="item">{{ item }}</a-timeline-item>
          </a-timeline>
        </a-card>
      </a-col>
    </a-row>

    <a-card title="示例数据表格" :bordered="false">
      <Table :url="fetchApi.list" :columns="columns" :hiddenFilter="true" :scroll="{ x: 960 }" />
    </a-card>
  </div>
</template>
<script setup lang="ts">
  import { columns } from './constant';
  import fetchApi from '/@/api/home';

  const summaryCards = [
    { title: '页面模块', value: 4, suffix: '个', description: '保留工作台、列表、组件示例和个人设置' },
    { title: '通用组件', value: 6, suffix: '个', description: '表格、筛选、弹窗、图标、上传和面包屑' },
    { title: '状态模块', value: 4, suffix: '个', description: '用户、权限、首页和账户模块已拆分' },
    { title: '默认账号', value: 2, suffix: '个', description: 'admin 和 test，可直接联调本地 mock' },
  ];

  const todoList = [
    '替换应用标题、Logo、主题色和环境变量',
    '按真实接口改造 src/api 和 mock',
    '删除示例页面或改造成你的业务模块',
    '补齐类型检查链路并统一 Node / TypeScript 版本',
  ];
</script>
<style lang="less" scoped>
  .workbench {
    .summary-extra {
      margin-top: 12px;
      color: #8c8c8c;
      line-height: 22px;
    }

    .section-row {
      margin-top: 16px;
      margin-bottom: 16px;
    }

    .section-text {
      color: #595959;
      line-height: 24px;
    }
  }
</style>
