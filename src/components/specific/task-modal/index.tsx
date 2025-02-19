'use client';

// Imports:
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
import { useModalForm } from '@/contexts/modal-context';
import { modalKeys } from '@/schemas/modal-schema';
import { TModalComponent } from '@/types/modal';
import { Controller } from 'react-hook-form';

export default function TaskModal({ open, onClose }: TModalComponent) {
  const { formHook } = useModalForm();

  function closeModal(e: React.MouseEvent) {
    e.stopPropagation(); // Prevents the modal from closing when clicking inside the modal.
    formHook.reset();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[450px] bg-white outline-none dark:text-black p-8 rounded"
        aria-label="Task Modal"
        onClick={closeModal}
      >
        <DialogHeader className="space-y-3 text-start">
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Fill the form below to add a new task to the list.
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
                        options={[
                          { label: 'To Do', value: 'todo' },
                          { label: 'In Progress', value: 'in-progress' },
                          { label: 'Completed', value: 'completed' },
                        ]}
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
                        options={[
                          { label: 'Low', value: 'low' },
                          { label: 'Medium', value: 'medium' },
                          { label: 'High', value: 'high' },
                        ]}
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
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
