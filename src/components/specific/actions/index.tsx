// Imports:
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@heroicons/react/24/solid';

export default function Actions({
  onClickModal,
}: {
  onClickModal: () => void;
}) {
  return (
    <div className="border border-red-500 px-10 py-5">
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
