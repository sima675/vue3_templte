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
        <a-input-search v-model:value="roomFilters.kw" class="wide-search" placeholder="房间号/住客/身份ID/电话" @search="loadCheckInRooms" />
        <a-select v-model:value="roomFilters.position" class="filter-select" allow-clear placeholder="位置">
          <a-select-option v-for="item in flatPositions" :key="item.id" :value="item.id">{{ item.fullName }}</a-select-option>
        </a-select>
        <a-select v-model:value="roomFilters.vacant" class="filter-select" allow-clear placeholder="入住状态">
          <a-select-option :value="1">未入住</a-select-option>
          <a-select-option :value="2">已入住</a-select-option>
        </a-select>
        <a-select v-model:value="roomFilters.ifok" class="filter-select" allow-clear placeholder="可用状态">
          <a-select-option :value="2">可用</a-select-option>
          <a-select-option :value="1">不可用</a-select-option>
        </a-select>
        <a-checkbox v-model:checked="roomFilters.today">今日计划退房</a-checkbox>
        <a-button @click="loadCheckInRooms">刷新</a-button>
      </div>
      <div class="room-cards">
        <RoomCard
          v-for="room in checkInRooms"
          :key="room.id"
          :room="room"
          @checkin="openCheckin"
          @detail="openDetail"
          @repair="setRepair"
          @clean="setClean"
          @check="setCheck"
        />
      </div>
      <a-empty v-if="!checkInRooms.length && !loading" />
    </template>

    <template v-else-if="pageKey === 'records'">
      <div class="filters">
        <a-input-search v-model:value="recordFilters.kw" class="wide-search" placeholder="房间号/住客姓名/身份ID/联系方式" @search="loadRecords" />
        <a-range-picker v-model:value="recordFilters.range" class="date-range" value-format="YYYY-MM-DD" @change="loadRecords" />
      </div>
      <a-table :columns="recordColumns" :data-source="records" :pagination="recordPagination" :loading="loading" row-key="id" @change="handleRecordPage" />
    </template>

    <template v-else-if="pageKey === 'calls'">
      <div class="filters">
        <a-input-search v-model:value="callFilters.condition" class="wide-search" placeholder="NO./住客姓名" @search="loadCalls" />
        <a-range-picker v-model:value="callFilters.range" class="date-range" value-format="YYYY-MM-DD" @change="loadCalls" />
      </div>
      <a-table :columns="callColumns" :data-source="calls" :pagination="callPagination" :loading="loading" row-key="uuid" @change="handleCallPage">
        <template #bodyCell="{ column, record }">
          <span v-if="column.key === 'type'" :class="['call-type', record.direction]">
            <PhoneOutlined />
            {{ record.cdrTypeName || directionText(record.direction) }}
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
          <button class="access-item active" type="button"><CodeOutlined />{{ serviceForm.accessNumber || '未设置' }}</button>
        </aside>
        <main class="content-panel">
          <div class="panel-header">
            <strong>{{ serviceForm.accessNumber || '服务码' }}</strong>
            <span>客房服务码</span>
            <a-button type="primary" :loading="saving" @click="saveServiceCode">保存</a-button>
          </div>
          <a-table :columns="serviceCodeColumns" :data-source="serviceCodeRows" :pagination="false" row-key="rowKey" :loading="loading">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'serviceCode'">
                <a-input v-model:value="record.code" maxlength="8" placeholder="服务码" />
              </template>
              <template v-else-if="column.key === 'functionCode'">
                <a-input v-model:value="record.functionCode" maxlength="8" placeholder="功能码" />
              </template>
            </template>
          </a-table>
        </main>
      </div>
    </template>

    <template v-else-if="pageKey === 'staff'">
      <div class="toolbar">
        <a-input-search v-model:value="waiterFilters.kw" class="wide-search" placeholder="服务员/PIN码" @search="loadWaiters" />
        <a-space>
          <a-button :disabled="!selectedWaiterIds.length" @click="deleteWaiters(selectedWaiterIds)">批量删除</a-button>
          <a-button type="primary" @click="openWaiter()">新增</a-button>
        </a-space>
      </div>
      <a-table
        :columns="staffColumns"
        :data-source="staffList"
        :pagination="waiterPagination"
        :loading="loading"
        row-key="id"
        :row-selection="{ selectedRowKeys: selectedWaiterIds, onChange: handleWaiterSelect }"
        @change="handleWaiterPage"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="openWaiter(record)">编辑</a-button>
              <a-popconfirm title="确认删除该服务员？" @confirm="deleteWaiters([record.id])">
                <a-button type="link" size="small" danger>删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </template>

    <template v-else-if="pageKey === 'service-records'">
      <div class="filters">
        <a-input-search v-model:value="operationFilters.condition" class="wide-search" placeholder="房间号/服务员/服务码" @search="loadOperationRecords" />
        <a-range-picker v-model:value="operationFilters.range" class="date-range" value-format="YYYY-MM-DD" @change="loadOperationRecords" />
      </div>
      <a-table :columns="serviceRecordColumns" :data-source="serviceRecords" :pagination="operationPagination" :loading="loading" row-key="id" @change="handleOperationPage" />
    </template>

    <template v-else-if="pageKey === 'rooms'">
      <div class="toolbar">
        <div class="filters">
          <a-input-search v-model:value="adminRoomFilters.kw" class="wide-search" placeholder="房间号" @search="loadAdminRooms" />
          <a-select v-model:value="adminRoomFilters.position_id" class="filter-select" allow-clear placeholder="位置" @change="loadAdminRooms">
            <a-select-option v-for="item in flatPositions" :key="item.id" :value="item.id">{{ item.fullName }}</a-select-option>
          </a-select>
          <a-select v-model:value="adminRoomFilters.room_type_id" class="filter-select" allow-clear placeholder="房型" @change="loadAdminRooms">
            <a-select-option v-for="item in roomTypes" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
          </a-select>
          <a-select v-model:value="adminRoomFilters.status" class="filter-select" allow-clear placeholder="状态" @change="loadAdminRooms">
            <a-select-option :value="2">可用</a-select-option>
            <a-select-option :value="1">不可用</a-select-option>
          </a-select>
        </div>
        <a-space>
          <a-button @click="bulkCreateVisible = true">批量创建</a-button>
          <a-button :disabled="!selectedRoomIds.length" @click="openBulkEdit">批量编辑</a-button>
          <a-button :disabled="!selectedRoomIds.length" @click="deleteRooms(selectedRoomIds)">批量删除</a-button>
          <a-button type="primary" @click="openRoomForm()">创建房间</a-button>
        </a-space>
      </div>
      <a-table
        :columns="roomColumns"
        :data-source="adminRooms"
        :pagination="adminRoomPagination"
        :loading="loading"
        row-key="id"
        :row-selection="{ selectedRowKeys: selectedRoomIds, onChange: handleRoomSelect }"
        @change="handleAdminRoomPage"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">{{ record.status === 2 ? '可用' : '不可用' }}</template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="openRoomForm(record)">编辑</a-button>
              <a-popconfirm title="确认删除该房间？" @confirm="deleteRooms([record.id])">
                <a-button type="link" size="small" danger>删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </template>

    <template v-else-if="pageKey === 'create-room'">
      <a-form :model="roomForm" layout="vertical" class="create-form">
        <div class="section-title">房间信息</div>
        <a-row :gutter="80">
          <a-col :span="12"><a-form-item label="房间号" required><a-input v-model:value="roomForm.room_number" /></a-form-item></a-col>
          <a-col :span="12">
            <a-form-item label="分机号" required>
              <a-select v-model:value="roomForm.extension" show-search :filter-option="filterOption">
                <a-select-option v-for="item in userExtensions" :key="item.extension" :value="item.extension">{{ item.extension }} {{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="位置" required>
              <a-select v-model:value="roomForm.position_id">
                <a-select-option v-for="item in flatPositions" :key="item.id" :value="item.id">{{ item.fullName }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="房型" required>
              <a-select v-model:value="roomForm.room_type_id">
                <a-select-option v-for="item in roomTypes" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="状态">
              <a-select v-model:value="roomForm.status">
                <a-select-option :value="2">可用</a-select-option>
                <a-select-option :value="1">不可用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <div class="form-footer"><a-space><a-button @click="router.back()">取消</a-button><a-button type="primary" :loading="saving" @click="saveRoom">保存</a-button></a-space></div>
      </a-form>
    </template>

    <template v-else-if="pageKey === 'room-types'">
      <div class="type-grid">
        <button class="type-card add" type="button" @click="openRoomType()">
          <span class="type-main"><PlusOutlined />添加房型</span>
        </button>
        <div v-for="item in roomTypes" :key="item.id" class="type-card row-card">
          <span class="type-main"><HomeOutlined />{{ item.name }}（{{ item.cup }}）</span>
          <a-space class="type-actions">
            <a-button type="link" size="small" @click="openRoomType(item)">编辑</a-button>
            <a-popconfirm title="确认删除该房型？" @confirm="deleteRoomType(item.id)">
              <a-button type="link" size="small" danger>删除</a-button>
            </a-popconfirm>
          </a-space>
        </div>
      </div>
    </template>

    <template v-else-if="pageKey === 'locations'">
      <div class="service-layout">
        <aside class="side-panel">
          <div class="panel-title">楼栋 <a-button type="link" size="small" @click="openPosition(0)"><PlusOutlined /></a-button></div>
          <div v-for="item in positions" :key="item.id" :class="['access-item building-item', selectedBuildingId === item.id ? 'active' : '']">
            <button type="button" class="building-main" @click="selectedBuildingId = item.id">
              <BankOutlined />{{ item.name }}（{{ item.children?.length || 0 }}）
            </button>
            <a-space size="small" class="building-actions">
              <a-button type="link" size="small" @click.stop="openPosition(0, item)">编辑</a-button>
              <a-popconfirm title="确认删除该楼栋及楼层？" @confirm="deletePosition(item.id)">
                <a-button type="link" size="small" danger @click.stop="() => null">删除</a-button>
              </a-popconfirm>
            </a-space>
          </div>
        </aside>
        <main class="content-panel">
          <div class="panel-header">
            <strong>{{ selectedBuilding?.name || '楼栋' }}</strong>
            <span>楼层 {{ selectedBuilding?.children?.length || 0 }}</span>
            <a-button type="primary" :disabled="!selectedBuildingId" @click="openPosition(selectedBuildingId)">新增楼层</a-button>
          </div>
          <a-table :columns="locationColumns" :data-source="selectedBuilding?.children || []" :pagination="false" row-key="id">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'action'">
                <a-space>
                  <a-button type="link" size="small" @click="openPosition(record.pid, record)">编辑</a-button>
                  <a-popconfirm title="确认删除该位置？" @confirm="deletePosition(record.id)">
                    <a-button type="link" size="small" danger>删除</a-button>
                  </a-popconfirm>
                </a-space>
              </template>
            </template>
          </a-table>
        </main>
      </div>
    </template>

    <a-modal v-model:visible="checkinVisible" title="登记入住信息" ok-text="知道了" :cancel-button-props="{ style: { display: 'none' } }">
      <a-alert type="info" show-icon message="当前接口文档未提供入住登记提交接口，暂保留入口展示。" />
    </a-modal>

    <a-modal v-model:visible="detailVisible" title="入住详情" width="720px" :footer="null">
      <a-descriptions :column="2" bordered>
        <a-descriptions-item label="房间号">{{ activeRoom?.room_number || activeRoom?.name || '-' }}</a-descriptions-item>
        <a-descriptions-item label="分机号">{{ activeRoom?.extension || '-' }}</a-descriptions-item>
        <a-descriptions-item label="房型">{{ activeRoom?.room_type || '-' }}</a-descriptions-item>
        <a-descriptions-item label="状态">{{ activeRoom?.vacant === 2 ? '已入住' : '未入住' }}</a-descriptions-item>
      </a-descriptions>
      <a-alert class="mt16" type="info" show-icon message="当前接口文档未提供退房/续住/入住详情接口，暂只展示房间基础信息。" />
    </a-modal>

    <a-modal v-model:visible="accessVisible" title="创建接入号" ok-text="确定" cancel-text="取消" @ok="accessVisible = false">
      <a-form layout="vertical"><a-form-item label="接入号" required><a-input v-model:value="serviceForm.accessNumber" maxlength="8" /></a-form-item></a-form>
    </a-modal>

    <a-modal v-model:visible="waiterVisible" title="编辑服务员" ok-text="确认" cancel-text="取消" :confirm-loading="saving" @ok="saveWaiter">
      <a-form layout="vertical">
        <a-form-item label="服务员" required><a-input v-model:value="waiterForm.name" /></a-form-item>
        <a-form-item label="PIN码" required><a-input v-model:value="waiterForm.pinCode" /></a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model:visible="roomTypeVisible" title="添加房型" ok-text="确定" cancel-text="取消" :confirm-loading="saving" @ok="saveRoomType">
      <a-form layout="vertical">
        <a-form-item label="房型名称" required><a-input v-model:value="roomTypeForm.name" /></a-form-item>
        <a-form-item label="入住人数限制" required><a-input-number v-model:value="roomTypeForm.cup" :min="1" addon-after="人" style="width: 100%" /></a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model:visible="locationVisible" title="编辑位置" ok-text="确定" cancel-text="取消" :confirm-loading="saving" @ok="savePosition">
      <a-form layout="vertical"><a-form-item label="名称" required><a-input v-model:value="positionForm.name" /></a-form-item></a-form>
    </a-modal>

    <a-modal v-model:visible="bulkCreateVisible" title="批量创建房间" width="920px" ok-text="保存" cancel-text="取消" :confirm-loading="saving" @ok="saveBulkRooms">
      <a-alert type="info" show-icon message="每行创建一个房间，分机号需要逐行选择，房间号可手动填写。" />
      <a-table class="mt16" :columns="bulkRoomColumns" :data-source="bulkRoomRows" :pagination="false" row-key="key" size="small">
        <template #bodyCell="{ column, record, index }">
          <a-input v-if="column.key === 'room_number'" v-model:value="record.room_number" placeholder="房间号" />
          <a-select v-else-if="column.key === 'extension'" v-model:value="record.extension" show-search :filter-option="filterOption" style="width: 150px">
            <a-select-option v-for="item in userExtensions" :key="item.extension" :value="item.extension">{{ item.extension }}</a-select-option>
          </a-select>
          <a-select v-else-if="column.key === 'position_id'" v-model:value="record.position_id" style="width: 170px">
            <a-select-option v-for="item in flatPositions" :key="item.id" :value="item.id">{{ item.fullName }}</a-select-option>
          </a-select>
          <a-select v-else-if="column.key === 'room_type_id'" v-model:value="record.room_type_id" style="width: 130px">
            <a-select-option v-for="item in roomTypes" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
          </a-select>
          <a-select v-else-if="column.key === 'status'" v-model:value="record.status" style="width: 100px">
            <a-select-option :value="2">可用</a-select-option>
            <a-select-option :value="1">不可用</a-select-option>
          </a-select>
          <a-button v-else-if="column.key === 'action'" type="link" danger size="small" @click="bulkRoomRows.splice(index, 1)">删除</a-button>
        </template>
      </a-table>
      <a-button class="mt16" type="dashed" block @click="addBulkRoomRow"><PlusOutlined />新增一行</a-button>
    </a-modal>

    <a-modal v-model:visible="bulkEditVisible" title="批量编辑房间" ok-text="保存" cancel-text="取消" :confirm-loading="saving" @ok="saveBulkEditRooms">
      <a-form layout="vertical">
        <a-form-item label="位置">
          <a-select v-model:value="bulkEditForm.position_id" allow-clear placeholder="不修改">
            <a-select-option v-for="item in flatPositions" :key="item.id" :value="item.id">{{ item.fullName }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="房型">
          <a-select v-model:value="bulkEditForm.room_type_id" allow-clear placeholder="不修改">
            <a-select-option v-for="item in roomTypes" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="状态">
          <a-select v-model:value="bulkEditForm.status" allow-clear placeholder="不修改">
            <a-select-option :value="2">可用</a-select-option>
            <a-select-option :value="1">不可用</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import {
    BankOutlined,
    ClearOutlined,
    ClockCircleFilled,
    CodeOutlined,
    HomeOutlined,
    LeftOutlined,
    PhoneOutlined,
    PlusOutlined,
    ToolFilled,
  } from '@ant-design/icons-vue';
  import { defineComponent, h } from 'vue';
  import {
    addHotelPositionApi,
    addHotelRoomApi,
    addHotelRoomsBulkApi,
    addHotelRoomTypeApi,
    addHotelWaiterApi,
    deleteHotelPositionApi,
    deleteHotelRoomsApi,
    deleteHotelRoomTypeApi,
    deleteHotelWaiterApi,
    editHotelPositionApi,
    editHotelRoomApi,
    editHotelRoomsBulkApi,
    editHotelRoomTypeApi,
    editHotelWaiterApi,
    getHotelAdminRoomPageApi,
    getHotelCallRecordsApi,
    getHotelCheckinRecordsApi,
    getHotelOperationRecordsApi,
    getHotelPositionsApi,
    getHotelPositionBindApi,
    getHotelRoomListApi,
    getHotelRoomTypeBindApi,
    getHotelRoomTypesApi,
    getHotelServiceCodeApi,
    getHotelUserListApi,
    getHotelWaiterPageApi,
    saveHotelServiceCodeApi,
    setHotelRoomCheckStatusApi,
    setHotelRoomCleanStatusApi,
    setHotelRoomRepairStatusApi,
  } from '/@/api/extensionUser';
  import { useMessage } from '/@/hooks/useMessage';

  const router = useRouter();
  const route = useRoute();
  const { createMessage } = useMessage();
  const loading = ref(false);
  const saving = ref(false);
  const checkinVisible = ref(false);
  const detailVisible = ref(false);
  const accessVisible = ref(false);
  const waiterVisible = ref(false);
  const roomTypeVisible = ref(false);
  const locationVisible = ref(false);
  const bulkCreateVisible = ref(false);
  const bulkEditVisible = ref(false);
  const activeRoom = ref<any>(null);
  const pageKey = computed(() => String(route.meta.pageKey || 'check-in'));
  const isCreateRoom = computed(() => pageKey.value === 'create-room');
  const pageTitle = computed(() => String(route.meta.title || '酒店业务'));

  const makePagination = () => reactive({ total: 0, current: 1, pageSize: 10, showSizeChanger: true });
  const recordPagination = makePagination();
  const callPagination = makePagination();
  const waiterPagination = makePagination();
  const operationPagination = makePagination();
  const adminRoomPagination = makePagination();

  const RoomCard = defineComponent({
    props: { room: { type: Object, required: true } },
    emits: ['checkin', 'detail', 'repair', 'clean', 'check'],
    setup(props, { emit }) {
      return () => {
        const room: any = props.room;
        const occupied = room.vacant === 2 || room.statusName === 'occupied';
        return h('div', { class: ['room-card', occupied ? 'occupied' : room.status === 1 ? 'disabled' : 'free'] }, [
          h('div', { class: 'room-top' }, [
            h('strong', room.position || room.location || '-'),
            h('span', occupied ? '已入住' : room.status === 1 ? '不可用' : '未入住'),
          ]),
          h('div', room.room_number || room.name || '-'),
          h('p', room.extension || '-'),
          h('p', room.guest_name || room.guest || ' '),
          h('div', { class: 'room-icons' }, [
            h(ToolFilled, { class: ['room-status-icon', room.repair_status === 2 ? 'pending' : 'done'], title: '维修', onClick: () => emit('repair', room) }),
            h(ClearOutlined, { class: ['room-status-icon', room.clean_status === 2 ? 'pending' : 'done'], title: '清扫', onClick: () => emit('clean', room) }),
            h(ClockCircleFilled, { class: ['room-status-icon', Number(room.alarm_count || 0) > 0 ? 'failed' : 'pending'], title: '闹钟', onClick: () => emit('check', room) }),
          ]),
          h(
            'button',
            { class: ['room-action', occupied ? 'checkout' : 'checkin'], onClick: () => emit(occupied ? 'detail' : 'checkin', room) },
            occupied ? '详情' : '入住',
          ),
        ]);
      };
    },
  });

  const roomFilters = reactive({ kw: '', position: undefined as number | undefined, vacant: undefined as number | undefined, ifok: undefined as number | undefined, today: false });
  const recordFilters = reactive({ kw: '', range: [] as string[] });
  const callFilters = reactive({ condition: '', range: [] as string[] });
  const waiterFilters = reactive({ kw: '' });
  const operationFilters = reactive({ condition: '', range: [] as string[] });
  const adminRoomFilters = reactive({ kw: '', position_id: undefined as number | undefined, room_type_id: undefined as number | undefined, status: undefined as number | undefined });
  const checkInRooms = ref<any[]>([]);
  const records = ref<any[]>([]);
  const calls = ref<any[]>([]);
  const staffList = ref<any[]>([]);
  const serviceRecords = ref<any[]>([]);
  const adminRooms = ref<any[]>([]);
  const roomTypes = ref<any[]>([]);
  const positions = ref<any[]>([]);
  const userExtensions = ref<any[]>([]);
  const selectedWaiterIds = ref<number[]>([]);
  const selectedRoomIds = ref<number[]>([]);
  const selectedBuildingId = ref<number | undefined>();
  const serviceForm = reactive<any>({ accessNumber: '', serviceCodeSwitch: 'on', functionCodeSwitch: 'on', serviceCodeChildren: [], functionCodeChildren: [] });
  const serviceCodeRows = ref<any[]>([]);
  const waiterForm = reactive<any>({ id: undefined, name: '', pinCode: '' });
  const roomTypeForm = reactive<any>({ id: undefined, name: '', cup: 1 });
  const positionForm = reactive<any>({ id: undefined, name: '', pid: 0 });
  const roomForm = reactive<any>({ id: undefined, room_number: '', extension: undefined, position_id: undefined, room_type_id: undefined, status: 2 });
  const bulkEditForm = reactive<any>({ position_id: undefined, room_type_id: undefined, status: undefined });
  const bulkRoomRows = ref<any[]>([]);

  const selectedBuilding = computed(() => positions.value.find((item) => item.id === selectedBuildingId.value));
  const flatPositions = computed(() =>
    positions.value.flatMap((building) =>
      (building.children || []).map((floor) => ({ ...floor, fullName: `${building.name}-${floor.name}` })),
    ),
  );

  const recordColumns = [
    { title: '记录编号', dataIndex: 'id', key: 'id' },
    { title: '房间号', dataIndex: 'room_number', key: 'room_number' },
    { title: '入住时间', dataIndex: 'checkin_at', key: 'checkin_at' },
    { title: '退房时间', dataIndex: 'checkout_at', key: 'checkout_at' },
    { title: '住客姓名', dataIndex: 'guest_name', key: 'guest_name' },
    { title: '客户等级', dataIndex: 'level', key: 'level' },
    { title: '联系方式', dataIndex: 'phone', key: 'phone' },
  ];
  const callColumns = [
    { title: '通话开始时间', dataIndex: 'start_time', key: 'start_time' },
    { title: '房间号/房间分机', dataIndex: 'roomText', key: 'roomText' },
    { title: '住客姓名', dataIndex: 'guest_name', key: 'guest_name' },
    { title: '类型', dataIndex: 'cdrTypeName', key: 'type' },
    { title: '对方号码', dataIndex: 'destination_number', key: 'destination_number' },
    { title: '通话时长', dataIndex: 'durationText', key: 'durationText' },
    { title: '通话类型(权限)', dataIndex: 'area_call', key: 'area_call' },
  ];
  const serviceCodeColumns = [
    { title: '服务类型', dataIndex: 'typeLabel', key: 'typeLabel' },
    { title: '状态', dataIndex: 'statusLabel', key: 'statusLabel' },
    { title: '服务码', key: 'serviceCode' },
    { title: '功能码', key: 'functionCode' },
  ];
  const staffColumns = [
    { title: '服务员ID', dataIndex: 'id', key: 'id' },
    { title: '服务员', dataIndex: 'name', key: 'name' },
    { title: 'PIN码', dataIndex: 'pinCode', key: 'pinCode' },
    { title: '操作', key: 'action', width: 140 },
  ];
  const serviceRecordColumns = [
    { title: '时间', dataIndex: 'time', key: 'time' },
    { title: '房间号', dataIndex: 'room', key: 'room' },
    { title: '服务码', dataIndex: 'code', key: 'code' },
    { title: '服务员', dataIndex: 'staff', key: 'staff' },
    { title: '状态', dataIndex: 'status', key: 'status' },
  ];
  const roomColumns = [
    { title: '位置', dataIndex: 'position', key: 'position' },
    { title: '房间号', dataIndex: 'room_number', key: 'room_number' },
    { title: '房型', dataIndex: 'room_type', key: 'room_type' },
    { title: '分机号', dataIndex: 'extension', key: 'extension' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '操作', key: 'action', width: 140 },
  ];
  const bulkRoomColumns = [
    { title: '房间号', key: 'room_number' },
    { title: '分机号', key: 'extension' },
    { title: '位置', key: 'position_id' },
    { title: '房型', key: 'room_type_id' },
    { title: '状态', key: 'status' },
    { title: '操作', key: 'action', width: 80 },
  ];
  const locationColumns = [
    { title: '楼层名称', dataIndex: 'name', key: 'name' },
    { title: '操作', key: 'action', width: 160 },
  ];

  const serviceMeta = {
    '1-1': ['清扫服务', '干净'],
    '1-2': ['清扫服务', '待清扫'],
    '1-5': ['清扫服务', '检查'],
    '2-3': ['客房维修', '正常'],
    '2-4': ['客房维修', '待维修'],
  };
  const formatDuration = (value: string | number) => {
    const total = Number(value || 0);
    if (String(value || '').includes(':')) return String(value);
    return [Math.floor(total / 3600), Math.floor((total % 3600) / 60), total % 60].map((n) => String(n).padStart(2, '0')).join(':');
  };
  const directionText = (value: string) => ({ in: '呼入', out: '呼出' }[value] || value || '-');
  const dayStart = (date?: string) => (date ? `${date} 00:00:00` : undefined);
  const dayEnd = (date?: string) => (date ? `${date} 23:59:59` : undefined);
  const toEpoch = (date?: string, end = false) => date ? Math.floor(new Date(`${date}T${end ? '23:59:59' : '00:00:00'}`).getTime() / 1000) : undefined;
  const filterOption = (input: string, option: any) => String(option?.children || '').toLowerCase().includes(input.toLowerCase());

  const normalizePage = (res: any) => ({
    total: res?.total || 0,
    records: res?.records || res?.data || res?.list || [],
    pageNum: res?.pageNum || res?.page_num || res?.page || 1,
    pageSize: res?.pageSize || res?.page_size || 10,
  });

  const loadCheckInRooms = async () => {
    loading.value = true;
    try {
      checkInRooms.value = await getHotelRoomListApi({ ...roomFilters, page_num: 1, page_size: 60, kw_type: 1 }) || [];
    } finally {
      loading.value = false;
    }
  };
  const loadRecords = async () => {
    loading.value = true;
    try {
      const res = normalizePage(await getHotelCheckinRecordsApi({
        pageNum: recordPagination.current,
        pageSize: recordPagination.pageSize,
        kw: recordFilters.kw || undefined,
        from: dayStart(recordFilters.range?.[0]),
        to: dayEnd(recordFilters.range?.[1]),
      }));
      records.value = res.records;
      recordPagination.total = res.total;
    } finally {
      loading.value = false;
    }
  };
  const loadCalls = async () => {
    loading.value = true;
    try {
      const res = normalizePage(await getHotelCallRecordsApi({
        condition: callFilters.condition || null,
        pageNum: callPagination.current,
        pageSize: callPagination.pageSize,
        start_epoch_time: toEpoch(callFilters.range?.[0]),
        end_epoch_time: toEpoch(callFilters.range?.[1], true),
        type: 'Pms',
      }));
      calls.value = res.records.map((item) => ({
        ...item,
        roomText: `${item.room_number || '-'}/${item.extension || item.sip || '-'}`,
        durationText: formatDuration(item.duration),
      }));
      callPagination.total = res.total;
    } finally {
      loading.value = false;
    }
  };
  const loadServiceCode = async () => {
    loading.value = true;
    try {
      const res = await getHotelServiceCodeApi();
      Object.assign(serviceForm, res || {});
      serviceCodeRows.value = (res?.serviceCodeChildren || []).map((item) => {
        const fn = (res?.functionCodeChildren || []).find((row) => row.type === item.type && row.status === item.status);
        const meta = serviceMeta[`${item.type}-${item.status}`] || ['-', '-'];
        return { ...item, functionCode: fn?.functionCode || '', typeLabel: meta[0], statusLabel: meta[1], rowKey: `${item.type}-${item.status}` };
      });
    } finally {
      loading.value = false;
    }
  };
  const saveServiceCode = async () => {
    saving.value = true;
    try {
      await saveHotelServiceCodeApi({
        ...serviceForm,
        serviceCodeChildren: serviceCodeRows.value.map(({ type, status, code }) => ({ type, status, code })),
        functionCodeChildren: serviceCodeRows.value.map(({ type, status, functionCode }) => ({ type, status, functionCode })),
      });
      createMessage.success('保存成功');
      await loadServiceCode();
    } finally {
      saving.value = false;
    }
  };
  const loadWaiters = async () => {
    loading.value = true;
    try {
      const res = normalizePage(await getHotelWaiterPageApi({ kw: waiterFilters.kw, pageNum: waiterPagination.current, pageSize: waiterPagination.pageSize }));
      staffList.value = res.records;
      waiterPagination.total = res.total;
    } finally {
      loading.value = false;
    }
  };
  const loadOperationRecords = async () => {
    loading.value = true;
    try {
      const res = normalizePage(await getHotelOperationRecordsApi({
        condition: operationFilters.condition || null,
        pageNum: operationPagination.current,
        pageSize: operationPagination.pageSize,
        startTime: dayStart(operationFilters.range?.[0]),
        endTime: dayEnd(operationFilters.range?.[1]),
      }));
      serviceRecords.value = res.records;
      operationPagination.total = res.total;
    } finally {
      loading.value = false;
    }
  };
  const loadRoomTypes = async () => {
    const res = normalizePage(await getHotelRoomTypesApi());
    roomTypes.value = res.records;
  };
  const loadPositions = async () => {
    positions.value = await getHotelPositionsApi() || [];
    if (!selectedBuildingId.value && positions.value.length) selectedBuildingId.value = positions.value[0].id;
  };
  const loadAdminRooms = async () => {
    loading.value = true;
    try {
      const res = normalizePage(await getHotelAdminRoomPageApi({
        pageNum: adminRoomPagination.current,
        pageSize: adminRoomPagination.pageSize,
        kw: adminRoomFilters.kw || undefined,
        position_id: adminRoomFilters.position_id,
        room_type_id: adminRoomFilters.room_type_id,
        status: adminRoomFilters.status,
      }));
      adminRooms.value = res.records;
      adminRoomPagination.total = res.total;
    } finally {
      loading.value = false;
    }
  };
  const loadUserExtensions = async () => {
    const res = await getHotelUserListApi({ unbind: true, excludeXFS: true });
    userExtensions.value = res?.list || [];
  };

  const openCheckin = (room: any) => {
    activeRoom.value = room;
    checkinVisible.value = true;
  };
  const openDetail = (room: any) => {
    activeRoom.value = room;
    detailVisible.value = true;
  };
  const setRepair = async (room: any) => {
    await setHotelRoomRepairStatusApi({ id: room.id, repair_status: room.repair_status === 2 ? 1 : 2 });
    createMessage.success('维修状态已更新');
    loadCheckInRooms();
  };
  const setClean = async (room: any) => {
    await setHotelRoomCleanStatusApi({ id: room.id, clean_status: room.clean_status === 2 ? 1 : 2 });
    createMessage.success('清扫状态已更新');
    loadCheckInRooms();
  };
  const setCheck = async (room: any) => {
    await setHotelRoomCheckStatusApi({ id: room.id, check_status: room.check_status === 2 ? 1 : 2 });
    createMessage.success('检查状态已更新');
    loadCheckInRooms();
  };
  const openWaiter = (record?: any) => {
    Object.assign(waiterForm, record ? { id: record.id, name: record.name, pinCode: record.pinCode } : { id: undefined, name: '', pinCode: '' });
    waiterVisible.value = true;
  };
  const saveWaiter = async () => {
    if (!waiterForm.name || !waiterForm.pinCode) {
      createMessage.warning('请填写服务员和PIN码');
      return;
    }
    saving.value = true;
    try {
      if (waiterForm.id) await editHotelWaiterApi({ ...waiterForm });
      else await addHotelWaiterApi({ name: waiterForm.name, pinCode: waiterForm.pinCode });
      waiterVisible.value = false;
      createMessage.success('保存成功');
      loadWaiters();
    } finally {
      saving.value = false;
    }
  };
  const deleteWaiters = async (ids: number[]) => {
    await deleteHotelWaiterApi(ids);
    selectedWaiterIds.value = [];
    createMessage.success('删除成功');
    loadWaiters();
  };
  const openRoomType = (record?: any) => {
    Object.assign(roomTypeForm, record ? { id: record.id, name: record.name, cup: record.cup } : { id: undefined, name: '', cup: 1 });
    roomTypeVisible.value = true;
  };
  const saveRoomType = async () => {
    if (!roomTypeForm.name) {
      createMessage.warning('请填写房型名称');
      return;
    }
    saving.value = true;
    try {
      if (roomTypeForm.id) await editHotelRoomTypeApi({ ...roomTypeForm });
      else await addHotelRoomTypeApi({ name: roomTypeForm.name, cup: roomTypeForm.cup });
      roomTypeVisible.value = false;
      createMessage.success('保存成功');
      loadRoomTypes();
    } finally {
      saving.value = false;
    }
  };
  const deleteRoomType = async (id: number) => {
    const bindRooms = await getHotelRoomTypeBindApi([id]);
    if (Array.isArray(bindRooms) && bindRooms.length) {
      createMessage.warning('该房型已绑定房间，请先调整房间房型');
      return;
    }
    await deleteHotelRoomTypeApi(id);
    createMessage.success('删除成功');
    loadRoomTypes();
  };
  const openPosition = (pid: number, record?: any) => {
    Object.assign(positionForm, record ? { id: record.id, name: record.name, pid: record.pid } : { id: undefined, name: '', pid });
    locationVisible.value = true;
  };
  const savePosition = async () => {
    if (!positionForm.name) {
      createMessage.warning('请填写名称');
      return;
    }
    saving.value = true;
    try {
      if (positionForm.id) await editHotelPositionApi({ id: positionForm.id, name: positionForm.name });
      else await addHotelPositionApi({ name: positionForm.name, pid: positionForm.pid });
      locationVisible.value = false;
      createMessage.success('保存成功');
      loadPositions();
    } finally {
      saving.value = false;
    }
  };
  const deletePosition = async (id: number) => {
    const bindRooms = await getHotelPositionBindApi(id);
    if (Array.isArray(bindRooms) && bindRooms.length) {
      createMessage.warning('该位置已绑定房间，请先调整房间位置');
      return;
    }
    await deleteHotelPositionApi(id);
    if (selectedBuildingId.value === id) selectedBuildingId.value = undefined;
    createMessage.success('删除成功');
    loadPositions();
  };
  const openRoomForm = async (record?: any) => {
    await Promise.all([loadRoomTypes(), loadPositions(), loadUserExtensions()]);
    Object.assign(roomForm, record ? {
      id: record.id,
      room_number: record.room_number,
      extension: record.extension,
      position_id: record.position_id,
      room_type_id: record.room_type_id,
      status: record.status,
    } : { id: undefined, room_number: '', extension: undefined, position_id: undefined, room_type_id: undefined, status: 2 });
    router.push('/app/hotel/rooms/new');
  };
  const saveRoom = async () => {
    if (!roomForm.room_number || !roomForm.extension || !roomForm.position_id || !roomForm.room_type_id) {
      createMessage.warning('请填写完整房间信息');
      return;
    }
    saving.value = true;
    try {
      if (roomForm.id) await editHotelRoomApi({ ...roomForm });
      else await addHotelRoomApi({ ...roomForm });
      createMessage.success('保存成功');
      router.push('/app/hotel/rooms');
      loadAdminRooms();
    } finally {
      saving.value = false;
    }
  };
  const deleteRooms = async (ids: number[]) => {
    await deleteHotelRoomsApi(ids);
    selectedRoomIds.value = [];
    createMessage.success('删除成功');
    loadAdminRooms();
  };

  const addBulkRoomRow = () => {
    bulkRoomRows.value.push({
      key: Date.now() + Math.random(),
      room_number: '',
      extension: undefined,
      position_id: undefined,
      room_type_id: undefined,
      status: 2,
    });
  };
  const openBulkEdit = async () => {
    await Promise.all([loadRoomTypes(), loadPositions()]);
    Object.assign(bulkEditForm, { position_id: undefined, room_type_id: undefined, status: undefined });
    bulkEditVisible.value = true;
  };
  const saveBulkRooms = async () => {
    const rows = bulkRoomRows.value.filter((row) => row.room_number || row.extension || row.position_id || row.room_type_id);
    if (!rows.length) {
      createMessage.warning('请至少填写一行房间信息');
      return;
    }
    if (rows.some((row) => !row.room_number || !row.extension || !row.position_id || !row.room_type_id)) {
      createMessage.warning('请补全批量创建的房间号、分机号、位置和房型');
      return;
    }
    saving.value = true;
    try {
      await addHotelRoomsBulkApi(rows.map(({ room_number, extension, position_id, room_type_id, status }) => ({ room_number, extension, position_id, room_type_id, status })));
      createMessage.success('批量创建成功');
      bulkCreateVisible.value = false;
      bulkRoomRows.value = [];
      loadAdminRooms();
    } finally {
      saving.value = false;
    }
  };
  const saveBulkEditRooms = async () => {
    if (bulkEditForm.position_id == null && bulkEditForm.room_type_id == null && bulkEditForm.status == null) {
      createMessage.warning('请至少选择一个要修改的字段');
      return;
    }
    saving.value = true;
    try {
      await editHotelRoomsBulkApi({ ...bulkEditForm, ids: selectedRoomIds.value });
      createMessage.success('批量编辑成功');
      selectedRoomIds.value = [];
      bulkEditVisible.value = false;
      loadAdminRooms();
    } finally {
      saving.value = false;
    }
  };
  const handleWaiterSelect = (keys: number[]) => { selectedWaiterIds.value = keys; };
  const handleRoomSelect = (keys: number[]) => { selectedRoomIds.value = keys; };
  const handleRecordPage = (page: any) => { recordPagination.current = page.current; recordPagination.pageSize = page.pageSize; loadRecords(); };
  const handleCallPage = (page: any) => { callPagination.current = page.current; callPagination.pageSize = page.pageSize; loadCalls(); };
  const handleWaiterPage = (page: any) => { waiterPagination.current = page.current; waiterPagination.pageSize = page.pageSize; loadWaiters(); };
  const handleOperationPage = (page: any) => { operationPagination.current = page.current; operationPagination.pageSize = page.pageSize; loadOperationRecords(); };
  const handleAdminRoomPage = (page: any) => { adminRoomPagination.current = page.current; adminRoomPagination.pageSize = page.pageSize; loadAdminRooms(); };

  const loadPage = async () => {
    if (pageKey.value === 'check-in') await Promise.all([loadPositions(), loadCheckInRooms()]);
    if (pageKey.value === 'records') await loadRecords();
    if (pageKey.value === 'calls') await loadCalls();
    if (pageKey.value === 'service-codes') await loadServiceCode();
    if (pageKey.value === 'staff') await loadWaiters();
    if (pageKey.value === 'service-records') await loadOperationRecords();
    if (pageKey.value === 'rooms') await Promise.all([loadRoomTypes(), loadPositions(), loadAdminRooms(), loadUserExtensions()]);
    if (pageKey.value === 'create-room') await Promise.all([loadRoomTypes(), loadPositions(), loadUserExtensions()]);
    if (pageKey.value === 'room-types') await loadRoomTypes();
    if (pageKey.value === 'locations') await loadPositions();
  };

  watch(bulkCreateVisible, async (visible) => {
    if (!visible) return;
    await Promise.all([loadRoomTypes(), loadPositions(), loadUserExtensions()]);
    if (!bulkRoomRows.value.length) addBulkRoomRow();
  });

  watch(pageKey, loadPage, { immediate: true });
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
    width: 180px;
  }
  .date-range {
    width: 280px;
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
    &.occupied { background: #fffaf0; }
    &.disabled { background: #eeeeee; }
    p { margin: 8px 0 0; }
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
    cursor: pointer;
    &.done { color: #1677ff; }
    &.pending { color: #8c8c8c; }
    &.failed { color: #ff4d4f; }
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
    padding: 20px 24px 0;
    .ant-btn { margin-left: auto; }
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
  .building-item {
    justify-content: space-between;
  }
  .building-main {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
  }
  .building-actions {
    flex: 0 0 auto;
    opacity: 0;
    transition: opacity 0.15s;
    :deep(.ant-btn-link) {
      height: 22px;
      padding: 0 2px;
      font-size: 12px;
    }
  }
  .building-item:hover .building-actions,
  .building-item.active .building-actions {
    opacity: 1;
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
    min-height: 64px;
    padding: 0 18px;
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    background: #ffffff;
    cursor: pointer;
    &.add {
      display: flex;
      align-items: center;
      justify-content: center;
      border-style: dashed;
      color: #262626;
      font-weight: 500;
    }
  }
  .row-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: default;
  }
  .type-main {
    display: inline-flex;
    align-items: center;
    min-width: 0;
    gap: 8px;
    color: #262626;
    font-size: 14px;
    font-weight: 500;
  }
  .type-actions {
    flex: 0 0 auto;
    :deep(.ant-btn-link) {
      height: 24px;
      padding: 0 4px;
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
  .form-footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 16px;
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
