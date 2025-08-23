'use client'

// import { useState } from 'react'
import { IconAlertTriangle } from '@tabler/icons-react'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import MasterServices from "@/services/master";

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: any
}

export function VhTypeDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  // const [value, setValue] = useState('')

  const handleDelete = async () => {
    const formData = new FormData()

    formData.append('contName', currentRow.contName)
    formData.append('userAakno', '1')
    formData.append('opt', '3')
    formData.append('contAakno', currentRow.contAakno.toString())

    await MasterServices.vehicleTypeSave(formData)

    toast.success('Vehicle type deleted successfully')

    onOpenChange(false)

  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      // disabled={value.trim() !== currentRow.name}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle
            className='stroke-destructive mr-1 inline-block'
            size={18}
          />{' '}
          Delete Vehicle Type
        </span>
      }
      desc={
        <div className='space-y-4'>
          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Are you sure to delete this {currentRow.contName} ?
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Delete'
      destructive
    />
  )
}
