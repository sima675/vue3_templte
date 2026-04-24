<template>
  <div class="node-conatiner">
    <h2 class="nc_title font18">筛选列表</h2>
    <Alert
      type="info"
      message="这个页面保留筛选项、查询按钮、操作列和弹窗表单，适合作为 CRUD 页起点。"
    />
    <Table
      ref="ELRef"
      :url="fetchApi.node_list"
      :columns="columns"
      :items="tableFilterItems"
      :button="tableFilterButton"
      :actions="tableActions"
      :model="tableFilterModel"
    />
    <Modal v-bind="modalState" @cancel="handleCancel" @ok="handleSubmit">
      <a-form
        ref="FormRef"
        :model="formModel"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="姓名:" name="name">
          <a-input v-model:value="formModel.name" placeholder="请输入姓名" />
        </a-form-item>
        <a-form-item label="角色:" name="role_id">
          <a-select
            v-model:value="formModel.role_id"
            :options="roleOptions"
            placeholder="请选择角色"
          />
        </a-form-item>
      </a-form>
    </Modal>
  </div>
</template>
<script setup lang="ts">
  import { columns } from './constant';
  import fetchApi from '/@/api/common';
  import { useMessage } from '/@/hooks/useMessage';
  import type { FormInstance } from 'ant-design-vue';
  import type { Rule } from 'ant-design-vue/es/form';

  const mockReq = (params?: any): Promise<Boolean> =>
    new Promise((resolve) => setTimeout(() => resolve(params ? !!params : true), 500));

  const { createMessage } = useMessage();
  const FormRef = ref<FormInstance>();
  const ELRef = ref<{ refresh: () => void }>();
  const refresh = () => ELRef.value?.refresh();

  const labelCol = { style: { width: '110px' } };
  const wrapperCol = { span: 17 };

  const roleOptions = computed(() => [
    { label: '管理员', value: 1 },
    { label: '普通', value: 2 },
  ]);
  // modal
  const modalState = reactive({
    loading: false,
    visible: false,
    title: '新增成员',
    okText: '创建',
  });

  // form
  const rules: Record<string, Rule[]> = {
    name: [{ required: true, trigger: 'blur', message: '请输入姓名' }],
    role_id: [
      {
        required: true,
        trigger: 'change',
        validator: (_, val) => (val ? Promise.resolve() : Promise.reject('请选择角色')),
      },
    ],
  };
  const formModel = ref({
    name: '',
    role_id: undefined,
  });

  const tableActions = reactive([
    {
      label: '编辑',
      onClick: async (row) => {
        modalState.title = '修改成员';
        modalState.okText = '更新';
        modalState.visible = true;
        formModel.value = {
          name: row.name || '',
          role_id: row.role_id || 2,
        };
      },
    },
    {
      label: '删除',
      popConfirm: {
        title: '确认删除吗？',
        onConfirm: async (row) => {
          console.log('row', row);
          const res = await mockReq();
          if (res) {
            createMessage.success('删除成功');
            refresh();
          }
        },
      },
    },
  ]);

  const handleCancel = () => {
    modalState.visible = false;
    FormRef.value?.resetFields();
  };

  const handleSubmit = () => {
    FormRef.value
      ?.validate()
      .then(async () => {
        modalState.loading = true;
        // const req = modalState.title === '新增用户' ? store.fetchCreate : store.fetchUpdate;
        const res = await mockReq(formModel.value);
        modalState.loading = false;
        if (res) {
          createMessage.success(`${modalState.title === '新增成员' ? '新增' : '修改'}成功`);
          handleCancel();
          refresh();
        }
      })
      .catch(console.log);
  };

  // filter
  const tableFilterModel = reactive({ role_id: undefined, search: '' });
  const tableFilterButton = reactive({
    type: 'primary',
    label: '新增成员',
    onClick: () => {
      modalState.title = '新增成员';
      modalState.okText = '创建';
      modalState.visible = true;
    },
  });

  const tableFilterItems = computed(() => [
    {
      type: 'select',
      name: 'role_id',
      placeholder: '请选择角色',
      options: roleOptions.value,
    },
    {
      type: 'search',
      name: 'search',
      placeholder: '请输入姓名或邮箱进行查询',
    },
  ]);
</script>
<style lang="less" scoped>
  .node-conatiner {
    .nc_title {
      margin-top: 6px;
      margin-bottom: 30px;
    }
  }
</style>
