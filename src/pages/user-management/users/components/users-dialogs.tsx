import { useUsers } from '../context/users-context'
import { UserActionDialog } from './users-action-dialog'
import { UserDeleteDialog } from './users-delete-dialog'

export function UserDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useUsers()

  return (
    <>
      <UserActionDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />


      {currentRow && (
        <>
          <UserActionDialog
            key={`user-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setCurrentRow(null)
            }}
            currentRow={currentRow}
          />

          <UserDeleteDialog
            key={`user-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setCurrentRow(null)
            }}
            currentRow={currentRow}
          />

        </>
      )}
    </>
  )
}
