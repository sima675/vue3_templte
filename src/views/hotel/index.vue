<template>
  <div class="hotel-page">
    <div class="page-header">
      <a-space v-if="isCreateRoom">
        <a-button type="link" class="back-btn" @click="router.back()"><LeftOutlined /></a-button>
        <h2>创建房间</h2>
      </a-space>
      <h2 v-else>{{ pageTitle }}</h2>
    </div>

    <template v-if="pageKey === 'check-in'">
      <div class="filters wrap">
        <a-input-search class="wide-search" placeholder="房间号/住客/身份ID/电话" />
        <a-select class="filter-select" value="all"><a-select-option value="all">位置　全部</a-select-option></a-select>
        <a-select class="filter-select" value="all"><a-select-option value="all">房型　全部</a-select-option></a-select>
        <div class="legend">
          <span><i class="legend-all"></i>全部</span>
          <span><i class="legend-free"></i>未入住</span>
          <span><i class="legend-live"></i>已入住</span>
          <span><i class="legend-disabled"></i>不可用</span>
        </div>
        <div class="status-filters">
          <span class="filter-label">维修</span>
          <a-button class="filter-tab active">全部</a-button>
          <ToolFilled class="status-tool pending" />
          <ToolFilled class="status-tool done" />
        </div>
        <div class="status-filters">
          <span class="filter-label">清扫</span>
          <a-button class="filter-tab active">全部</a-button>
          <ClearOutlined class="status-clean pending" />
          <ClearOutlined class="status-clean done" />
        </div>
        <div class="status-filters">
          <span class="filter-label">闹钟</span>
          <a-button class="filter-tab active">全部</a-button>
          <ClockCircleFilled class="status-clock pending" />
          <ClockCircleFilled class="status-clock done" />
          <ClockCircleFilled class="status-clock failed" />
        </div>
        <a-checkbox>今日计划退房</a-checkbox>
        <a-button>刷新</a-button>
      </div>
      <div class="room-cards">
        <RoomCard
          v-for="room in checkInRooms"
          :key="room.no"
          :room="room"
          @checkin="checkinVisible = true"
          @detail="detailVisible = true"
        />
      </div>
    </template>

    <template v-else-if="pageKey === 'records'">
      <div class="filters">
        <a-input-search class="wide-search" placeholder="房间号/住客姓名/身份ID/联系方式" />
        <a-range-picker class="date-range" />
      </div>
      <a-table :columns="recordColumns" :data-source="records" :pagination="pagination" row-key="id">
        <template #bodyCell="{ column, record }">
          <a-button v-if="column.key === 'id'" type="link" class="text-link">{{ record.id }}</a-button>
          <a-button v-else-if="column.key === 'action'" type="link" size="small">详情</a-button>
        </template>
      </a-table>
    </template>

    <template v-else-if="pageKey === 'calls'">
      <div class="filters">
        <a-input-search class="wide-search" placeholder="NO./住客姓名" />
        <a-range-picker class="date-range" />
      </div>
      <a-table :columns="callColumns" :data-source="calls" :pagination="pagination" row-key="id">
        <template #bodyCell="{ column, record }">
          <span v-if="column.key === 'type'" :class="['call-type', record.type]">
            <PhoneOutlined />
            {{ record.typeLabel }}
          </span>
        </template>
      </a-table>
    </template>

    <template v-else-if="pageKey === 'service-codes'">
      <div class="service-layout">
        <aside class="side-panel">
          <div class="panel-title">
            接入号
            <a-button type="link" size="small" @click="accessVisible = true"><PlusOutlined /></a-button>
          </div>
          <button class="access-item active" type="button"><CodeOutlined />001（4）</button>
        </aside>
        <main class="content-panel">
          <div class="panel-header">
            <strong>001</strong>
            <span>服务码 4</span>
            <a-button type="primary" @click="serviceCodeVisible = true">添加服务码</a-button>
          </div>
          <a-table :columns="serviceCodeColumns" :data-source="serviceCodes" :pagination="false" row-key="code">
            <template #bodyCell="{ column }">
              <template v-if="column.key === 'action'">
                <a-space><a-button type="link" size="small" @click="serviceCodeVisible = true">编辑</a-button><a-button type="link" size="small">删除</a-button></a-space>
              </template>
            </template>
          </a-table>
        </main>
      </div>
    </template>

    <template v-else-if="pageKey === 'staff'">
      <div class="toolbar">
        <a-input-search class="wide-search" placeholder="服务员/PIN码" />
        <a-space>
          <a-button>批量删除</a-button>
          <a-button type="primary" @click="staffVisible = true">新增</a-button>
        </a-space>
      </div>
      <a-table :columns="staffColumns" :data-source="staffList" :pagination="pagination" row-key="id" :row-selection="{ selectedRowKeys: [] }">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'action'">
            <a-space><a-button type="link" size="small" @click="staffVisible = true">编辑</a-button><a-button type="link" size="small">删除</a-button></a-space>
          </template>
        </template>
      </a-table>
    </template>

    <template v-else-if="pageKey === 'service-records'">
      <div class="filters">
        <a-input-search class="wide-search" placeholder="房间号/服务员/服务码" />
        <a-select class="filter-select" value="all"><a-select-option value="all">全部状态</a-select-option></a-select>
      </div>
      <a-table :columns="serviceRecordColumns" :data-source="serviceRecords" :pagination="pagination" row-key="id" />
    </template>

    <template v-else-if="pageKey === 'rooms'">
      <div class="toolbar">
        <div class="filters">
          <a-input-search class="wide-search" placeholder="房间号" />
          <a-select class="filter-select" value="all"><a-select-option value="all">位置　全部</a-select-option></a-select>
          <a-select class="filter-select" value="all"><a-select-option value="all">房型　全部</a-select-option></a-select>
        </div>
        <a-space>
          <a-button type="primary" @click="router.push('/app/hotel/rooms/new')">创建房间</a-button>
          <a-button><EllipsisOutlined /></a-button>
        </a-space>
      </div>
      <a-table :columns="roomColumns" :data-source="[]" :pagination="false" row-key="id" :row-selection="{ selectedRowKeys: [] }" />
    </template>

    <template v-else-if="pageKey === 'create-room'">
      <a-form layout="vertical" class="create-form">
        <div class="section-title">房客信息</div>
        <a-row :gutter="80">
          <a-col :span="12"><a-form-item label="房间号" required><a-input /></a-form-item></a-col>
          <a-col :span="12"><a-form-item label="分机号" required><a-select /></a-form-item></a-col>
          <a-col :span="12"><a-form-item label="位置" required><a-select /></a-form-item></a-col>
          <a-col :span="12"><a-form-item label="房型" required><a-select /></a-form-item></a-col>
          <a-col :span="12"><a-form-item label="状态"><a-select /></a-form-item></a-col>
        </a-row>
        <div class="form-footer"><a-space><a-button @click="router.back()">取消</a-button><a-button type="primary">保存</a-button></a-space></div>
      </a-form>
    </template>

    <template v-else-if="pageKey === 'room-types'">
      <div class="type-grid">
        <button class="type-card add" type="button" @click="roomTypeVisible = true"><PlusOutlined />添加房型</button>
        <button class="type-card" type="button"><HomeOutlined />1（1）</button>
        <button class="type-card" type="button"><HomeOutlined />2（2）</button>
      </div>
    </template>

    <template v-else-if="pageKey === 'locations'">
      <div class="service-layout">
        <aside class="side-panel">
          <div class="panel-title">楼栋 <a-button type="link" size="small" @click="locationVisible = true"><PlusOutlined /></a-button></div>
          <button class="access-item active" type="button"><BankOutlined />1（2）</button>
        </aside>
        <main class="content-panel">
          <div class="panel-header">
            <strong>1</strong>
            <span>楼层 3</span>
            <a-button type="primary">新增</a-button>
          </div>
          <a-table :columns="locationColumns" :data-source="locations" :pagination="false" row-key="name">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'action'">
                <a-space v-if="record.editing"><a-button type="link" size="small">保存</a-button><a-button type="link" size="small">取消</a-button></a-space>
                <a-space v-else><a-button type="link" size="small">编辑</a-button><a-button type="link" size="small">删除</a-button></a-space>
              </template>
              <a-input v-else-if="record.editing && column.key === 'name'" />
            </template>
          </a-table>
        </main>
      </div>
    </template>

    <a-modal v-model:visible="checkinVisible" title="登记入住信息" width="860px" ok-text="确认" cancel-text="取消">
      <div class="room-summary">
        <span>房间号：2</span><span>房型：2</span><span>房型：1-2</span><span>分机号：70002</span>
      </div>
      <div class="section-title">住客信息</div>
      <a-table :columns="guestEditColumns" :data-source="guestEditRows" :pagination="false" row-key="id">
        <template #bodyCell="{ column }">
          <a-input v-if="['name', 'idNo', 'phone'].includes(column.key)" />
          <a-select v-else-if="column.key === 'gender'" value="unknown"><a-select-option value="unknown">未知</a-select-option><a-select-option value="male">男</a-select-option><a-select-option value="female">女</a-select-option></a-select>
          <a-button v-else-if="column.key === 'action'" type="link" size="small">保存</a-button>
        </template>
      </a-table>
      <div class="section-title mt16">其它信息</div>
      <a-row :gutter="80">
        <a-col :span="8"><a-form-item label="分机通话权限" required><a-select value="domestic"><a-select-option value="domestic">国内</a-select-option></a-select></a-form-item></a-col>
        <a-col :span="8"><a-form-item label="语言" required><a-select value="zh"><a-select-option value="zh">中文</a-select-option></a-select></a-form-item></a-col>
        <a-col :span="8"><a-form-item label="客户等级" required><a-select value="normal"><a-select-option value="normal">普通</a-select-option><a-select-option value="vip">VIP</a-select-option></a-select></a-form-item></a-col>
        <a-col :span="8"><a-form-item label="计划离店日期" required><a-date-picker value-format="YYYY-MM-DD" /></a-form-item></a-col>
      </a-row>
    </a-modal>

    <a-modal v-model:visible="detailVisible" title="入住详情（2501131440-101）" width="980px" :footer="null">
      <div class="room-summary warm">
        <span>房间号：1</span><span>房型：1</span><span>房型：1-1</span><span>分机号：70019</span><span>入住时间：2025-01-13 14:40:33</span><span>计划离店日期：2025-01-14 <a-button type="primary" size="small">续订</a-button></span>
      </div>
      <div class="section-title">住客信息</div>
      <a-table :columns="guestDetailColumns" :data-source="guestDetailRows" :pagination="false" row-key="name" />
      <div class="section-title mt16">其它信息</div>
      <div class="detail-grid"><span>* 分机通话权限：国内</span><span>* 语言：中文</span><span>* 客户等级：普通</span></div>
      <div class="modal-footer"><a-button type="primary">编辑</a-button></div>
    </a-modal>

    <a-modal v-model:visible="accessVisible" title="创建接入号" ok-text="确定" cancel-text="取消">
      <a-form layout="vertical"><a-form-item label="接入号" required><a-input /></a-form-item></a-form>
    </a-modal>
    <a-modal v-model:visible="serviceCodeVisible" title="编辑服务码" ok-text="确定" cancel-text="取消">
      <a-form layout="vertical">
        <a-form-item label="服务码" required><a-input value="1" /></a-form-item>
        <a-form-item label="类型"><a-select value="clean"><a-select-option value="clean">清扫服务</a-select-option><a-select-option value="repair">客房维修</a-select-option></a-select></a-form-item>
        <a-form-item label="状态"><a-select value="cleaned"><a-select-option value="cleaned">干净</a-select-option><a-select-option value="dirty">待清扫</a-select-option></a-select></a-form-item>
      </a-form>
    </a-modal>
    <a-modal v-model:visible="staffVisible" title="编辑服务员" ok-text="确认" cancel-text="取消">
      <a-form layout="vertical">
        <a-form-item label="服务员ID"><a-input value="1" disabled /></a-form-item>
        <a-form-item label="服务员" required><a-input value="清洁" /></a-form-item>
        <a-form-item label="PIN码" required><a-input value="1" /></a-form-item>
      </a-form>
    </a-modal>
    <a-modal v-model:visible="roomTypeVisible" title="添加房型" ok-text="确定" cancel-text="取消">
      <a-form layout="vertical"><a-form-item label="房型名称" required><a-input /></a-form-item><a-form-item label="入住人数限制" required><a-input addon-after="人" /></a-form-item></a-form>
    </a-modal>
    <a-modal v-model:visible="locationVisible" title="创建位置" ok-text="确定" cancel-text="取消">
      <a-form layout="vertical"><a-form-item label="楼栋" required><a-input /></a-form-item></a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import {
    BankOutlined,
    ClearOutlined,
    ClockCircleFilled,
    CodeOutlined,
    EllipsisOutlined,
    HomeOutlined,
    LeftOutlined,
    PhoneOutlined,
    PlusOutlined,
    ToolFilled,
  } from '@ant-design/icons-vue';
  import { defineComponent, h } from 'vue';

  const router = useRouter();
  const route = useRoute();
  const checkinVisible = ref(false);
  const detailVisible = ref(false);
  const accessVisible = ref(false);
  const serviceCodeVisible = ref(false);
  const staffVisible = ref(false);
  const roomTypeVisible = ref(false);
  const locationVisible = ref(false);
  const pageKey = computed(() => String(route.meta.pageKey || 'check-in'));
  const isCreateRoom = computed(() => pageKey.value === 'create-room');
  const pageTitle = computed(() => String(route.meta.title || '酒店业务'));
  const pagination = { total: 1, current: 1, pageSize: 10, showSizeChanger: true };

  const RoomCard = defineComponent({
    props: { room: { type: Object, required: true } },
    emits: ['checkin', 'detail'],
    setup(props, { emit }) {
      return () => {
        const room: any = props.room;
        return h('div', { class: ['room-card', room.status] }, [
          h('div', { class: 'room-top' }, [h('strong', room.location), h('span', room.statusLabel)]),
          h('div', room.no),
          h('p', room.extension),
          h('p', room.guest || ' '),
          h('div', { class: 'room-icons' }, [
            h(ToolFilled, { class: ['room-status-icon', room.maintenanceDone ? 'done' : 'pending'], title: '维修' }),
            h(ClearOutlined, { class: ['room-status-icon', room.cleanDone ? 'done' : 'pending'], title: '清扫' }),
            h(ClockCircleFilled, { class: ['room-status-icon', room.alarmStatus || 'pending'], title: '闹钟' }),
          ]),
          h(
            'button',
            {
              class: ['room-action', room.status === 'occupied' ? 'checkout' : 'checkin'],
              onClick: () => emit(room.status === 'occupied' ? 'detail' : 'checkin'),
            },
            room.status === 'occupied' ? '退房' : '入住',
          ),
        ]);
      };
    },
  });

  const checkInRooms = [
    {
      location: '1-1-1',
      no: '1',
      extension: '70019(国内)',
      guest: '666',
      status: 'occupied',
      statusLabel: '已入住',
      maintenanceDone: false,
      cleanDone: true,
      alarmStatus: 'pending',
    },
    {
      location: '1-2-2',
      no: '2',
      extension: '70002',
      guest: '',
      status: 'free',
      statusLabel: '未入住',
      maintenanceDone: false,
      cleanDone: true,
      alarmStatus: 'failed',
    },
    {
      location: '1-2-3',
      no: '2',
      extension: '70079',
      guest: '',
      status: 'free',
      statusLabel: '未入住',
      maintenanceDone: false,
      cleanDone: true,
      alarmStatus: 'pending',
    },
  ];
  const recordColumns = [
    { title: '记录编号', dataIndex: 'id', key: 'id' },
    { title: '房间号', dataIndex: 'room', key: 'room' },
    { title: '入住时间', dataIndex: 'checkin', key: 'checkin' },
    { title: '退房时间', dataIndex: 'checkout', key: 'checkout' },
    { title: '住客姓名', dataIndex: 'name', key: 'name' },
    { title: '客户等级', dataIndex: 'level', key: 'level' },
    { title: '联系方式', dataIndex: 'phone', key: 'phone' },
    { title: '操作', key: 'action' },
  ];
  const records = [{ id: '2501131436-100', room: '1', checkin: '2025/01/13 14:36:09', checkout: '2025/01/13 14:40:21', name: 'z', level: '普通', phone: '123' }];
  const callColumns = [
    { title: '通话开始时间', dataIndex: 'time', key: 'time' },
    { title: '房间号/房间分机', dataIndex: 'room', key: 'room' },
    { title: '住客姓名', dataIndex: 'guest', key: 'guest' },
    { title: '类型', dataIndex: 'typeLabel', key: 'type' },
    { title: '对方号码', dataIndex: 'peer', key: 'peer' },
    { title: '通话时长', dataIndex: 'duration', key: 'duration' },
    { title: '通话类型(权限)', dataIndex: 'permission', key: 'permission' },
  ];
  const calls = [
    { id: 1, time: '2025-01-13 15:18:35', room: '1/70019', guest: '666', type: 'out', typeLabel: '呼出', peer: '#', duration: '00:00:00', permission: '内部' },
    { id: 2, time: '2025-01-13 10:15:56', room: '1/70019', guest: '666', type: 'in', typeLabel: '呼入', peer: '2002', duration: '00:00:02', permission: '内部' },
  ];
  const serviceCodeColumns = [
    { title: '服务码', dataIndex: 'code', key: 'code' },
    { title: '类型', dataIndex: 'type', key: 'type' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '操作', key: 'action' },
  ];
  const serviceCodes = [
    { code: '1', type: '清扫服务', status: '干净' },
    { code: '2', type: '清扫服务', status: '待清扫' },
    { code: '3', type: '客房维修', status: '正常' },
    { code: '4', type: '客房维修', status: '待维修' },
  ];
  const staffColumns = [
    { title: '服务员ID', dataIndex: 'id', key: 'id' },
    { title: '服务员', dataIndex: 'name', key: 'name' },
    { title: 'PIN码', dataIndex: 'pin', key: 'pin' },
    { title: '操作', key: 'action' },
  ];
  const staffList = [{ id: 'KY6Y', name: '清洁', pin: '1' }, { id: '2P0H', name: '维修', pin: '2' }];
  const serviceRecordColumns = [
    { title: '时间', dataIndex: 'time', key: 'time' },
    { title: '房间号', dataIndex: 'room', key: 'room' },
    { title: '服务码', dataIndex: 'code', key: 'code' },
    { title: '服务员', dataIndex: 'staff', key: 'staff' },
    { title: '状态', dataIndex: 'status', key: 'status' },
  ];
  const serviceRecords = [{ id: 1, time: '2025-01-13 14:01:30', room: '1', code: '1', staff: '清洁', status: '干净' }];
  const roomColumns = [
    { title: '位置', dataIndex: 'location', key: 'location' },
    { title: '房间号', dataIndex: 'room', key: 'room' },
    { title: '房型', dataIndex: 'type', key: 'type' },
    { title: '分机号', dataIndex: 'extension', key: 'extension' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '操作', key: 'action' },
  ];
  const locationColumns = [
    { title: '楼层名称', dataIndex: 'name', key: 'name' },
    { title: '操作', key: 'action', width: 160 },
  ];
  const locations = [{ name: '1' }, { name: '2' }, { name: '', editing: true }];
  const guestEditColumns = [
    { title: '姓名', key: 'name' },
    { title: '身份ID', key: 'idNo' },
    { title: '联系方式', key: 'phone' },
    { title: '性别', key: 'gender' },
    { title: '操作', key: 'action' },
  ];
  const guestEditRows = [{ id: 1 }];
  const guestDetailColumns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '身份ID', dataIndex: 'idNo', key: 'idNo' },
    { title: '联系方式', dataIndex: 'phone', key: 'phone' },
    { title: '性别', dataIndex: 'gender', key: 'gender' },
    { title: '操作', key: 'action' },
  ];
  const guestDetailRows = [{ name: '666', idNo: 'dssfgfd', phone: '123', gender: '男' }];
</script>

<style lang="less" scoped>
  .hotel-page {
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
  .back-btn {
    padding: 0;
    color: #595959;
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
  .wrap {
    flex-wrap: wrap;
  }
  .wide-search {
    width: 300px;
  }
  .filter-select {
    width: 220px;
  }
  .date-range {
    width: 280px;
  }
  .legend {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-left: 10px;
    span {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    i {
      width: 22px;
      height: 22px;
      border-radius: 2px;
      border: 1px solid #d9d9d9;
    }
  }
  .legend-all { background: #e6f4ff; }
  .legend-free { background: #ecffec; }
  .legend-live { background: #fff2cc; }
  .legend-disabled { background: #eeeeee; }
  .status-filters {
    display: inline-flex;
    align-items: center;
    height: 32px;
    padding: 0 8px;
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    background: #ffffff;
  }
  .filter-label {
    margin-right: 8px;
    color: #262626;
    font-weight: 600;
  }
  .filter-tab {
    height: 26px;
    padding: 0 10px;
    border: 0;
    border-radius: 0;
    box-shadow: none;

    &.active {
      color: #1677ff;
      border-bottom: 2px solid #1677ff;
    }
  }
  .status-tool,
  .status-clean,
  .status-clock {
    margin-left: 10px;
    font-size: 15px;

    &.done {
      color: #1677ff;
    }

    &.pending {
      color: #8c8c8c;
    }

    &.failed {
      color: #ff4d4f;
    }
  }
  .room-cards {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  :deep(.room-card) {
    position: relative;
    width: 160px;
    min-height: 122px;
    padding: 10px;
    border-radius: 4px;
    background: #ecffec;
    overflow: hidden;
    &.occupied {
      background: #fffaf0;
    }
    p {
      margin: 8px 0 0;
    }
  }
  :deep(.room-top) {
    display: flex;
    justify-content: space-between;
    color: #262626;
    span {
      color: #52c41a;
      font-size: 12px;
    }
  }
  :deep(.room-icons) {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-top: 8px;
  }
  :deep(.room-status-icon) {
    font-size: 14px;

    &.done {
      color: #1677ff;
    }

    &.pending {
      color: #8c8c8c;
    }

    &.failed {
      color: #ff4d4f;
    }
  }
  :deep(.room-action) {
    position: absolute;
    right: 8px;
    bottom: 8px;
    border: 0;
    border-radius: 3px;
    color: #ffffff;
    cursor: pointer;
    &.checkin { background: #52c41a; }
    &.checkout { background: #faad14; }
  }
  .service-layout {
    display: grid;
    grid-template-columns: 300px 1fr;
    min-height: 520px;
    border-top: 1px solid #f0f0f0;
  }
  .side-panel {
    padding: 20px;
    border-right: 1px solid #f0f0f0;
  }
  .panel-title,
  .panel-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }
  .panel-header {
    justify-content: flex-start;
    padding: 20px 24px 0;
    .ant-btn {
      margin-left: auto;
    }
  }
  .access-item {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    height: 34px;
    padding: 0 12px;
    border: 0;
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
    &.active {
      color: #1677ff;
      background: #e8f4ff;
    }
  }
  .content-panel {
    min-width: 0;
  }
  .type-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(220px, 1fr));
    gap: 16px;
  }
  .type-card {
    height: 64px;
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    background: #ffffff;
    cursor: pointer;
    &.add {
      border-style: dashed;
    }
  }
  .create-form {
    position: relative;
    min-height: calc(100vh - 210px);
  }
  .section-title {
    display: flex;
    align-items: center;
    min-height: 22px;
    margin-bottom: 14px;
    padding-left: 12px;
    border-left: 3px solid #1677ff;
    color: #262626;
    font-weight: 600;
  }
  .mt16 {
    margin-top: 16px;
  }
  .form-footer,
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 16px;
  }
  .room-summary {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    padding: 18px 24px;
    margin-bottom: 18px;
    border-radius: 6px;
    background: #f0fff0;
    &.warm {
      background: #fffaf0;
    }
  }
  .detail-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    padding: 16px 24px 30px;
  }
  .text-link {
    padding: 0;
  }
  .call-type {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    &.in { color: #52c41a; }
    &.out { color: #1677ff; }
  }
  :deep(.ant-table-thead > tr > th) {
    color: #262626;
    font-weight: 600;
    background: #fafafa;
  }
</style>
