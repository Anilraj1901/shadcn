import { IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useUserRoles } from '../context/user-role-context'

export function UserRolePrimaryButtons() {
  const { setOpen } = useUserRoles()
  return (
    <div className='flex gap-2'>
        <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add User Role</span> <IconPlus size={18} />
      </Button>
    </div>
  )
}