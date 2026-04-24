import { Tag } from 'ant-design-vue';
import { ColumnProps } from 'ant-design-vue/es/table';

export const columns: ColumnProps[] = [
  {
    title: 'IP 地址',
    dataIndex: 'ip',
    width: 150,
  },
  {
    title: '端口',
    dataIndex: 'host',
    width: 80,
    customRender: ({ text }) => <Tag>{text}</Tag>,
  },
  {
    title: '协议',
    dataIndex: 'protocol',
    width: 100,
  },
  {
    title: '标识',
    dataIndex: 'domain',
    width: 100,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 150,
  },
  {
    title: '链接地址',
    dataIndex: 'url',
    width: 200,
    customRender: ({ text }) => (
      <a href={text} target="_blank">
        {text}
      </a>
    ),
  },
  {
    title: '操作',
    key: 'action',
    width: 120,
  },
];
