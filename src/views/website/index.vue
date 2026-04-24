<template>
  <div class="node-conatiner">
    <h2 class="nc_title font18">基础列表</h2>
    <Alert type="info" message="保留最基础的列表 + 操作列 + 弹窗表单示例，适合直接改造成业务页面。" />
    <Table
      ref="ELRef"
      :url="fetchApi.page_one_list"
      :columns="columns"
      :hiddenFilter="true"
      :actions="tableActions"
    />
    <Modal v-bind="modalState" @cancel="handleCancel" @ok="handleSubmit">
      <a-form
        ref="FormRef"
        :model="formModel"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="名称:" name="name">
          <a-input v-model:value="formModel.name" placeholder="请输入名称" />
        </a-form-item>
        <a-form-item label="分组:" name="group">
          <a-select
            v-model:value="formModel.group"
            :options="groupOptions"
            placeholder="请选择分组"
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

  const groupOptions = computed(() => [
    { label: '默认分组', value: 'default' },
    { label: '运营分组', value: 'ops' },
  ]);
  // modal
  const modalState = reactive({
    loading: false,
    visible: false,
    title: '新建记录',
    okText: '保存',
  });

  // form
  const rules: Record<string, Rule[]> = {
    name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
    group: [
      {
        required: true,
        trigger: 'change',
        validator: (_, val) => (val ? Promise.resolve() : Promise.reject('请选择分组')),
      },
    ],
  };
  const formModel = ref({
    name: '',
    group: undefined,
  });

  const tableActions = reactive([
    {
      label: '编辑',
      onClick: async (row) => {
        modalState.title = '编辑记录';
        modalState.okText = '更新';
        modalState.visible = true;
        formModel.value = {
          name: row.domain || '',
          group: 'default',
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
        const res = await mockReq(formModel.value);
        modalState.loading = false;
        if (res) {
          createMessage.success(`${modalState.title === '新建记录' ? '新建' : '更新'}成功`);
          handleCancel();
          refresh();
        }
      })
      .catch(console.log);
  };
</script>
<style lang="less" scoped>
  .node-conatiner {
    .nc_title {
      margin-top: 6px;
      margin-bottom: 30px;
    }
  }
</style>
