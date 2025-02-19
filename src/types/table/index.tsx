export type TTableComponent = {
  tableHeaders?: Array<{ key: string; label: string }>;
  tableRows: Array<object>;
  rowClass?: string;
  onRowSelect?: (row: object, index: number) => void;
  showActions?: boolean;
  documentHandler?: () => void;
  fileHandler?: () => void;
  deleteHandler?: () => void;
};
