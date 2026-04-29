<template>
  <div class="operator-page">
    <div class="page-header">
      <h2>话务台通话</h2>
      <a-dropdown>
        <a-button :type="signedIn ? 'primary' : 'default'" shape="round" @click.prevent>
          <TeamOutlined />
          {{ signedIn ? `已签入 · ${workStatusLabel}` : '未签入' }}
          <DownOutlined />
        </a-button>
        <template #overlay>
          <a-menu v-if="signedIn" @click="handleStatusMenu">
            <a-menu-item key="rest">休息</a-menu-item>
            <a-menu-item key="ready">就绪</a-menu-item>
            <a-menu-item key="night">夜服</a-menu-item>
            <a-menu-divider />
            <a-menu-item key="signout">签出</a-menu-item>
          </a-menu>
          <a-menu v-else @click="signinVisible = true">
            <a-menu-item key="signin">签入队列</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>

    <div class="filters">
      <a-input-search
        v-model:value="filters.keyword"
        class="keyword-input"
        placeholder="姓名/分机号/对方号码"
      />
      <a-select v-model:value="filters.type" class="type-select">
        <a-select-option value="all">全部</a-select-option>
        <a-select-option value="in">呼入</a-select-option>
        <a-select-option value="out">呼出</a-select-option>
      </a-select>
      <a-range-picker v-model:value="filters.dateRange" class="date-range" />
    </div>

    <a-table :columns="columns" :data-source="tableData" :pagination="pagination" row-key="id">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a-space>
            <a-avatar size="small" class="caller-avatar">{{ record.avatar }}</a-avatar>
            <span>{{ record.name }}</span>
          </a-space>
        </template>
        <template v-else-if="column.key === 'type'">
          <span :class="['call-type', record.type]">
            <PhoneOutlined />
            {{ record.typeLabel }}
          </span>
        </template>
      </template>
    </a-table>

    <button
      class="console-fab"
      type="button"
      :disabled="!signedIn"
      @click="signedIn && (consoleVisible = true)"
    >
      <CustomerServiceOutlined />
      <span>话务台</span>
    </button>

    <a-modal
      v-model:visible="signinVisible"
      title="签入呼叫队列"
      width="360px"
      ok-text="确定"
      cancel-text="取消"
      @ok="handleSignin"
    >
      <a-form layout="vertical">
        <a-form-item label="呼叫队列">
          <a-radio-group v-model:value="signinForm.queue">
            <a-radio value="111aa">111aa</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="工作状态">
          <a-radio-group v-model:value="signinForm.status" option-type="button" button-style="solid">
            <a-radio-button value="rest">
              <CoffeeOutlined />
              休息
            </a-radio-button>
            <a-radio-button value="ready">
              <PhoneOutlined />
              就绪
            </a-radio-button>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="nightVisible"
      title="夜服"
      width="360px"
      ok-text="确定"
      cancel-text="取消"
    >
      <a-form layout="vertical">
        <a-form-item label="目的号码">
          <a-input v-model:value="nightNumber" placeholder="请输入" />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="consoleVisible"
      title="话务台"
      width="920px"
      :footer="null"
      wrap-class-name="operator-console-modal"
    >
      <div class="console-panel">
        <div class="console-lists">
          <ConsoleList title="分机列表" :count="0" />
          <ConsoleList title="排队列表" :count="0" />
          <ConsoleList title="话务员列表" :count="2" has-agents />
          <ConsoleList title="停泊列表" :count="0" />
        </div>
        <div class="dial-panel">
          <div class="dial-hero"></div>
          <div class="dial-pad">
            <button v-for="key in dialKeys" :key="key.main" type="button" class="dial-key">
              <strong>{{ key.main }}</strong>
              <span>{{ key.sub }}</span>
            </button>
          </div>
          <a-button type="primary">通过分机呼叫</a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import {
    CoffeeOutlined,
    CustomerServiceOutlined,
    DownOutlined,
    PhoneOutlined,
    TeamOutlined,
  } from '@ant-design/icons-vue';
  import { defineComponent, h } from 'vue';

  const ConsoleList = defineComponent({
    props: {
      title: { type: String, required: true },
      count: { type: Number, required: true },
      hasAgents: { type: Boolean, default: false },
    },
    setup(props) {
      return () =>
        h('div', { class: 'console-list' }, [
          h('div', { class: 'console-list-title' }, [
            h('span', { class: 'title-mark' }),
            h('span', props.title),
            h('em', props.count),
            h('span', { class: 'refresh-dot' }),
          ]),
          h(
            'div',
            { class: 'console-list-body' },
            props.hasAgents
              ? [
                  h('div', { class: 'agent-card rest' }, [
                    h('strong', '111aa'),
                    h('span', '2195'),
                    h('small', '休息'),
                  ]),
                  h('div', { class: 'agent-card ready' }, [
                    h('strong', '111aa'),
                    h('span', '2124'),
                    h('small', '就绪'),
                  ]),
                ]
              : [],
          ),
        ]);
    },
  });

  const signedIn = ref(false);
  const signinVisible = ref(false);
  const consoleVisible = ref(false);
  const nightVisible = ref(false);
  const nightNumber = ref('');
  const workStatus = ref<'rest' | 'ready'>('rest');
  const workStatusLabel = computed(() => (workStatus.value === 'ready' ? '就绪' : '休息'));
  const signinForm = reactive({ queue: '111aa', status: 'rest' });
  const filters = reactive({ keyword: '', type: 'all', dateRange: [] });
  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '通话开始时间', dataIndex: 'startTime', key: 'startTime' },
    { title: '分机号', dataIndex: 'extension', key: 'extension' },
    { title: '类型', dataIndex: 'typeLabel', key: 'type' },
    { title: '对方号码', dataIndex: 'peer', key: 'peer' },
    { title: '时长', dataIndex: 'duration', key: 'duration' },
    { title: '通话类型（权限）', dataIndex: 'permission', key: 'permission' },
  ];
  const records = [
    {
      id: 1,
      avatar: '26',
      name: '2126',
      startTime: '2025-01-08 16:08:40',
      extension: '2124',
      type: 'in',
      typeLabel: '呼入',
      peer: '2126',
      duration: '00:00:02',
      permission: '仅前台服务',
    },
  ];
  const tableData = computed(() => (signedIn.value ? records : []));
  const pagination = computed(() => ({
    total: tableData.value.length,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
  }));
  const dialKeys = [
    { main: '1', sub: '' },
    { main: '2', sub: 'ABC' },
    { main: '3', sub: 'DEF' },
    { main: '4', sub: 'GHI' },
    { main: '5', sub: 'JKL' },
    { main: '6', sub: 'MNO' },
    { main: '7', sub: 'PQRS' },
    { main: '8', sub: 'TUV' },
    { main: '9', sub: 'WXYZ' },
    { main: '*', sub: '' },
    { main: '0', sub: '+' },
    { main: '#', sub: '' },
  ];

  const handleStatusMenu = ({ key }: { key: string }) => {
    if (key === 'signout') {
      signedIn.value = false;
      return;
    }
    if (key === 'night') {
      nightVisible.value = true;
      return;
    }
    workStatus.value = key as 'rest' | 'ready';
  };

  const handleSignin = () => {
    signedIn.value = true;
    signinVisible.value = false;
  };

  watch(
    () => signedIn.value,
    (value) => {
      if (value) {
        workStatus.value = signinForm.status as 'rest' | 'ready';
      }
    },
  );
</script>

<style lang="less" scoped>
  .operator-page {
    position: relative;
    min-height: calc(100vh - 128px);
    background: #ffffff;
  }

  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
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

  .filters {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }

  .keyword-input {
    width: 220px;
  }

  .type-select {
    width: 220px;
  }

  .date-range {
    width: 260px;
  }

  .caller-avatar {
    color: #1677ff;
    background: #e8f4ff;
  }

  .call-type {
    display: inline-flex;
    align-items: center;
    gap: 6px;

    &.in {
      color: #52c41a;
    }

    &.out {
      color: #1677ff;
    }
  }

  .console-fab {
    position: fixed;
    left: 104px;
    bottom: 28px;
    z-index: 20;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border: 0;
    border-radius: 50%;
    color: #ffffff;
    background: linear-gradient(145deg, #55c3ff, #1677ff);
    box-shadow: 0 8px 18px rgba(22, 119, 255, 0.32);
    cursor: pointer;

    &:disabled {
      opacity: 0.75;
      cursor: not-allowed;
    }

    span {
      margin-top: 2px;
      font-size: 12px;
    }
  }

  .console-panel {
    display: grid;
    grid-template-columns: 430px 1fr;
    gap: 12px;
    height: 560px;
  }

  .console-lists {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .dial-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 0;
    background: #ffffff;
  }

  .dial-hero {
    width: 100%;
    height: 260px;
    margin-bottom: 18px;
    background:
      radial-gradient(circle at 82% 18%, rgba(22, 119, 255, 0.22), transparent 8%),
      radial-gradient(circle at 24% 48%, rgba(22, 119, 255, 0.12), transparent 7%),
      linear-gradient(180deg, #c7e5ff 0%, #f8fcff 100%);
  }

  .dial-pad {
    display: grid;
    grid-template-columns: repeat(3, 52px);
    gap: 14px 20px;
    margin-bottom: 18px;
  }

  .dial-key {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 42px;
    border: 0;
    background: transparent;
    cursor: pointer;

    strong {
      color: #1f1f1f;
      font-size: 20px;
      line-height: 22px;
    }

    span {
      min-height: 14px;
      color: #8c8c8c;
      font-size: 10px;
      line-height: 14px;
    }
  }

  :deep(.ant-table-thead > tr > th) {
    color: #262626;
    font-weight: 600;
    background: #fafafa;
  }

  :deep(.ant-empty) {
    margin: 42px 0;
  }
</style>

<style lang="less">
  .operator-console-modal {
    .ant-modal-body {
      padding: 16px;
      background: #f7f9fc;
    }

    .console-list {
      min-height: 260px;
      overflow: hidden;
      border-radius: 6px;
      background: #ffffff;
    }

    .console-list-title {
      display: flex;
      align-items: center;
      gap: 6px;
      height: 40px;
      padding: 0 12px;
      border-bottom: 1px solid #f0f0f0;
      color: #1f1f1f;
      font-weight: 600;

      em {
        min-width: 18px;
        height: 18px;
        border-radius: 4px;
        color: #1677ff;
        font-style: normal;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        background: #e8f4ff;
      }
    }

    .title-mark {
      width: 3px;
      height: 18px;
      border-radius: 2px;
      background: #1677ff;
    }

    .refresh-dot {
      width: 12px;
      height: 12px;
      margin-left: auto;
      border: 2px solid #bfbfbf;
      border-radius: 50%;
    }

    .console-list-body {
      display: flex;
      gap: 12px;
      padding: 16px;
    }

    .agent-card {
      width: 88px;
      height: 80px;
      border-radius: 6px;
      text-align: center;

      strong,
      span,
      small {
        display: block;
      }

      strong {
        margin-top: 7px;
        color: #595959;
      }

      span {
        color: #262626;
        font-size: 16px;
        font-weight: 600;
      }

      small {
        color: #1677ff;
      }

      &.rest {
        background: #b8c0c8;
      }

      &.ready {
        background: #d9fff1;
      }
    }
  }
</style>
