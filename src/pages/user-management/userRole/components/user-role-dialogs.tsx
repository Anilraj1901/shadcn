import { useUserRoles } from '../context/user-role-context'
import { UserRoleActionDialog } from './user-role-action-dialog'
import { UserRoleDeleteDialog } from './user-role-delete-dialog'

export function UserRoleDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useUserRoles()
  return (
    <>
      <UserRoleActionDialog
        key='user-role-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />


      {currentRow && (
        <>
          <UserRoleActionDialog
            key={`user-role-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setCurrentRow(null)
            }}
            currentRow={currentRow}
          />

          <UserRoleDeleteDialog
            key={`user-role-delete-${currentRow.id}`}
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
