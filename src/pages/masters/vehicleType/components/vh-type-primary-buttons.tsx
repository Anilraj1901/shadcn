import { IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useVhTypes } from '../context/vh-types-context'

export function VhTypePrimaryButtons() {
  const { setOpen } = useVhTypes()
  return (
    <div className='flex gap-2'>
        <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Vehicle Type</span> <IconPlus size={18} />
      </Button>
    </div>
  )
}