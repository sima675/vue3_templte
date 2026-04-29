<template>
  <div class="form_box">
    <a-form :model="formModel" :rules="rules" @finish="handleFinish">
      <div class="login-tabs">
        <button
          v-for="item in loginTypes"
          :key="item.value"
          type="button"
          :class="['login-tab', { active: formModel.loginType === item.value }]"
          @click="handleTypeChange(item.value)"
        >
          {{ item.label }}
        </button>
      </div>

      <p class="text">用户名</p>
      <a-form-item name="username">
        <a-input
          class="reset-input"
          v-model:value="formModel.username"
          :placeholder="accountPlaceholder"
        >
          <template #prefix>
            <Icon size="18px" type="shoujihaodenglu" class="icon" />
          </template>
        </a-input>
      </a-form-item>

      <p class="text">密码</p>
      <a-form-item name="password">
        <a-input
          class="reset-input"
          v-model:value="formModel.password"
          type="password"
          placeholder="请输入密码"
        >
          <template #prefix>
            <Icon size="18px" type="shurumimadenglu" class="icon" />
          </template>
        </a-input>
      </a-form-item>

      <div class="assist-row">
        <a-checkbox class="reset_checkbox" v-model:checked="checked">自动登录</a-checkbox>
        <a class="forgot-link">忘记密码?</a>
      </div>

      <a-form-item>
        <a-button html-type="submit" class="btn" :loading="loading">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from '/@/store/modules/user';

  type LoginType = 'admin' | 'personal';

  const userStore = useUserStore();
  const router = useRouter();

  const loading = ref(false);

  const state: any = reactive({
    otherQuery: {},
    redirect: undefined,
  });

  const route = useRoute();
  const getOtherQuery = (query: any) =>
    Object.keys(query).reduce((acc: any, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur];
      }
      return acc;
    }, {});

  watch(
    route,
    (route) => {
      const query = route.query;
      if (query) {
        state.redirect = query.redirect;
        state.otherQuery = getOtherQuery(query);
      }
    },
    { immediate: true },
  );

  const rules = {
    username: [{ required: true, trigger: 'blur', message: '请输入账号' }],
    password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
  };

  const loginTypes = [
    { label: '管理员账户登录', value: 'admin' },
    { label: '个人账户登录', value: 'personal' },
  ] as const;

  const checked = ref(true);
  const formModel = reactive({
    username: 'admin',
    password: '123456',
    loginType: 'admin' as LoginType,
  });

  const accountPlaceholder = computed(() =>
    formModel.loginType === 'personal' ? '请输入分机号' : '请输入管理员账号',
  );

  const handleTypeChange = (value: LoginType) => {
    formModel.loginType = value;
    formModel.username = value === 'personal' ? '1001' : 'admin';
    formModel.password = '123456';
  };

  const handleFinish = async () => {
    loading.value = true;
    const res = await userStore.login({ ...formModel });
    loading.value = false;
    if (res) {
      router.replace('/');
    }
  };
</script>

<style lang="less">
  .form_box {
    margin-top: 0;

    .login-tabs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-bottom: 22px;
      border-bottom: 1px solid #e8eef7;
    }

    .login-tab {
      height: 42px;
      padding: 0 8px;
      color: #7c8796;
      font-size: 14px;
      border: 0;
      border-bottom: 2px solid transparent;
      background: transparent;
      cursor: pointer;

      &.active {
        color: #1677ff;
        border-bottom-color: #1677ff;
        font-weight: 600;
      }
    }

    .btn {
      width: 100%;
      height: 38px;
      margin-top: 8px;
      color: #ffffff;
      font-size: 14px;
      border: none;
      border-radius: 4px;
      background: #1677ff;

      &:hover {
        border: none;
        background: #3088ff;
      }
    }

    .icon {
      color: #8d99aa;
    }

    .text {
      margin-bottom: 8px;
      color: #3f4b5f;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0;
    }

    .gray_text {
      color: #666666;
      font-size: 12px;
    }

    .reset_checkbox {
      .ant-checkbox-inner {
        border-radius: 50%;
      }

      & > span:last-child {
        color: #666666;
        font-size: 12px;
      }
    }

    .reset-input {
      height: 36px;
      line-height: 36px;
      border: 1px solid #dfe6f1;
      border-radius: 4px;
    }

    .assist-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: -2px 0 12px;
    }

    .forgot-link {
      color: #1677ff;
      font-size: 12px;
    }
  }
</style>
