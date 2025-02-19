'use client';

// Imports:
import Header from '@/components/generics/header';
import GenericTable from '@/components/generics/table';
import Actions from '@/components/specific/actions';
import TaskModal from '@/components/specific/task-modal';
import { ModalProvider } from '@/contexts/modal-context';
import { useState } from 'react';

export default function Page() {
  const [openModal, setOpenModal] = useState(false);

  function handleOpenModal() {
    setOpenModal((prev) => !prev);
  }

  const headers = [
    {
      key: 'taskName',
      label: 'Task Name',
    },
    {
      key: 'status',
      label: 'Status',
    },

    {
      key: 'priority',
      label: 'Priority',
    },
  ];

  return (
    <>
      <Header />
      <Actions onClickModal={handleOpenModal} />
      <GenericTable
        tableHeaders={headers}
        tableRows={[
          {
            taskName: 'Task 1',
            status: 'Pending',
            priority: 'High',
          },
          {
            taskName: 'Task 2',
            status: 'Completed',
            priority: 'Low',
          },
          {
            taskName: 'Task 3',
            status: 'In Progress',
            priority: 'Medium',
          },
        ]}
      />

      <ModalProvider>
        <TaskModal open={openModal} onClose={handleOpenModal} />
      </ModalProvider>
    </>
  );
}
