'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

const formSchema = z.object({
  contName: z.string().min(1, 'Name is required.'),
  varient: z.string().min(1, 'Varient is required.'),
  CStatus: z.string().min(1, 'Status is required.').transform((val) => val.trim()),
})

type FormType = z.infer<typeof formSchema>

interface Props {
  currentRow?: {
    contName: string
    varient: string
    CStatus: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function VehicleTypeActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow;

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
        contName: currentRow?.contName || '',
        varient: currentRow?.varient || '',
        CStatus: currentRow?.CStatus?.toString() ?? '',
      }
      : {
        contName: '',
        varient: '',
        CStatus: '',
      },
  })

  const onSubmit = (values: FormType) => {
    form.reset()
    showSubmittedData(values)
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? 'Edit Vehicle Type' : 'Add New Vehicle Type'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the vehicle type here. ' : 'Create new vehicle type here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='-mr-4 max-h-[80vh] w-full overflow-y-auto py-1 pr-4'>
          <Form {...form}>
            <form
              id='vh-type-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
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

              <FormField
                control={form.control}
                name='varient'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>Varient</FormLabel>
                    <FormControl className='col-span-4'>
                      <Input
                        placeholder='Enter Varient'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='CStatus'
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
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='vh-type-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
