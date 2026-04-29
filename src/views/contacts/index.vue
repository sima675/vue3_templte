<template>
  <div class="contacts-page">
    <div class="contacts-header">
      <div>
        <h2>通讯录</h2>
        <a-tabs :activeKey="activeTab" @change="handleTabChange">
          <a-tab-pane key="favorites" tab="常用联系人(6)" />
          <a-tab-pane key="personal" tab="个人通讯录(2)" />
          <a-tab-pane key="public" tab="公共通讯录(23)" />
        </a-tabs>
      </div>

      <a-space>
        <a-input-search class="search-input" placeholder="姓名/号码" allow-clear />
        <template v-if="activeTab === 'personal'">
          <a-button type="primary" @click="router.push('/app/contacts/new')">新增</a-button>
          <a-dropdown>
            <template #overlay>
              <a-menu>
                <a-menu-item key="import">导入</a-menu-item>
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
          @click="selectedGroup = group.key"
        >
          <span>{{ group.name }}</span>
          <MoreOutlined v-if="activeTab === 'personal'" />
        </div>
        <a-button v-if="activeTab === 'personal'" class="new-group-btn">新建分组</a-button>
      </aside>

      <section class="contact-list">
        <div class="list-title">
          <strong>{{ currentTitle }}</strong>
          <span>联系人 {{ currentContacts.length }}</span>
        </div>
        <a-checkbox v-if="activeTab === 'personal'" class="check-all">全选</a-checkbox>

        <div class="cards-grid">
          <a-card
            v-for="contact in currentContacts"
            :key="contact.id"
            class="contact-card"
            :body-style="{ padding: '18px 18px 12px' }"
            hoverable
          >
            <template v-if="activeTab === 'personal'" #extra>
              <a-checkbox />
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
                <a-button type="link" size="small"><PhoneOutlined /></a-button>
              </a-tooltip>
              <a-tooltip title="收藏">
                <a-button type="link" size="small"><StarOutlined /></a-button>
              </a-tooltip>
              <template v-if="activeTab === 'personal'">
                <a-tooltip title="编辑">
                  <a-button type="link" size="small"><EditOutlined /></a-button>
                </a-tooltip>
                <a-tooltip title="删除">
                  <a-button type="link" size="small" danger><DeleteOutlined /></a-button>
                </a-tooltip>
              </template>
            </div>
          </a-card>
        </div>
      </section>

      <div v-if="activeTab !== 'personal'" class="alpha-index">
        <span v-for="item in alphaList" :key="item">{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    MoreOutlined,
    PhoneOutlined,
    StarOutlined,
  } from '@ant-design/icons-vue';

  type TabKey = 'favorites' | 'personal' | 'public';

  const router = useRouter();
  const route = useRoute();
  const selectedGroup = ref('all');

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

  const groups = {
    personal: [
      { key: 'all', name: '所有联系人' },
      { key: 'family', name: '家人' },
      { key: 'client', name: '客户' },
    ],
    public: [
      { key: 'all', name: 'UC350' },
      { key: 'aa', name: 'aa' },
      { key: 'public', name: '公共群组' },
    ],
  };

  const contacts = {
    favorites: [
      { id: 1, avatar: 'b', name: 'a b', phone: '123333' },
      { id: 2, avatar: '方', name: '李东方', phone: '12455555' },
      { id: 3, avatar: '47', name: '2147', phone: '2147' },
      { id: 4, avatar: '50', name: '2150', phone: '2150' },
      { id: 5, avatar: '51', name: '2151', phone: '2151' },
      { id: 6, avatar: '48', name: '2148', phone: '2148' },
    ],
    personal: [
      { id: 11, avatar: '方', name: '李东方', phone: '12455555' },
      { id: 12, avatar: 'b', name: 'aa bb', phone: '7898' },
    ],
    public: [
      { id: 21, avatar: '47', name: '2147', phone: '2147' },
      { id: 22, avatar: '48', name: '2148', phone: '2148' },
      { id: 23, avatar: '49', name: '2149', phone: '2149' },
      { id: 24, avatar: '50', name: '2150', phone: '2150' },
      { id: 25, avatar: '51', name: '2151', phone: '2151' },
      { id: 26, avatar: '52', name: '2152', phone: '2152' },
      { id: 27, avatar: '53', name: '2153', phone: '2153' },
      { id: 28, avatar: '54', name: '2154', phone: '2154' },
      { id: 29, avatar: '55', name: '2155', phone: '2155' },
      { id: 30, avatar: '56', name: '2156', phone: '2156' },
      { id: 31, avatar: '57', name: '2157', phone: '2157' },
      { id: 32, avatar: '58', name: '2158', phone: '2158' },
    ],
  };

  const hasGroupPanel = computed(() => activeTab.value !== 'favorites');
  const currentGroups = computed(() =>
    activeTab.value === 'public' ? groups.public : groups.personal,
  );
  const currentContacts = computed(() => contacts[activeTab.value]);
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
    router.push(tabRoutes[key as TabKey]);
  };
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
