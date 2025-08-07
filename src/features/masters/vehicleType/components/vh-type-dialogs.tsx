import { useVhTypes } from '../context/vh-types-context'
import { VehicleTypeActionDialog } from './vh-type-action-dialog'
import { VhTypeDeleteDialog } from './vh-type-delete-dialog'

export function VhTypesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useVhTypes()
  return (
    <>
      <VehicleTypeActionDialog
        key='vh-type-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />


      {currentRow && (
        <>
          <VehicleTypeActionDialog
            key={`vh-type-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <VhTypeDeleteDialog
            key={`vh-type-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
