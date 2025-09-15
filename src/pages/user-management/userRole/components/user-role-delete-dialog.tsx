'use client'

// import { useState } from 'react'
import { IconAlertTriangle } from '@tabler/icons-react'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import UserManagmentService from "@/services/user-management";

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: any
}

export function UserRoleDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  // const [value, setValue] = useState('')

  const handleDelete = async () => {
    const formData = new FormData()

    formData.append('roleName', currentRow.roleName)
    formData.append('userAakno', '1')
    formData.append('opt', '3')
    formData.append('roleAakno', currentRow.roleAakno.toString())

    await UserManagmentService.userRoleSave(formData)

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
              Are you sure to delete this {currentRow.roleName} ?
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Delete'
      destructive
    />
  )
}
