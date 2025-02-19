'use client';

// Imports:
import Header from '@/components/generics/header';
import GenericTable from '@/components/generics/table';
import Actions from '@/components/specific/actions';
import TablePagination from '@/components/specific/table-pagination';
import TaskModal from '@/components/specific/task-modal';
import { headers } from '@/constants/table';
import { useModalForm } from '@/contexts/modal-context';
import {
  setActiveEdit,
  setTableRow,
  setTableRows,
  TableSlice,
} from '@/redux/reducers/table';
import { RootState } from '@/redux/store';
import { modalKeys } from '@/schemas/modal-schema';
import { TTableRowProps } from '@/types/table';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const ITEMS_PER_PAGE = 5;

export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { formHook } = useModalForm();

  const dispatch = useDispatch();
  const rows =
    useSelector((state: RootState) => state[TableSlice.name].rows) ?? [];
  const activeEdit = useSelector(
    (state: RootState) => state[TableSlice.name].activeEdit
  );

  function handleOpenModal() {
    if (!openModal) {
      if (!activeEdit) {
        formHook.reset({
          [modalKeys.TITLE]: undefined,
          [modalKeys.DESCRIPTION]: undefined,
          [modalKeys.STATUS]: undefined,
          [modalKeys.PRIORITY]: undefined,
        });
      }
      dispatch(setActiveEdit(false));
    }

    setOpenModal((prev) => !prev);
  }

  function deletHandler(row: TTableRowProps) {
    const newRows = rows.filter((r: TTableRowProps) => r.id !== row.id);
    dispatch(setTableRows(newRows));
    toast.success('Task deleted successfully!');
  }

  function editHandler(row: TTableRowProps) {
    dispatch(setTableRow(row));
    dispatch(setActiveEdit(true));

    formHook.reset({
      [modalKeys.TITLE]: row.title,
      [modalKeys.DESCRIPTION]: row.description,
      [modalKeys.STATUS]: row.status,
      [modalKeys.PRIORITY]: row.priority,
    });

    setOpenModal(true);
  }

  // Filter rows based on status:
  const filteredRows =
    statusFilter === 'all'
      ? rows
      : rows.filter((row: TTableRowProps) => row.status === statusFilter);

  // Paginate rows:
  const totalPages = Math.ceil(filteredRows.length / ITEMS_PER_PAGE);
  const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages || 1));
  const paginatedRows = filteredRows.slice(
    (validCurrentPage - 1) * ITEMS_PER_PAGE,
    validCurrentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Header />
      <Actions
        onClickModal={handleOpenModal}
        onFilterChange={setStatusFilter}
        selectedStatus={statusFilter}
      />
      <GenericTable
        tableHeaders={headers}
        tableRows={paginatedRows}
        deleteHandler={deletHandler}
        editHandler={editHandler}
        showActions
      />
      {filteredRows.length > 0 && (
        <TablePagination
          currentPage={validCurrentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
      <TaskModal open={openModal} onClose={handleOpenModal} />
    </>
  );
}
