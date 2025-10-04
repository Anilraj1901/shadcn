'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription
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
import UserManagmentService from "@/services/user-management";
import { useFormNavigation } from "@/hooks/useFormNavigation"
import { useState, useEffect } from 'react'

interface Props {
  currentRow?: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UserRoleActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow;
  const queryClient = useQueryClient();
  const handleKeyDown = useFormNavigation()
  const [currentRowData, setCurrentRowData] = useState<any>(currentRow);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const statusSelectRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<any>({
    resolver: zodResolver(z.object({
      roleName: z.string().min(1, 'Name is required.'),
      cstatus: z.string().min(1, 'Status is required.').transform((val) => val.trim())
    })),
    defaultValues: {
      roleName: '',
      cstatus: '',
      roleAakno: ''
    },
  })

  useEffect(() => {
    if (currentRowData) {
      form.reset({
        roleName: currentRowData?.roleName || '',
        cstatus: currentRowData?.cstatus?.toString() ?? '',
        roleAakno: currentRowData?.roleAakno?.toString() ?? '',
      })
    } else {
      form.reset({
        roleName: '',
        cstatus: '',
        roleAakno: '',
      })
    }
  }, [currentRowData, form]);


  form.setValue('roleAakno', currentRowData && currentRowData?.roleAakno?.toString() || '')

  const onSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append('roleName', values.roleName);
      formData.append('cstatus', values.cstatus);
      formData.append('userAakno', '1');
      formData.append('opt', isEdit ? '2' : '1');
      let roleAakno = form.getValues('roleAakno');
      formData.append('roleAakno', roleAakno ? roleAakno.toString() : '0');

      await UserManagmentService.userRoleSave(formData);

      toast.success(isEdit ? 'User Role updated successfully' : 'User Role created successfully');

      queryClient.invalidateQueries({ queryKey: ['userRoleList'] });

      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error('Failed to save User Role:', error);
      toast.error('Failed to save User Role');
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(state) => {
          if (!state) {
            form.reset();
            setCurrentRowData(null);
          }
          onOpenChange(state);
        }}
      >
        <DialogContent
          onEscapeKeyDown={(e) => {
            e.preventDefault();
            form.reset({ roleName: '', cstatus: '', roleAakno: '' });
            setCurrentRowData(null);
            setTimeout(() => {
              nameInputRef.current?.focus()
            }, 0)
          }}
          className="sm:max-w-lg"
        >

          <DialogHeader className='text-left'>
            <DialogTitle>
              {isEdit ? 'Edit User Role' : 'Add New User Role'}
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className='-mr-4 max-h-[80vh] w-full overflow-y-auto py-1 pr-4'>
            <Form {...form}>
              <form
                id="user-role-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 p-0.5"
                onKeyDown={handleKeyDown}
              >
                {/* Name field */}
                <FormField
                  control={form.control}
                  name='roleName'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1'>
                      <FormLabel className='col-span-2 text-right'>Name</FormLabel>
                      <FormControl className='col-span-4'>
                        <Input
                          placeholder='Enter Name'
                          autoComplete='off'
                          {...field}
                          ref={nameInputRef}
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
                          ref={statusSelectRef}
                        />
                      </FormControl>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                />

                {/* Footer */}
                <DialogFooter className="pt-4">
                  <Button type='submit'>
                    {isEdit ? 'Update' : 'Create'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
