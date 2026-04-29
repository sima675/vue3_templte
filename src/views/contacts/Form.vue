<template>
  <div class="contact-form-page">
    <div class="form-header">
      <a-button type="link" @click="router.back()">
        <LeftOutlined />
      </a-button>
      <h2>新增联系人</h2>
    </div>

    <a-alert
      class="form-alert"
      type="info"
      show-icon
      message="个人通讯录中联系人属于公司资产，请注意不要添加您的隐私联系人。"
    />

    <a-form :model="formModel" :label-col="{ span: 3 }" :wrapper-col="{ span: 18 }">
      <h3 class="section-title">基础信息</h3>
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="头像">
            <a-upload list-type="picture-card" :show-upload-list="false">
              <div>
                <PlusOutlined />
                <div class="upload-text">上传图片</div>
              </div>
            </a-upload>
            <div class="tip">只支持静态图片，不支持动态图，2M以内</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="姓氏" required>
            <a-input v-model:value="formModel.lastName" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="名字" required>
            <a-input v-model:value="formModel.firstName" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="性别">
            <a-select v-model:value="formModel.gender" placeholder="请选择">
              <a-select-option value="male">男</a-select-option>
              <a-select-option value="female">女</a-select-option>
              <a-select-option value="unknown">未知</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="手机号码">
            <a-input v-model:value="formModel.mobile" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="办公号码">
            <a-input v-model:value="formModel.officePhone" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="分组">
            <a-select v-model:value="formModel.group" placeholder="请选择">
              <a-select-option value="all">所有联系人</a-select-option>
              <a-select-option value="client">客户</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <h3 class="section-title">其他信息</h3>
      <a-row :gutter="24">
        <a-col v-for="item in extraFields" :key="item.key" :span="12">
          <a-form-item :label="item.label">
            <a-input v-model:value="formModel[item.key]" placeholder="请输入" />
          </a-form-item>
        </a-col>
      </a-row>

      <div class="form-footer">
        <a-space>
          <a-button @click="router.back()">取消</a-button>
          <a-button type="primary">保存</a-button>
        </a-space>
      </div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import { LeftOutlined, PlusOutlined } from '@ant-design/icons-vue';

  const router = useRouter();
  const formModel = reactive<Record<string, string | undefined>>({
    lastName: '',
    firstName: '',
    gender: undefined,
    mobile: '',
    officePhone: '',
    group: undefined,
    organization: '',
    department: '',
    position: '',
    email: '',
    backupMobile: '',
    homePhone: '',
    fax: '',
    address: '',
    remark: '',
  });

  const extraFields = [
    { key: 'organization', label: '组织' },
    { key: 'department', label: '部门' },
    { key: 'position', label: '职位' },
    { key: 'email', label: '邮箱' },
    { key: 'backupMobile', label: '备用手机' },
    { key: 'homePhone', label: '家庭号码' },
    { key: 'fax', label: '传真号码' },
    { key: 'address', label: '地址' },
    { key: 'remark', label: '备注' },
  ];
</script>

<style lang="less" scoped>
  .contact-form-page {
    min-height: calc(100vh - 128px);
    background: #ffffff;
  }

  .form-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;

    h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
    }
  }

  .form-alert {
    margin-bottom: 20px;
  }

  .section-title {
    padding-left: 10px;
    margin: 24px 0 18px;
    color: #262626;
    font-size: 16px;
    font-weight: 600;
    border-left: 3px solid #1677ff;
  }

  .upload-text,
  .tip {
    margin-top: 8px;
    color: #8c8c8c;
    font-size: 12px;
  }

  .form-footer {
    position: sticky;
    right: 0;
    bottom: 0;
    padding: 16px 0;
    text-align: right;
    background: #ffffff;
  }
</style>
