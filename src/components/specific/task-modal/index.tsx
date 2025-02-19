import FormError from '@/components/generics/form-error';
import GenericSelect from '@/components/generics/select';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { priorityOptions, statusOptions } from '@/constants/modal';
import { useModalForm } from '@/contexts/modal-context';
import {
  setActiveEdit,
  setTableRow,
  setTableRows,
  tableRequest,
  TableSlice,
} from '@/redux/reducers/table';
import { RootState } from '@/redux/store';
import { modalKeys, TModalSchema } from '@/schemas/modal-schema';
import { TModalComponent } from '@/types/modal';
import { TTableRowProps } from '@/types/table';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

export default function TaskModal({ open, onClose }: TModalComponent) {
  const dispatch = useDispatch();
  const { formHook } = useModalForm();

  console.log('FORM HOOK VALUES: ', formHook.getValues());

  const activeEdit = useSelector(
    (state: RootState) => state[TableSlice.name].activeEdit
  );
  const existingRows =
    useSelector((state: RootState) => state[TableSlice.name].rows) ?? null;
  const row = useSelector(
    (state: RootState) => state[TableSlice.name].row
  ) as TTableRowProps | null;

  useEffect(() => {
    let resetTimeout: ReturnType<typeof setTimeout>;

    if (!open) {
      resetTimeout = setTimeout(() => {
        formHook.reset();
        dispatch(setTableRow(null));
        dispatch(setActiveEdit(false));
      }, 300);
    }

    return () => clearTimeout(resetTimeout);
  }, [dispatch, open]);

  function submitHandler(data: TModalSchema) {
    dispatch(tableRequest());

    if (activeEdit && row) {
      const updatedRows = (existingRows ?? []).map(
        (existingRow: TTableRowProps) =>
          existingRow.id === row.id ? { ...existingRow, ...data } : existingRow
      );

      dispatch(setTableRows(updatedRows));
      toast.success('Task updated successfully!');
    } else {
      const newTask = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
      };

      dispatch(setTableRows([...(existingRows ?? []), newTask]));
      toast.success('Task added successfully!');
    }

    onClose();
    formHook.reset();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[450px] bg-white outline-none dark:text-black p-8 rounded"
        aria-label="Task Modal"
      >
        <DialogHeader className="space-y-3 text-start">
          <DialogTitle>{activeEdit ? 'Edit Task' : 'Add Task'}</DialogTitle>
          <DialogDescription>
            {activeEdit
              ? 'Fill the form below to edit the task.'
              : 'Fill the form below to add a new task to the list.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <form>
            <div className="space-y-3">
              <div className="space-y-2">
                <Controller
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Task Title"
                      aria-label="Task Title"
                      className="rounded ring-transparent"
                      {...field}
                    />
                  )}
                  name={modalKeys['TITLE']}
                  control={formHook.control}
                />
                <FormError formHook={formHook} name={modalKeys['TITLE']} />
              </div>

              <div className="space-y-2">
                <Controller
                  render={({ field }) => (
                    <Textarea
                      placeholder="Description"
                      aria-label="Description"
                      className="rounded ring-transparent resize-none"
                      maxLength={100}
                      {...field}
                    ></Textarea>
                  )}
                  name={modalKeys['DESCRIPTION']}
                  control={formHook.control}
                />
                <FormError
                  formHook={formHook}
                  name={modalKeys['DESCRIPTION']}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between gap-2">
                  <Controller
                    render={({ field }) => (
                      <GenericSelect
                        placeholder="Select a status"
                        label="Status"
                        options={statusOptions}
                        className="w-1/2"
                        {...field}
                      />
                    )}
                    name={modalKeys['STATUS']}
                    control={formHook.control}
                  />

                  <Controller
                    render={({ field }) => (
                      <GenericSelect
                        placeholder="Select a priority"
                        label="Priority"
                        options={priorityOptions}
                        className="w-1/2"
                        {...field}
                      />
                    )}
                    name={modalKeys['PRIORITY']}
                    control={formHook.control}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <DialogFooter>
          <Button
            className="text-white rounded bg-black hover:bg-opacity-85 ring-black"
            size={'default'}
            disabled={!formHook.formState.isValid}
            onClick={formHook.handleSubmit(submitHandler)}
          >
            {activeEdit ? 'Save' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
