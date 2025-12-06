'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import { PasswordInput } from '@/components/password-input'
import { toast } from 'sonner'
import { useRef, useState, useEffect } from 'react'
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
import UserManagmentService from "@/services/user-management"
import { useFormNavigation } from "@/hooks/useFormNavigation"

// ✅ Validation schema
const userSchema = z.object({
  userId: z.string().min(1, 'Username is required.'),
  passWord: z.string().min(6, 'Password must be at least 6 characters.'),
  roleAakno: z.string().min(1, 'Role is required.'),
  lckTag: z.string().min(1, 'Status is required.'),
  userAakno: z.string().optional(),
  brAakno: z.string().optional(),
})

interface Props {
  currentRow?: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UserActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow
  const queryClient = useQueryClient()
  const handleKeyDown = useFormNavigation()
  const [currentRowData, setCurrentRowData] = useState<any>(currentRow)

  const nameInputRef = useRef<HTMLInputElement | null>(null)
  const statusSelectRef = useRef<HTMLInputElement | null>(null)

  console.log(currentRow, "currentRow")

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      userId: '',
      passWord: '',
      roleAakno: '',
      lckTag: '',
      userAakno: '',
      brAakno: ''
    },
  })

  useEffect(() => {
    if (currentRowData) {
      form.reset({
        userId: currentRowData?.userId || '',
        passWord: currentRowData?.passWord || '',
        roleAakno: currentRowData?.roleAakno?.toString() ?? '',
        lckTag: currentRowData?.lckTag?.toString() ?? '',
        userAakno: currentRowData?.userAakno?.toString() ?? '',
        brAakno: currentRowData?.brAakno?.toString() ?? '',
      })
    } else {
      form.reset()
    }
  }, [currentRowData, form])

  // ✅ Fetch role list
  const userRoleList = useQuery({
    queryKey: ["userRoleList"],
    queryFn: async () => {
      const queryParams = `sEcho=5&iColumns=2&sColumns=%2C&mDataProp_0=contAakno&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=contName&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=true&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=asc&iSortingCols=1&_=1755523196428&iDisplayLength=1000&iDisplayStart=0`
      return await UserManagmentService.userRoleList(queryParams)
    },
  })

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    try {
      const formData = new FormData()
      formData.append('userId', values.userId)
      formData.append('passWord', values.passWord)
      formData.append('roleAakno', values.roleAakno)
      formData.append('lckTag', values.lckTag)
      formData.append('brAakno', '68')
      formData.append('userAakno', values.userAakno || '1')
      formData.append('opt', isEdit ? '2' : '1')

      await UserManagmentService.userSave(formData)

      toast.success(isEdit ? 'User updated successfully' : 'User created successfully')

      queryClient.invalidateQueries({ queryKey: ['userList'] })
      onOpenChange(false)
      form.reset()
    } catch (error) {
      console.error('Failed to save User:', error)
      toast.error('Failed to save User')
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) {
          form.reset()
          setCurrentRowData(null)
        }
        onOpenChange(state)
      }}
    >
      <DialogContent
        onEscapeKeyDown={(e) => {
          e.preventDefault()
          form.reset()
          setCurrentRowData(null)
          setTimeout(() => nameInputRef.current?.focus(), 0)
        }}
        className="sm:max-w-lg"
      >
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? 'Edit User' : 'Add New User'}</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className='-mr-4 max-h-[80vh] w-full overflow-y-auto py-1 pr-4'>
          <Form {...form}>
            <form
              id="user-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-0.5"
              onKeyDown={handleKeyDown}
            >

              {/* Username */}
              <FormField
                control={form.control}
                name='userId'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>Username</FormLabel>
                    <FormControl>
                      <Input placeholder='john_doe' className='col-span-4' {...field} ref={nameInputRef}/>
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              {/* Role */}
              <FormField
                control={form.control}
                name='roleAakno'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>Role</FormLabel>
                    <SelectDropdown
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select Role'
                      className='col-span-4'
                      items={userRoleList?.data?.data?.aaData?.map((role: any) => ({
                        label: role.roleName,
                        value: role?.roleAakno?.toString(),
                      })) || []}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              {/* Branch */}
              <FormField
                control={form.control}
                name='brAakno'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>Branch</FormLabel>
                    <SelectDropdown
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select Branch'
                      className='col-span-4'
                      items={userRoleList?.data?.data?.aaData?.map((role: any) => ({
                        label: role.roleName,
                        value: role.roleAakno,
                      })) || []}
                      ref={nameInputRef}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              {/* Password */}

              {!isEdit && 
              <FormField
                control={form.control}
                name='passWord'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder='e.g., S3cur3P@ssw0rd' className='col-span-4' {...field} />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              /> || null}

              {/* Status */}
              <FormField
                control={form.control}
                name='lckTag'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>Status</FormLabel>
                    <FormControl className='col-span-4'>
                      <SelectDropdown
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder='Select Status'
                        items={[
                          { label: 'Active', value: '0' },
                          { label: 'Inactive', value: '1' },
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
                <Button type='submit'>{isEdit ? 'Update' : 'Create'}</Button>
              </DialogFooter>

            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
