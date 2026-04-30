<template>
  <div class="operator-page">
    <div class="page-header">
      <h2>{{ pageTitle }}</h2>
      <a-space>
        <a-select v-model:value="currentQueueNumber" class="queue-select" placeholder="呼叫队列" @change="handleQueueChange">
          <a-select-option v-for="queue in queues" :key="queue.number" :value="queue.number">
            {{ queue.name }}（{{ queue.number }}）
          </a-select-option>
        </a-select>
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
      </a-space>
    </div>

    <template v-if="pageKey === 'calls'">
      <div class="filters">
        <a-input-search v-model:value="filters.keyword" class="keyword-input" placeholder="姓名/分机号/对方号码" @search="loadCalls" />
        <a-select v-model:value="filters.type" class="type-select" @change="loadCalls">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="in">呼入</a-select-option>
          <a-select-option value="out">呼出</a-select-option>
        </a-select>
        <a-range-picker v-model:value="filters.dateRange" class="date-range" value-format="YYYY-MM-DD" @change="loadCalls" />
      </div>

      <a-table :columns="callColumns" :data-source="callRows" :pagination="callPagination" :loading="loading" row-key="uuid" @change="handleCallPage">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a-space>
              <a-avatar size="small" class="caller-avatar">{{ record.avatar }}</a-avatar>
              <span>{{ record.nameText }}</span>
            </a-space>
          </template>
          <template v-else-if="column.key === 'type'">
            <span :class="['call-type', record.direction]">
              <PhoneOutlined />
              {{ record.cdrTypeName || directionText(record.direction) }}
            </span>
          </template>
        </template>
      </a-table>
    </template>

    <template v-else-if="pageKey === 'console'">
      <div class="console-page-panel">
        <ConsoleList title="分机列表" :items="sipList" item-type="sip" @refresh="loadConsole" />
        <ConsoleList title="排队列表" :items="lineUpList" item-type="queue" @refresh="loadConsole" />
        <ConsoleList title="话务员列表" :items="operatorList" item-type="operator" @refresh="loadConsole" />
        <ConsoleList title="停泊列表" :items="anchorList" item-type="anchor" @refresh="loadConsole" />
      </div>
      <div class="monitor-panel">
        <div class="panel-title">当前通话监控</div>
        <a-table :columns="monitorColumns" :data-source="monitorList" :pagination="false" :loading="loading" row-key="uuid" size="small" />
      </div>
    </template>

    <template v-else-if="pageKey === 'night-service'">
      <div class="toolbar">
        <a-input-search v-model:value="nightFilters.policyName" class="keyword-input" placeholder="策略名称" @search="loadNightStrategies" />
        <a-button type="primary" @click="openNightStrategy()">新建夜服策略</a-button>
      </div>
      <a-table :columns="nightColumns" :data-source="nightRows" :pagination="nightPagination" :loading="loading" row-key="id" @change="handleNightPage">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'target'">
            {{ record.extensionNumber || record.number || record.soundName || '-' }}
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="toggleNightStrategy(record)">应用</a-button>
              <a-button type="link" size="small" @click="openNightStrategy(record)">编辑</a-button>
              <a-popconfirm title="确认删除该夜服策略？" @confirm="deleteNightStrategy(record.id)">
                <a-button type="link" size="small" danger>删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </template>

    <template v-else-if="pageKey === 'overview'">
      <div class="filters">
        <a-select v-model:value="overviewTime" class="type-select" @change="loadOverview">
          <a-select-option value="day">今日</a-select-option>
          <a-select-option value="week">本周</a-select-option>
          <a-select-option value="month">本月</a-select-option>
        </a-select>
      </div>
      <div class="overview-grid">
        <div v-for="item in overviewCards" :key="item.key" class="overview-card">
          <span>{{ item.label }}</span>
          <strong>{{ overviewData[item.key] ?? 0 }}</strong>
        </div>
      </div>
      <a-table class="mt16" :columns="extensionStatColumns" :data-source="extensionStats" :pagination="extensionPagination" :loading="loading" row-key="extension" @change="handleExtensionPage" />
    </template>

    <button class="console-fab" type="button" :disabled="!signedIn" @click="signedIn && router.push('/app/operator/console')">
      <CustomerServiceOutlined />
      <span>话务台</span>
    </button>

    <a-modal v-model:visible="signinVisible" title="签入呼叫队列" width="420px" ok-text="确定" cancel-text="取消" :confirm-loading="saving" @ok="handleSignin">
      <a-form layout="vertical">
        <a-form-item label="呼叫队列">
          <a-radio-group v-model:value="signinForm.queue">
            <a-radio v-for="queue in queues" :key="queue.number" :value="queue.number">{{ queue.name }}（{{ queue.number }}）</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="工作状态">
          <a-radio-group v-model:value="signinForm.status" option-type="button" button-style="solid">
            <a-radio-button value="rest"><CoffeeOutlined />休息</a-radio-button>
            <a-radio-button value="ready"><PhoneOutlined />就绪</a-radio-button>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model:visible="nightApplyVisible" title="夜服设置" width="420px" ok-text="确定" cancel-text="取消" :confirm-loading="saving" @ok="saveNightApply">
      <a-form layout="vertical">
        <a-form-item label="夜服策略">
          <a-select v-model:value="nightApplyForm.strategyId">
            <a-select-option v-for="item in nightRows" :key="item.id" :value="item.id">{{ item.policyName }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="状态">
          <a-switch v-model:checked="nightApplyForm.ifOpen" checked-children="开启" un-checked-children="关闭" />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model:visible="nightEditVisible" title="夜服策略" width="620px" ok-text="保存" cancel-text="取消" :confirm-loading="saving" @ok="saveNightStrategy">
      <a-form layout="vertical">
        <a-form-item label="策略名称" required><a-input v-model:value="nightForm.policyName" /></a-form-item>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="触发类型">
              <a-select v-model:value="nightForm.activationType">
                <a-select-option value="sipExtension">分机</a-select-option>
                <a-select-option value="number">号码</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="关闭类型">
              <a-select v-model:value="nightForm.closeType">
                <a-select-option value="playback">播放提示音</a-select-option>
                <a-select-option value="forward">转移号码</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12"><a-form-item label="分机号码"><a-input v-model:value="nightForm.extensionNumber" /></a-form-item></a-col>
          <a-col :span="12"><a-form-item label="目的号码"><a-input v-model:value="nightForm.number" /></a-form-item></a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12"><a-form-item label="提示音名称"><a-input v-model:value="nightForm.soundName" /></a-form-item></a-col>
          <a-col :span="12"><a-form-item label="提示音Key"><a-input v-model:value="nightForm.soundKey" /></a-form-item></a-col>
        </a-row>
        <a-form-item label="备注"><a-textarea v-model:value="nightForm.remark" :rows="3" /></a-form-item>
      </a-form>
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
  import {
    addNightStrategyApi,
    deleteNightStrategyApi,
    editNightStrategyApi,
    findNightStrategyApi,
    getOperatorCallRecordsApi,
    getOperatorDataOverviewApi,
    getOperatorExtensionStatsApi,
    getOperatorQueuesApi,
    getQueueAnchorApi,
    getQueueCallMonitorApi,
    getQueueLineUpApi,
    getQueueNightStatusApi,
    getQueueOperatorListApi,
    getQueueSipListApi,
    getNightStrategyPageApi,
    hotUpdateNightStrategyApi,
    setNightStrategyApi,
    signInQueueApi,
  } from '/@/api/extensionUser';
  import { useMessage } from '/@/hooks/useMessage';

  const ConsoleList = defineComponent({
    props: {
      title: { type: String, required: true },
      items: { type: Array, default: () => [] },
      itemType: { type: String, default: 'sip' },
    },
    emits: ['refresh'],
    setup(props, { emit }) {
      const renderItem = (item: any) =>
        h('div', { class: ['agent-card', item.status === 'online' || item.status === 'Logged In' ? 'ready' : 'rest'] }, [
          h('strong', item.user || item.extension || item.name || item.number || '-'),
          h('span', item.name || item.caller || item.state || item.queue || '-'),
          h('small', item.status || item.state || item.position || '-'),
        ]);
      return () =>
        h('div', { class: 'console-list' }, [
          h('div', { class: 'console-list-title' }, [
            h('span', { class: 'title-mark' }),
            h('span', props.title),
            h('em', String(props.items.length)),
            h('button', { class: 'refresh-btn', onClick: () => emit('refresh') }, '刷新'),
          ]),
          h('div', { class: 'console-list-body' }, props.items.length ? props.items.map(renderItem) : h('div', { class: 'empty-text' }, '暂无数据')),
        ]);
    },
  });

  const router = useRouter();
  const route = useRoute();
  const { createMessage } = useMessage();
  const loading = ref(false);
  const saving = ref(false);
  const signedIn = ref(false);
  const signinVisible = ref(false);
  const nightApplyVisible = ref(false);
  const nightEditVisible = ref(false);
  const workStatus = ref<'rest' | 'ready'>('rest');
  const queues = ref<any[]>([]);
  const currentQueueNumber = ref<string>();
  const currentQueue = computed(() => queues.value.find((item) => item.number === currentQueueNumber.value));
  const pageKey = computed(() => String(route.meta.pageKey || 'calls'));
  const pageTitle = computed(() => String(route.meta.title || '话务台'));
  const workStatusLabel = computed(() => (workStatus.value === 'ready' ? '就绪' : '休息'));

  const makePagination = () => reactive({ total: 0, current: 1, pageSize: 10, showSizeChanger: true });
  const callPagination = makePagination();
  const nightPagination = makePagination();
  const extensionPagination = makePagination();

  const signinForm = reactive({ queue: '', status: 'rest' });
  const filters = reactive({ keyword: '', type: 'all', dateRange: [] as string[] });
  const nightFilters = reactive({ policyName: '' });
  const overviewTime = ref('week');
  const callRows = ref<any[]>([]);
  const sipList = ref<any[]>([]);
  const lineUpList = ref<any[]>([]);
  const operatorList = ref<any[]>([]);
  const anchorList = ref<any[]>([]);
  const monitorList = ref<any[]>([]);
  const nightRows = ref<any[]>([]);
  const overviewData = ref<Record<string, any>>({});
  const extensionStats = ref<any[]>([]);
  const nightApplyForm = reactive({ strategyId: undefined as number | undefined, ifOpen: true });
  const nightForm = reactive<any>({
    id: undefined,
    policyName: '',
    activationType: 'sipExtension',
    closeType: 'playback',
    remark: '',
    extensionNumber: '',
    extensionIndex: 0,
    number: '',
    soundName: '默认提示音',
    soundKey: '0',
  });

  const callColumns = [
    { title: '姓名/号码', dataIndex: 'nameText', key: 'name' },
    { title: '通话开始时间', dataIndex: 'start_time', key: 'start_time' },
    { title: '分机号', dataIndex: 'extension', key: 'extension' },
    { title: '类型', dataIndex: 'cdrTypeName', key: 'type' },
    { title: '对方号码', dataIndex: 'destination_number', key: 'destination_number' },
    { title: '时长', dataIndex: 'durationText', key: 'durationText' },
    { title: '通话类型（权限）', dataIndex: 'area_call', key: 'area_call' },
  ];
  const monitorColumns = [
    { title: '主叫', dataIndex: 'caller', key: 'caller' },
    { title: '被叫', dataIndex: 'callee', key: 'callee' },
    { title: '状态', dataIndex: 'state', key: 'state' },
    { title: '开始时间', dataIndex: 'start_time', key: 'start_time' },
  ];
  const nightColumns = [
    { title: '策略名称', dataIndex: 'policyName', key: 'policyName' },
    { title: '触发类型', dataIndex: 'activationType', key: 'activationType' },
    { title: '处理方式', dataIndex: 'closeType', key: 'closeType' },
    { title: '目的地', key: 'target' },
    { title: '更新时间', dataIndex: 'updateAt', key: 'updateAt' },
    { title: '操作', key: 'action', width: 190 },
  ];
  const overviewCards = [
    { key: 'queue_sum', label: '队列总数' },
    { key: 'queue_available', label: '可用队列' },
    { key: 'in_count', label: '呼入次数' },
    { key: 'connect_count', label: '接通次数' },
    { key: 'caller_busy_count', label: '忙线次数' },
    { key: 'talk_sum_time', label: '总通话时长' },
    { key: 'talk_time_max', label: '最长通话' },
    { key: 'waiting_time_max', label: '最长等待' },
  ];
  const extensionStatColumns = [
    { title: '分机', dataIndex: 'extension', key: 'extension' },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '接通数', dataIndex: 'connect_count', key: 'connect_count' },
    { title: '通话时长', dataIndex: 'talk_sum_time', key: 'talk_sum_time' },
    { title: '等待时长', dataIndex: 'waiting_time_sum', key: 'waiting_time_sum' },
  ];

  const directionText = (value: string) => ({ in: '呼入', out: '呼出' }[value] || value || '-');
  const formatDuration = (value: string | number) => {
    if (String(value || '').includes(':')) return String(value);
    const total = Number(value || 0);
    return [Math.floor(total / 3600), Math.floor((total % 3600) / 60), total % 60].map((n) => String(n).padStart(2, '0')).join(':');
  };
  const toEpoch = (date?: string, end = false) => date ? Math.floor(new Date(`${date}T${end ? '23:59:59' : '00:00:00'}`).getTime() / 1000) : null;
  const normalizePage = (res: any) => ({
    total: res?.total || 0,
    records: res?.records || res?.data || res?.list || [],
  });

  const loadQueues = async () => {
    queues.value = await getOperatorQueuesApi() || [];
    if (!currentQueueNumber.value && queues.value.length) {
      currentQueueNumber.value = queues.value[0].number;
      signinForm.queue = queues.value[0].number;
    }
  };
  const loadCalls = async () => {
    if (!currentQueueNumber.value) return;
    loading.value = true;
    try {
      const cdrTypeMap = { all: null, in: 1, out: 2 };
      const res = normalizePage(await getOperatorCallRecordsApi({
        cdrType: cdrTypeMap[filters.type],
        condition: filters.keyword || null,
        type: 'Attendant',
        number: currentQueueNumber.value,
        start_epoch_time: toEpoch(filters.dateRange?.[0]),
        end_epoch_time: toEpoch(filters.dateRange?.[1], true),
        pageNum: callPagination.current,
        pageSize: callPagination.pageSize,
      }));
      callRows.value = res.records.map((item) => ({
        ...item,
        avatar: String(item.name || item.destination_number || '-').slice(-2),
        nameText: item.name || item.destination_number || '-',
        durationText: formatDuration(item.duration),
      }));
      callPagination.total = res.total;
    } finally {
      loading.value = false;
    }
  };
  const loadConsole = async () => {
    if (!currentQueue.value) return;
    loading.value = true;
    try {
      const index = currentQueue.value.index;
      const number = currentQueue.value.number;
      const [lineUp, anchors, monitors, sips, operators] = await Promise.all([
        getQueueLineUpApi({ index }),
        getQueueAnchorApi(number),
        getQueueCallMonitorApi(number),
        getQueueSipListApi({ index }),
        getQueueOperatorListApi({ index }),
        getQueueNightStatusApi({ index }),
      ]);
      lineUpList.value = Array.isArray(lineUp) ? lineUp : [];
      anchorList.value = Array.isArray(anchors) ? anchors : [];
      monitorList.value = Array.isArray(monitors) ? monitors : [];
      sipList.value = Array.isArray(sips) ? sips : [];
      operatorList.value = Array.isArray(operators) ? operators : [];
    } finally {
      loading.value = false;
    }
  };
  const loadNightStrategies = async () => {
    loading.value = true;
    try {
      const res = normalizePage(await getNightStrategyPageApi({
        policyName: nightFilters.policyName || null,
        pageNum: nightPagination.current,
        pageSize: nightPagination.pageSize,
      }));
      nightRows.value = res.records;
      nightPagination.total = res.total;
    } finally {
      loading.value = false;
    }
  };
  const loadOverview = async () => {
    if (!currentQueueNumber.value) return;
    loading.value = true;
    try {
      overviewData.value = await getOperatorDataOverviewApi({ queue: currentQueueNumber.value, time: overviewTime.value }) || {};
      const res = normalizePage(await getOperatorExtensionStatsApi({
        queue: currentQueueNumber.value,
        time: overviewTime.value,
        page_num: extensionPagination.current,
        page_size: extensionPagination.pageSize,
      }));
      extensionStats.value = res.records;
      extensionPagination.total = res.total;
    } finally {
      loading.value = false;
    }
  };

  const handleQueueChange = () => {
    signinForm.queue = currentQueueNumber.value || '';
    loadPage();
  };
  const handleStatusMenu = async ({ key }: { key: string }) => {
    if (key === 'night') {
      await loadNightStrategies();
      const found = currentQueue.value ? await findNightStrategyApi(currentQueue.value.index) : null;
      nightApplyForm.strategyId = found?.id || nightRows.value[0]?.id;
      nightApplyForm.ifOpen = Boolean(found?.id);
      nightApplyVisible.value = true;
      return;
    }
    if (key === 'signout') {
      await signInQueueApi({ queue: currentQueueNumber.value, status: 'Logged Out' });
      signedIn.value = false;
      workStatus.value = 'rest';
      createMessage.success('已签出');
      return;
    }
    workStatus.value = key as 'rest' | 'ready';
    await signInQueueApi({ queue: currentQueueNumber.value, status: key === 'ready' ? 'Available' : 'On Break' });
  };
  const handleSignin = async () => {
    if (!signinForm.queue) {
      createMessage.warning('请选择呼叫队列');
      return;
    }
    saving.value = true;
    try {
      await signInQueueApi({ queue: signinForm.queue, status: signinForm.status === 'ready' ? 'Available' : 'On Break' });
      currentQueueNumber.value = signinForm.queue;
      workStatus.value = signinForm.status as 'rest' | 'ready';
      signedIn.value = true;
      signinVisible.value = false;
      createMessage.success('签入成功');
      loadPage();
    } finally {
      saving.value = false;
    }
  };
  const saveNightApply = async () => {
    if (!currentQueue.value || !nightApplyForm.strategyId) {
      createMessage.warning('请选择夜服策略');
      return;
    }
    saving.value = true;
    try {
      await setNightStrategyApi({ strategyId: nightApplyForm.strategyId, index: currentQueue.value.index, ifOpen: nightApplyForm.ifOpen });
      createMessage.success('夜服设置已保存');
      nightApplyVisible.value = false;
    } finally {
      saving.value = false;
    }
  };
  const openNightStrategy = (record?: any) => {
    Object.assign(nightForm, record ? { ...record } : {
      id: undefined,
      policyName: '',
      activationType: 'sipExtension',
      closeType: 'playback',
      remark: '',
      extensionNumber: '',
      extensionIndex: 0,
      number: '',
      soundName: '默认提示音',
      soundKey: '0',
    });
    nightEditVisible.value = true;
  };
  const saveNightStrategy = async () => {
    if (!nightForm.policyName) {
      createMessage.warning('请填写策略名称');
      return;
    }
    saving.value = true;
    try {
      if (nightForm.id) {
        await editNightStrategyApi({ ...nightForm });
        await hotUpdateNightStrategyApi(nightForm.id);
      } else {
        await addNightStrategyApi({ ...nightForm });
      }
      createMessage.success('保存成功');
      nightEditVisible.value = false;
      loadNightStrategies();
    } finally {
      saving.value = false;
    }
  };
  const deleteNightStrategy = async (id: number) => {
    await deleteNightStrategyApi(id);
    createMessage.success('删除成功');
    loadNightStrategies();
  };
  const toggleNightStrategy = (record: any) => {
    nightApplyForm.strategyId = record.id;
    nightApplyForm.ifOpen = true;
    nightApplyVisible.value = true;
  };

  const handleCallPage = (page: any) => { callPagination.current = page.current; callPagination.pageSize = page.pageSize; loadCalls(); };
  const handleNightPage = (page: any) => { nightPagination.current = page.current; nightPagination.pageSize = page.pageSize; loadNightStrategies(); };
  const handleExtensionPage = (page: any) => { extensionPagination.current = page.current; extensionPagination.pageSize = page.pageSize; loadOverview(); };

  const loadPage = async () => {
    if (pageKey.value === 'calls') await loadCalls();
    if (pageKey.value === 'console') await loadConsole();
    if (pageKey.value === 'night-service') await loadNightStrategies();
    if (pageKey.value === 'overview') await loadOverview();
  };

  onMounted(async () => {
    await loadQueues();
    await loadPage();
  });
  watch(pageKey, loadPage);
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
  .filters,
  .toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }
  .toolbar {
    justify-content: space-between;
  }
  .keyword-input {
    width: 240px;
  }
  .type-select,
  .queue-select {
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
    &.in { color: #52c41a; }
    &.out { color: #1677ff; }
  }
  .console-page-panel {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;
  }
  .monitor-panel {
    margin-top: 16px;
  }
  .panel-title {
    margin-bottom: 12px;
    padding-left: 12px;
    border-left: 3px solid #1677ff;
    color: #262626;
    font-weight: 600;
  }
  .overview-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(160px, 1fr));
    gap: 12px;
  }
  .overview-card {
    min-height: 82px;
    padding: 14px 16px;
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    background: #ffffff;
    span {
      display: block;
      color: #8c8c8c;
      margin-bottom: 10px;
    }
    strong {
      color: #1f1f1f;
      font-size: 24px;
    }
  }
  .mt16 {
    margin-top: 16px;
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
  :deep(.ant-table-thead > tr > th) {
    color: #262626;
    font-weight: 600;
    background: #fafafa;
  }
</style>

<style lang="less">
  .console-list {
    min-height: 300px;
    overflow: hidden;
    border: 1px solid #f0f0f0;
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
  .refresh-btn {
    margin-left: auto;
    border: 0;
    color: #1677ff;
    background: transparent;
    cursor: pointer;
  }
  .console-list-body {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    padding: 12px;
  }
  .agent-card {
    width: 92px;
    min-height: 78px;
    padding: 8px;
    border-radius: 6px;
    text-align: center;
    background: #f5f5f5;
    strong,
    span,
    small {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    strong {
      color: #595959;
    }
    span {
      color: #262626;
      font-weight: 600;
    }
    small {
      color: #1677ff;
    }
    &.ready { background: #d9fff1; }
    &.rest { background: #eef1f4; }
  }
  .empty-text {
    color: #8c8c8c;
  }
</style>
