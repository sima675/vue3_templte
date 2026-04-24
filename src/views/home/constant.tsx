import { Tooltip, Tag } from 'ant-design-vue';
import { ColumnProps } from 'ant-design-vue/es/table';

export const columns: ColumnProps[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '级别',
    dataIndex: 'age',
    width: 80,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    key: 'toDateTime',
    width: 150,
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
    width: 170,
  },
  {
    title: '联系邮箱',
    dataIndex: 'email',
    width: 150,
  },
  {
    title: '备注',
    dataIndex: 'description',
    ellipsis: true,
    customRender: ({ text }) => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    ),
  },
  {
    title: '标签色',
    dataIndex: 'color',
    width: 100,
    customRender: ({ text }) => <Tag color={text}>{text}</Tag>,
    fixed: 'right',
  },
];
