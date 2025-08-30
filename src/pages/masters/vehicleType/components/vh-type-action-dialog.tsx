'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SelectDropdown } from '@/components/select-dropdown'
import MasterServices from "@/services/master";
import { useFormNavigation } from "@/hooks/useFormNavigation"
import { useState } from 'react'
import { VhSearchLsTableView } from './vh-search-ls-table'

interface Props {
  currentRow?: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function VehicleTypeActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow;
  const queryClient = useQueryClient();
  const handleKeyDown = useFormNavigation(() => onOpenChange(false))
  const [searchList, setSearchList] = useState(false);

  const form = useForm<any>({
    resolver: zodResolver(z.object({
      contName: z.string().min(1, 'Name is required.'),
      cstatus: z.string().min(1, 'Status is required.').transform((val) => val.trim())
    })),
    defaultValues: isEdit
      ? {
        contName: currentRow?.contName || '',
        cstatus: currentRow?.cstatus?.toString() ?? '',
      }
      : {
        contName: '',
        cstatus: ''
      },
  })

  const onSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append('contName', values.contName);
      formData.append('cstatus', values.cstatus);
      formData.append('userAakno', '1');
      formData.append('opt', isEdit ? '2' : '1');

      const contAakno = currentRow?.contAakno && Number(currentRow.contAakno);
      formData.append('contAakno', contAakno ? contAakno.toString() : '0');

      await MasterServices.vehicleTypeSave(formData);

      toast.success(isEdit ? 'Vehicle type updated successfully' : 'Vehicle type created successfully');

      queryClient.invalidateQueries({ queryKey: ['vehicleTypeList'] });

      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error('Failed to save vehicle type:', error);
      toast.error('Failed to save vehicle type');
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(state) => {
          form.reset()
          onOpenChange(state)
        }}
      >
        <DialogContent className='sm:max-w-lg'>
          <DialogHeader className='text-left'>
            <DialogTitle>
              {isEdit ? 'Edit Vehicle Type' : 'Add New Vehicle Type'}
            </DialogTitle>
          </DialogHeader>

          <div className='-mr-4 max-h-[80vh] w-full overflow-y-auto py-1 pr-4'>
            <Form {...form}>
              <form
                id="vh-type-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 p-0.5"
                onKeyDown={handleKeyDown}
              >
                {/* Name field */}
                <FormField
                  control={form.control}
                  name='contName'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1'>
                      <FormLabel className='col-span-2 text-right'>Name</FormLabel>
                      <FormControl className='col-span-4'>
                        <Input
                          placeholder='Enter Name'
                          autoComplete='off'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                />

                {/* Status dropdown */}
                <FormField
                  control={form.control}
                  name='cstatus'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1'>
                      <FormLabel className='col-span-2 text-right'>Status</FormLabel>
                      <FormControl className='col-span-4'>
                        <SelectDropdown
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder='Select Status'
                          className='w-full'
                          items={[
                            { label: 'Active', value: '0' },
                            { label: 'In-Active', value: '1' },
                          ]}
                        />
                      </FormControl>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                />

                {/* Footer */}
                <DialogFooter className="pt-4">
                  {isEdit && <Button
                    type='button'
                    onClick={() => setSearchList(true)}
                  >
                    Search
                  </Button>}
                  <Button type='submit'>
                    {isEdit ? 'Update' : 'Create'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>

      <VhSearchLsTableView
        open={searchList}
        onOpenChange={setSearchList}
        searchValue={form.getValues('contName')}
        onSelect={(rowData) => {
          form.setValue('contName', rowData.contName ?? '')
          form.setValue('cstatus', rowData.cstatus?.toString() ?? '')
          setSearchList(false);
        }}
      />
    </>
  )
}
