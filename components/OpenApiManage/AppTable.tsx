import { OpenApiVO } from '@/types/openApi';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import React, { Key, useCallback } from 'react';
const columns = [
  {
    key: 'name',
    label: '名称',
  },
  {
    key: 'appId',
    label: 'App ID',
  },
  {
    key: 'appSecret',
    label: 'App Secret',
  },
  {
    key: 'remark',
    label: '备注',
  },
  {
    key: 'createdAt',
    label: '创建时间',
  },
];
interface AppTableComProps {
  apps: OpenApiVO[];
}
export default function AppTableCom(props: AppTableComProps) {
  const { apps: rows } = props;
  const renderCell = useCallback((row: OpenApiVO, columnKey: Key) => {
    const cellValue = row[columnKey as keyof OpenApiVO];
    switch (columnKey) {
      case 'createdAt':
        return cellValue?.toLocaleString();
      default:
        return cellValue?.toString();
    }
  }, []);
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
