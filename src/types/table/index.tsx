export type TTableRowProps = {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
};

export type TTableComponent = {
  tableHeaders?: Array<{ key: string; label: string }>;
  tableRows: Array<TTableRowProps>;
  rowClass?: string;
  onRowSelect?: (row: TTableRowProps, index: number) => void;
  showActions?: boolean;
  editHandler?: (row: TTableRowProps) => void;
  deleteHandler?: (row: TTableRowProps) => void;
};

export type TTablePagination = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
