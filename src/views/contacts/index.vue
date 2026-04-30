<template>
  <div class="contacts-page">
    <div class="contacts-header">
      <div>
        <h2>通讯录</h2>
        <a-tabs :activeKey="activeTab" @change="handleTabChange">
          <a-tab-pane key="favorites" :tab="`常用联系人(${contacts.favorites.length})`" />
          <a-tab-pane key="personal" :tab="`个人通讯录(${contacts.personal.length})`" />
          <a-tab-pane key="public" :tab="`公共通讯录(${contacts.public.length})`" />
        </a-tabs>
      </div>

      <a-space>
        <a-input-search
          v-model:value="keyword"
          class="search-input"
          placeholder="姓名/号码"
          allow-clear
          @search="loadContacts"
        />
        <template v-if="activeTab === 'personal'">
          <a-button type="primary" @click="router.push('/app/contacts/new')">新增</a-button>
          <a-dropdown>
            <template #overlay>
              <a-menu @click="handleMoreAction">
                <a-menu-item key="import">导入</a-menu-item>
                <a-menu-item key="template">下载导入模板</a-menu-item>
                <a-menu-item key="export">导出</a-menu-item>
                <a-menu-item key="delete">删除</a-menu-item>
                <a-menu-item key="group">变更分组</a-menu-item>
              </a-menu>
            </template>
            <a-button>
              更多
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </template>
      </a-space>
    </div>

    <div :class="['contacts-body', { 'with-groups': hasGroupPanel }]">
      <aside v-if="hasGroupPanel" class="group-panel">
        <div
          v-for="group in currentGroups"
          :key="group.key"
          :class="['group-item', { active: selectedGroup === group.key }]"
          @click="handleGroupChange(group.key)"
        >
          <span>{{ group.name }}</span>
          <a-dropdown v-if="activeTab === 'personal' && group.key !== 'all'" @click.stop>
            <MoreOutlined />
            <template #overlay>
              <a-menu @click="(event) => handleGroupAction(group.key, String(event.key))">
                <a-menu-item key="edit">编辑</a-menu-item>
                <a-menu-item key="delete">删除</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
        <a-button v-if="activeTab === 'personal'" class="new-group-btn" @click="openCreateGroup">新建分组</a-button>
      </aside>

      <section class="contact-list">
        <div class="list-title">
          <strong>{{ currentTitle }}</strong>
          <span>联系人 {{ currentContacts.length }}</span>
        </div>
        <a-checkbox
          v-if="activeTab === 'personal'"
          class="check-all"
          :checked="isAllChecked"
          @change="handleCheckAll"
        >
          全选
        </a-checkbox>

        <a-spin :spinning="loading">
        <div class="cards-grid">
          <a-card
            v-for="contact in currentContacts"
            :key="contact.id"
            class="contact-card"
            :body-style="{ padding: '18px 18px 12px' }"
            hoverable
          >
            <template v-if="activeTab === 'personal'" #extra>
              <a-checkbox
                :checked="selectedIds.includes(contact.id)"
                @change="handleCheckContact(contact.id, $event.target.checked)"
              />
            </template>
            <div class="contact-main">
              <a-avatar :size="48" class="avatar">{{ contact.avatar }}</a-avatar>
              <div>
                <div class="name">{{ contact.name }}</div>
                <div class="phone">{{ contact.phone }}</div>
              </div>
            </div>
            <div class="card-actions">
              <a-tooltip title="呼叫">
                <a-button type="link" size="small" @click="handleCall(contact)"><PhoneOutlined /></a-button>
              </a-tooltip>
              <a-tooltip title="收藏">
                <a-button type="link" size="small" @click="handleToggleFavorite(contact)">
                  <StarFilled v-if="contact.raw?.isCollect" />
                  <StarOutlined v-else />
                </a-button>
              </a-tooltip>
              <template v-if="activeTab === 'personal'">
                <a-tooltip title="编辑">
                  <a-button type="link" size="small" @click="handleEdit(contact)"><EditOutlined /></a-button>
                </a-tooltip>
                <a-tooltip title="删除">
                  <a-button type="link" size="small" danger @click="handleDelete(contact.id)"><DeleteOutlined /></a-button>
                </a-tooltip>
              </template>
            </div>
          </a-card>
        </div>
        </a-spin>
      </section>

      <div v-if="activeTab !== 'personal'" class="alpha-index">
        <span v-for="item in alphaList" :key="item">{{ item }}</span>
      </div>
    </div>

    <a-modal
      v-model:visible="groupVisible"
      :title="groupModalTitle"
      ok-text="确定"
      cancel-text="取消"
      @ok="handleSaveGroup"
    >
      <a-input v-model:value="newGroupName" placeholder="请输入分组名称" />
    </a-modal>

    <a-modal
      v-model:visible="importVisible"
      title="导入联系人"
      ok-text="导入"
      cancel-text="取消"
      :confirm-loading="importing"
      @ok="handleImportContacts"
    >
      <a-alert
        type="info"
        show-icon
        message="支持 CSV 文本导入，字段顺序与模板一致。"
        class="modal-alert"
      />
      <a-space class="import-actions">
        <a-upload accept=".csv,text/csv" :show-upload-list="false" :before-upload="handleImportFile">
          <a-button><UploadOutlined />选择 CSV 文件</a-button>
        </a-upload>
        <a-button @click="downloadImportTemplate">下载模板</a-button>
      </a-space>
      <a-textarea
        v-model:value="importText"
        :rows="8"
        placeholder="姓氏,名字,性别,手机号码,办公号码,分组,组织,部门,职位,邮箱,备用手机,家庭号码,传真号码,地址,备注"
      />
    </a-modal>

    <a-modal
      v-model:visible="deleteModeVisible"
      title="删除联系人"
      ok-text="确定"
      cancel-text="取消"
      @ok="handleConfirmDelete"
    >
      <a-radio-group v-model:value="deleteMode">
        <a-space direction="vertical">
          <a-radio v-if="canRemoveFromCurrentGroup" value="removeGroup">仅从当前分组移除</a-radio>
          <a-radio value="delete">删除联系人</a-radio>
        </a-space>
      </a-radio-group>
    </a-modal>

    <a-modal
      v-model:visible="changeGroupVisible"
      title="变更分组"
      ok-text="确定"
      cancel-text="取消"
      @ok="handleChangeGroups"
    >
      <a-select v-model:value="targetGroups" mode="multiple" class="group-select" placeholder="请选择分组">
        <a-select-option
          v-for="group in groups.personal.filter((item) => item.key !== 'all')"
          :key="group.key"
          :value="group.key"
        >
          {{ group.name }}
        </a-select-option>
      </a-select>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import {
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    MoreOutlined,
    PhoneOutlined,
    StarFilled,
    StarOutlined,
    UploadOutlined,
  } from '@ant-design/icons-vue';
  import {
    addFrequentContactApi,
    changeAddressBookContactGroupsApi,
    deleteAddressBookContactsApi,
    deleteFrequentContactApi,
    exportAddressBookContactsApi,
    getAddressBookContactsApi,
    getAddressBookGroupsApi,
    getCallContactShowApi,
    getExternalAddressBookGroupsApi,
    getFrequentContactsApi,
    getPublicContactsApi,
    importAddressBookContactsApi,
    saveAddressBookGroupsApi,
  } from '/@/api/extensionUser';
  import { useMessage } from '/@/hooks/useMessage';

  type TabKey = 'favorites' | 'personal' | 'public';
  type ContactCard = {
    id: string;
    avatar: string;
    name: string;
    phone: string;
    raw?: any;
  };

  const router = useRouter();
  const route = useRoute();
  const { createMessage, createConfirm } = useMessage();
  const selectedGroup = ref('all');
  const keyword = ref('');
  const loading = ref(false);
  const groupVisible = ref(false);
  const importVisible = ref(false);
  const importing = ref(false);
  const changeGroupVisible = ref(false);
  const deleteModeVisible = ref(false);
  const newGroupName = ref('');
  const groupModalMode = ref<'create' | 'edit'>('create');
  const editingGroupKey = ref('');
  const importText = ref('');
  const selectedIds = ref<string[]>([]);
  const targetGroups = ref<string[]>([]);
  const pendingDeleteIds = ref<string[]>([]);
  const deleteMode = ref<'removeGroup' | 'delete'>('delete');

  const tabRoutes: Record<TabKey, string> = {
    favorites: '/app/contacts/favorites',
    personal: '/app/contacts/personal',
    public: '/app/contacts/public',
  };

  const activeTab = computed<TabKey>(() => {
    if (route.path.includes('/personal')) return 'personal';
    if (route.path.includes('/public')) return 'public';
    return 'favorites';
  });

  const groups = reactive<Record<'personal' | 'public', Array<{ key: string; name: string }>>>({
    personal: [{ key: 'all', name: '所有联系人' }],
    public: [{ key: 'all', name: '公共通讯录' }],
  });

  const contacts = reactive<Record<TabKey, ContactCard[]>>({
    favorites: [],
    personal: [],
    public: [],
  });

  const getContactName = (contact: any) =>
    `${contact.lastName || ''}${contact.firstName || ''}` || contact.callerName || contact.extensionNo || contact.phoneNumber;

  const toContactCard = (contact: any): ContactCard => {
    const name = getContactName(contact);
    return {
      id: contact.id,
      avatar: name.slice(0, 2) || contact.extensionNo.slice(-2) || '联',
      name,
      phone: contact.phoneNumber || contact.officePhoneNumber || contact.extensionNo || '-',
      raw: contact,
    };
  };

  const setList = (key: TabKey, list: any[] | null | undefined) => {
    contacts[key] = (list || []).map(toContactCard);
  };

  const hasGroupPanel = computed(() => activeTab.value !== 'favorites');
  const currentGroups = computed(() =>
    activeTab.value === 'public' ? groups.public : groups.personal,
  );
  const currentContacts = computed(() => contacts[activeTab.value]);
  const isAllChecked = computed(
    () => currentContacts.value.length > 0 && currentContacts.value.every((item) => selectedIds.value.includes(item.id)),
  );
  const groupModalTitle = computed(() => (groupModalMode.value === 'edit' ? '编辑分组' : '新建分组'));
  const canRemoveFromCurrentGroup = computed(
    () => activeTab.value === 'personal' && selectedGroup.value !== 'all',
  );
  const currentTitle = computed(() => {
    const titleMap = {
      favorites: '常用联系人',
      personal: currentGroups.value.find((item) => item.key === selectedGroup.value)?.name || '所有联系人',
      public: currentGroups.value.find((item) => item.key === selectedGroup.value)?.name || 'UC350',
    };
    return titleMap[activeTab.value];
  });
  const alphaList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');

  const handleTabChange = (key: string) => {
    selectedGroup.value = 'all';
    selectedIds.value = [];
    router.push(tabRoutes[key as TabKey]);
  };

  const handleGroupChange = (key: string) => {
    selectedGroup.value = key;
    selectedIds.value = [];
    loadContacts();
  };

  const loadGroups = async () => {
    const [personalGroups, publicGroups] = await Promise.all([
      getAddressBookGroupsApi(),
      getExternalAddressBookGroupsApi(),
    ]);

    groups.personal = [
      { key: 'all', name: '所有联系人' },
      ...(personalGroups || []).map((name) => ({ key: name, name })),
    ];
    groups.public = [
      { key: 'all', name: '公共通讯录' },
      ...(publicGroups || []).map((name) => ({ key: name, name })),
    ];
  };

  const loadContacts = async () => {
    loading.value = true;
    try {
      if (activeTab.value === 'personal') {
        const list = await getAddressBookContactsApi({
          groups: selectedGroup.value === 'all' ? null : selectedGroup.value,
          condition: keyword.value || null,
        });
        setList('personal', list);
      } else if (activeTab.value === 'public') {
        const list = await getPublicContactsApi({
          groups: selectedGroup.value === 'all' ? null : [selectedGroup.value],
          condition: keyword.value || null,
          enable: '1',
        });
        setList('public', list);
      } else {
        const list = await getFrequentContactsApi();
        contacts.favorites = ((list as any[] | undefined) || []).map(toContactCard);
      }
    } finally {
      loading.value = false;
    }
  };

  const getPersonalGroupNames = () =>
    groups.personal.filter((item) => item.key !== 'all').map((item) => item.name);

  const openCreateGroup = () => {
    groupModalMode.value = 'create';
    editingGroupKey.value = '';
    newGroupName.value = '';
    groupVisible.value = true;
  };

  const openEditGroup = (groupKey: string) => {
    groupModalMode.value = 'edit';
    editingGroupKey.value = groupKey;
    newGroupName.value = groupKey;
    groupVisible.value = true;
  };

  const saveGroups = async (groupNames: string[]) => {
    await saveAddressBookGroupsApi(Array.from(new Set(groupNames.filter(Boolean))));
    await loadGroups();
  };

  const handleCheckAll = (event: any) => {
    selectedIds.value = event.target.checked ? currentContacts.value.map((item) => item.id) : [];
  };

  const handleCheckContact = (id: string, checked: boolean) => {
    selectedIds.value = checked
      ? Array.from(new Set([...selectedIds.value, id]))
      : selectedIds.value.filter((item) => item !== id);
  };

  const handleSaveGroup = async () => {
    const name = newGroupName.value.trim();
    if (!name) return;
    const current = getPersonalGroupNames();
    if (groupModalMode.value === 'edit') {
      if (name !== editingGroupKey.value && current.includes(name)) {
        createMessage.warning('分组名称已存在');
        return;
      }
      const nextGroups = current.map((item) => (item === editingGroupKey.value ? name : item));
      const list = await getAddressBookContactsApi({ groups: editingGroupKey.value, condition: null });
      await saveGroups(nextGroups);
      const changeRows = ((list as any[]) || []).map((contact) => ({
        id: [contact.id],
        groups: (contact.groups || []).map((group) => (group === editingGroupKey.value ? name : group)),
      }));
      if (changeRows.length) {
        await changeAddressBookContactGroupsApi(changeRows);
      }
      if (selectedGroup.value === editingGroupKey.value) {
        selectedGroup.value = name;
      }
    } else {
      if (current.includes(name)) {
        createMessage.warning('分组名称已存在');
        return;
      }
      await saveGroups([...current, name]);
    }
    newGroupName.value = '';
    groupVisible.value = false;
    await loadContacts();
  };

  const handleGroupAction = (groupKey: string, key: string) => {
    if (key === 'edit') {
      openEditGroup(groupKey);
      return;
    }
    createConfirm({
      iconType: 'warning',
      title: '删除分组？',
      content: '删除分组后，联系人会从该分组中移除，但联系人不会被删除。',
      onOk: async () => {
        const nextGroups = getPersonalGroupNames().filter((item) => item !== groupKey);
        await saveGroups(nextGroups);
        if (selectedGroup.value === groupKey) {
          selectedGroup.value = 'all';
        }
        await loadContacts();
        createMessage.success('分组已删除');
      },
    });
  };

  const handleDelete = async (id: string) => {
    openDeleteMode([id]);
  };

  const handleBatchDelete = async () => {
    if (!selectedIds.value.length) {
      createMessage.warning('请选择联系人');
      return;
    }
    openDeleteMode(selectedIds.value);
  };

  const openDeleteMode = (ids: string[]) => {
    pendingDeleteIds.value = ids;
    if (canRemoveFromCurrentGroup.value) {
      deleteMode.value = 'removeGroup';
      deleteModeVisible.value = true;
      return;
    }
    createConfirm({
      iconType: 'warning',
      title: '删除联系人？',
      content: '删除后联系人将从个人通讯录移除。',
      onOk: () => deleteContacts(ids),
    });
  };

  const deleteContacts = async (ids: string[]) => {
    await deleteAddressBookContactsApi(ids);
    createMessage.success('删除成功');
    selectedIds.value = [];
    await loadContacts();
  };

  const removeContactsFromCurrentGroup = async (ids: string[]) => {
    const list = await getAddressBookContactsApi({ groups: selectedGroup.value, condition: null });
    const rows = ((list as any[]) || [])
      .filter((contact) => ids.includes(contact.id))
      .map((contact) => ({
        id: [contact.id],
        groups: (contact.groups || []).filter((group) => group !== selectedGroup.value),
      }));
    if (rows.length) {
      await changeAddressBookContactGroupsApi(rows);
    }
    createMessage.success('已从当前分组移除');
    selectedIds.value = [];
    await loadContacts();
  };

  const handleConfirmDelete = async () => {
    if (deleteMode.value === 'removeGroup') {
      await removeContactsFromCurrentGroup(pendingDeleteIds.value);
    } else {
      await deleteContacts(pendingDeleteIds.value);
    }
    deleteModeVisible.value = false;
    pendingDeleteIds.value = [];
  };

  const handleMoreAction = ({ key }: { key: string }) => {
    if (key === 'import') {
      importText.value = '';
      importVisible.value = true;
      return;
    }
    if (key === 'template') {
      downloadImportTemplate();
      return;
    }
    if (key === 'export') {
      handleExportContacts();
      return;
    }
    if (key === 'delete') {
      handleBatchDelete();
      return;
    }
    if (key === 'group') {
      if (!selectedIds.value.length) {
        createMessage.warning('请选择联系人');
        return;
      }
      targetGroups.value = [];
      changeGroupVisible.value = true;
    }
  };

  const handleChangeGroups = async () => {
    await changeAddressBookContactGroupsApi([
      {
        id: selectedIds.value,
        groups: targetGroups.value,
      },
    ]);
    createMessage.success('变更成功');
    changeGroupVisible.value = false;
    selectedIds.value = [];
    await loadContacts();
  };

  const csvHeader = '姓氏,名字,性别,手机号码,办公号码,分组,组织,部门,职位,邮箱,备用手机,家庭号码,传真号码,地址,备注';

  const downloadTextFile = (fileName: string, content: string) => {
    const blob = new Blob([`\uFEFF${content}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadImportTemplate = () => {
    downloadTextFile('contacts-template.csv', `${csvHeader}\n张,三,male,13800000000,8000,test,公司,部门,职位,test@example.com,,,,地址,备注`);
  };

  const parseCsvLine = (line: string) => line.split(',').map((item) => item.trim());

  const parseImportContacts = () =>
    importText.value
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .filter((line) => !line.startsWith('姓氏,名字'))
      .map((line) => {
        const [
          lastName,
          firstName,
          gender,
          phoneNumber,
          officePhoneNumber,
          groupText,
          organization,
          department,
          position,
          mailbox,
          alternatePhoneNumber,
          fixedPhoneNumber,
          faxPhoneNumber,
          address,
          remarks,
        ] = parseCsvLine(line);
        return {
          lastName,
          firstName,
          gender: gender || null,
          phoneNumber: phoneNumber || null,
          officePhoneNumber: officePhoneNumber || null,
          groups: groupText ? groupText.split(/[\/;；]/).map((item) => item.trim()).filter(Boolean) : [],
          organization: organization || null,
          department: department || null,
          position: position || null,
          mailbox: mailbox || null,
          alternatePhoneNumber: alternatePhoneNumber || null,
          fixedPhoneNumber: fixedPhoneNumber || null,
          faxPhoneNumber: faxPhoneNumber || null,
          address: address || null,
          remarks: remarks || null,
        };
      })
      .filter((item) => item.lastName && item.firstName && (item.phoneNumber || item.officePhoneNumber));

  const handleImportFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      importText.value = String(reader.result || '');
    };
    reader.readAsText(file, 'utf-8');
    return false;
  };

  const handleImportContacts = async () => {
    const rows = parseImportContacts();
    if (!rows.length) {
      createMessage.warning('没有可导入的联系人，请检查模板内容');
      return;
    }
    importing.value = true;
    try {
      await importAddressBookContactsApi({ contacts: rows });
      createMessage.success(`导入成功：${rows.length} 条`);
      importVisible.value = false;
      importText.value = '';
      await loadGroups();
      await loadContacts();
    } finally {
      importing.value = false;
    }
  };

  const handleExportContacts = async () => {
    const res = await exportAddressBookContactsApi({
      id: selectedIds.value,
      groups: selectedGroup.value === 'all' ? null : selectedGroup.value,
      condition: keyword.value || null,
    });
    const content = `${csvHeader}\n${(res as any)?.content || ''}`;
    downloadTextFile((res as any)?.fileName || 'contacts.csv', content);
    createMessage.success('导出成功');
  };

  const handleCall = async (contact: ContactCard) => {
    const number = contact.phone === '-' ? contact.raw?.extensionNo : contact.phone;
    await getCallContactShowApi({
      condition: number,
      fuzzyQuery: 'off',
      type: contact.raw?.extensionNo ? 'internal' : 'external',
    });
    createMessage.info(`已拉起拨号：${number}`);
  };

  const handleToggleFavorite = async (contact: ContactCard) => {
    if (contact.raw?.isCollect) {
      await deleteFrequentContactApi(contact.raw.frequentContactId);
      createMessage.success('已取消收藏');
    } else {
      await addFrequentContactApi({
        uuid: contact.id,
        type: 0,
        name: contact.name,
        company: contact.raw?.department || contact.raw?.organization || '',
        mobile: contact.raw?.phoneNumber || contact.raw?.officePhoneNumber || '',
        photo: contact.raw?.photo || '',
      });
      createMessage.success('已添加至常用联系人');
    }
    await loadContacts();
  };

  const handleEdit = (contact: ContactCard) => {
    router.push({
      path: '/app/contacts/new',
      query: { id: contact.id },
    });
  };

  watch(
    () => activeTab.value,
    () => {
      selectedGroup.value = 'all';
      selectedIds.value = [];
      loadContacts();
    },
  );

  onMounted(async () => {
    await loadGroups();
    await loadContacts();
  });
</script>

<style lang="less" scoped>
  .contacts-page {
    min-height: calc(100vh - 128px);
    background: #ffffff;
  }

  .contacts-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    border-bottom: 1px solid #f0f0f0;

    h2 {
      margin: 0 0 10px;
      font-size: 20px;
      font-weight: 600;
    }

    :deep(.ant-tabs-nav) {
      margin-bottom: 0;
    }
  }

  .search-input {
    width: 260px;
  }

  .contacts-body {
    position: relative;
    min-height: 620px;

    &.with-groups {
      display: grid;
      grid-template-columns: 180px 1fr;
    }
  }

  .group-panel {
    position: relative;
    padding: 20px 16px;
    border-right: 1px solid #f0f0f0;
  }

  .group-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 36px;
    padding: 0 12px;
    margin-bottom: 6px;
    border-radius: 4px;
    cursor: pointer;

    &.active {
      color: #1677ff;
      background: #e8f6ff;
    }
  }

  .new-group-btn {
    position: absolute;
    right: 16px;
    bottom: 16px;
    left: 16px;
  }

  .group-select {
    width: 100%;
  }

  .modal-alert,
  .import-actions {
    margin-bottom: 12px;
  }

  .contact-list {
    padding: 22px 24px;
  }

  .list-title {
    display: flex;
    align-items: baseline;
    gap: 12px;
    justify-content: flex-start;
    margin-bottom: 14px;

    span {
      color: #8c8c8c;
      font-size: 13px;
    }
  }

  .check-all {
    margin-bottom: 14px;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
  }

  .contact-card {
    border-radius: 6px;
  }

  .contact-main {
    display: flex;
    align-items: center;
    gap: 14px;
    min-height: 54px;
  }

  .avatar {
    color: #1677ff;
    background: #e8f4ff;
  }

  .name {
    color: #262626;
    font-weight: 600;
  }

  .phone {
    margin-top: 4px;
    color: #8c8c8c;
    font-size: 13px;
  }

  .card-actions {
    display: flex;
    justify-content: space-around;
    padding-top: 12px;
    margin-top: 12px;
    border-top: 1px solid #f0f0f0;
  }

  .alpha-index {
    position: absolute;
    top: 36px;
    right: 2px;
    display: grid;
    gap: 3px;
    color: #bfbfbf;
    font-size: 12px;
    text-align: center;
  }
</style>
