// Imports:
import GenericSelect from '@/components/generics/select';
import { Button } from '@/components/ui/button';
import { statusOptions } from '@/constants/modal';
import { TActionComponent } from '@/types/action';
import { PlusIcon } from '@heroicons/react/24/solid';

export default function Actions({
  onClickModal,
  onFilterChange,
  selectedStatus,
}: TActionComponent) {
  return (
    <div className="px-10 py-5 flex justify-between">
      <GenericSelect
        options={[{ value: 'all', label: 'All' }, ...statusOptions]}
        value={selectedStatus}
        label="Filter by status"
        className="w-40 dark:bg-white dark:text-black"
        onChange={onFilterChange}
      />

      <Button
        className="text-white rounded bg-black hover:bg-opacity-85 dark:bg-white dark:text-black dark:hover:bg-opacity-85"
        size={'default'}
        onClick={onClickModal}
      >
        <PlusIcon className="size-6 text-white dark:text-black" />
        Add Task
      </Button>
    </div>
  );
}
