import { ColumnProps } from 'ant-design-vue/es/table';
import { Tag, Tooltip, Space } from 'ant-design-vue';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';

export const columns: ColumnProps[] = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'toIndex',
    width: 80,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: (
      <Tooltip>
        <Space align="center">
          <span>邮箱</span>
          <QuestionCircleOutlined style="vertical-align:2px" />
        </Space>
      </Tooltip>
    ),
    dataIndex: 'email',
    width: 180,
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    width: 140,
  },
  {
    title: '角色',
    dataIndex: 'age',
    width: 100,
  },
  {
    title: '颜色标签',
    dataIndex: 'color',
    width: 120,
    customRender: ({ text }) => <Tag color={text}>{text}</Tag>,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    width: 150,
    key: 'toDateTime',
  },
  {
    title: '状态',
    dataIndex: 'updated_at',
    width: 150,
    key: 'toDateTime',
  },
  {
    title: '操作',
    key: 'action',
    width: 120,
  },
];
