<template>
  <div class="contact-form-page">
    <div class="form-header">
      <a-button type="link" @click="router.back()">
        <LeftOutlined />
      </a-button>
      <h2>{{ isEdit ? '编辑联系人' : '新增联系人' }}</h2>
    </div>

    <a-alert
      class="form-alert"
      type="info"
      show-icon
      message="个人通讯录中联系人属于公司资产，请注意不要添加您的隐私联系人。"
    />

    <a-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      :label-col="{ span: 3 }"
      :wrapper-col="{ span: 18 }"
    >
      <h3 class="section-title">基础信息</h3>
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="头像">
            <a-upload
              list-type="picture-card"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload"
            >
              <img v-if="photoUrl" :src="photoUrl" class="avatar-img" />
              <div v-else>
                <PlusOutlined />
                <div class="upload-text">上传图片</div>
              </div>
            </a-upload>
            <div class="tip">只支持静态图片，不支持动态图，2M以内</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="姓氏" name="lastName">
            <a-input v-model:value="formModel.lastName" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="名字" name="firstName">
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
          <a-form-item label="手机号码" name="mobile">
            <a-input v-model:value="formModel.mobile" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="办公号码" name="officePhone">
            <a-input v-model:value="formModel.officePhone" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="分组">
            <a-select v-model:value="formModel.groups" mode="multiple" placeholder="请选择">
              <a-select-option v-for="group in groups" :key="group" :value="group">{{ group }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <h3 class="section-title">其他信息</h3>
      <a-row :gutter="24">
        <a-col v-for="item in extraFields" :key="item.key" :span="12">
          <a-form-item :label="item.label" :name="item.key">
            <a-input v-model:value="formModel[item.key]" placeholder="请输入" />
          </a-form-item>
        </a-col>
      </a-row>

      <div class="form-footer">
        <a-space>
          <a-button @click="router.back()">取消</a-button>
          <a-button type="primary" :loading="saving" @click="handleSave">保存</a-button>
        </a-space>
      </div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import { LeftOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import type { FormInstance } from 'ant-design-vue';
  import {
    addAddressBookContactApi,
    editAddressBookContactApi,
    getAddressBookContactsApi,
    getAddressBookGroupsApi,
    getFileDownloadUrl,
    uploadFileApi,
  } from '/@/api/extensionUser';
  import { useMessage } from '/@/hooks/useMessage';

  const router = useRouter();
  const route = useRoute();
  const { createMessage } = useMessage();
  const formRef = ref<FormInstance>();
  const saving = ref(false);
  const groups = ref<string[]>([]);
  const isEdit = computed(() => Boolean(route.query.id));
  const photoFileName = ref('');
  const photoUrl = computed(() => (photoFileName.value ? getFileDownloadUrl(photoFileName.value) : ''));
  const formModel = reactive<Record<string, string | string[] | undefined>>({
    lastName: '',
    firstName: '',
    gender: undefined,
    mobile: '',
    officePhone: '',
    groups: [],
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

  const textValidator = async (_rule, value: string) => {
    if (!value) return Promise.resolve();
    if (/[<>]/.test(value)) {
      return Promise.reject('不可以输入符号<>');
    }
    if (value.length > 32) {
      return Promise.reject('最大长度32');
    }
    return Promise.resolve();
  };

  const phoneValidator = async (_rule, value: string) => {
    if (!value) return Promise.resolve();
    if (!/^\d+$/.test(value)) {
      return Promise.reject('只能输入数字');
    }
    if (value.length > 32) {
      return Promise.reject('最大长度32');
    }
    return Promise.resolve();
  };

  const emailValidator = async (_rule, value: string) => {
    if (!value) return Promise.resolve();
    if (/[<>]/.test(value)) {
      return Promise.reject('不可以输入符号<>');
    }
    if (value.length > 32) {
      return Promise.reject('最大长度32');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return Promise.reject('请输入正确的邮箱格式');
    }
    return Promise.resolve();
  };

  const contactNumberValidator = async () => {
    if (!getStringValue('mobile') && !getStringValue('officePhone')) {
      return Promise.reject('手机号码和办公号码至少填写一项');
    }
    return Promise.resolve();
  };

  const rules: Record<string, any[]> = {
    lastName: [
      { required: true, message: '请输入姓氏' },
      { validator: textValidator, trigger: 'blur' },
    ],
    firstName: [
      { required: true, message: '请输入名字' },
      { validator: textValidator, trigger: 'blur' },
    ],
    mobile: [
      { validator: phoneValidator, trigger: 'blur' },
      { validator: contactNumberValidator, trigger: 'blur' },
    ],
    officePhone: [
      { validator: phoneValidator, trigger: 'blur' },
      { validator: contactNumberValidator, trigger: 'blur' },
    ],
    organization: [{ validator: textValidator, trigger: 'blur' }],
    department: [{ validator: textValidator, trigger: 'blur' }],
    position: [{ validator: textValidator, trigger: 'blur' }],
    email: [{ validator: emailValidator, trigger: 'blur' }],
    backupMobile: [{ validator: phoneValidator, trigger: 'blur' }],
    homePhone: [{ validator: phoneValidator, trigger: 'blur' }],
    fax: [{ validator: phoneValidator, trigger: 'blur' }],
    address: [{ validator: textValidator, trigger: 'blur' }],
    remark: [{ validator: textValidator, trigger: 'blur' }],
  };

  const loadGroups = async () => {
    groups.value = await getAddressBookGroupsApi();
  };

  const loadContact = async () => {
    if (!route.query.id) return;
    const list = await getAddressBookContactsApi({ groups: null, condition: null });
    const contact = (list || []).find((item: any) => item.id === route.query.id);
    if (!contact) return;

    formModel.lastName = contact.lastName || '';
    formModel.firstName = contact.firstName || '';
    formModel.gender = contact.gender || undefined;
    formModel.mobile = contact.phoneNumber || '';
    formModel.officePhone = contact.officePhoneNumber || '';
    formModel.groups = contact.groups || [];
    formModel.organization = contact.organization || '';
    formModel.department = contact.department || '';
    formModel.position = contact.position || '';
    formModel.email = contact.mailbox || '';
    formModel.backupMobile = contact.alternatePhoneNumber || '';
    formModel.homePhone = contact.fixedPhoneNumber || '';
    formModel.fax = contact.faxPhoneNumber || '';
    formModel.address = contact.address || '';
    formModel.remark = contact.remarks || '';
    photoFileName.value = contact.photo || '';
  };

  const handleBeforeUpload = async (file: File) => {
    if (!file.type.startsWith('image/') || file.type === 'image/gif') {
      createMessage.error('只支持静态图片');
      return false;
    }
    if (file.size / 1024 / 1024 >= 2) {
      createMessage.error('图片需小于 2MB');
      return false;
    }
    photoFileName.value = await uploadFileApi(file, 'photo');
    createMessage.success('上传成功');
    return false;
  };

  const getStringValue = (key: string) => {
    const value = formModel[key];
    return Array.isArray(value) ? value.join(',') : value || '';
  };

  const handleSave = async () => {
    await formRef.value?.validate();
    saving.value = true;
    try {
      const payload = {
        photo: photoFileName.value || null,
        lastName: getStringValue('lastName'),
        firstName: getStringValue('firstName'),
        gender: getStringValue('gender') || null,
        phoneNumber: getStringValue('mobile') || null,
        officePhoneNumber: getStringValue('officePhone') || null,
        groups: (formModel.groups as string[]) || [],
        organization: getStringValue('organization') || null,
        department: getStringValue('department') || null,
        position: getStringValue('position') || null,
        mailbox: getStringValue('email') || null,
        alternatePhoneNumber: getStringValue('backupMobile') || null,
        fixedPhoneNumber: getStringValue('homePhone') || null,
        faxPhoneNumber: getStringValue('fax') || null,
        address: getStringValue('address') || null,
        remarks: getStringValue('remark') || null,
      };

      if (isEdit.value) {
        await editAddressBookContactApi({
          ...payload,
          id: [String(route.query.id)],
        });
      } else {
        await addAddressBookContactApi(payload);
      }
      createMessage.success('保存成功');
      router.replace('/app/contacts/personal');
    } finally {
      saving.value = false;
    }
  };

  onMounted(async () => {
    await loadGroups();
    await loadContact();
  });
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

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
