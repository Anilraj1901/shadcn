// import { Cross2Icon } from '@radix-ui/react-icons'
// import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// import { DataTableFacetedFilter } from '../../../../components/table/data-table-faceted-filter'
// import { DataTableViewOptions } from './data-table-view-options'

interface DataTableToolbarProp {
  filter: string
  setFilter: any
  setPage: any
}

export function DataTableToolbar({
  // table,
  filter,
  setFilter,
  setPage
}: DataTableToolbarProp) {
  // const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder="Filter all columns"
          value={filter}
          onChange={(event) => {
            setFilter(event.target.value);
            setPage(0); // reset to first page on new search
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        <div className='flex gap-x-2'>
          {/* {table.getColumn('cstatus') && (
            <DataTableFacetedFilter
              column={table.getColumn('cstatus')}
              title='Status'
              options={[
                { label: 'Active', value: '0' },
                { label: 'In-Active', value: '1' },
              ]}
            />
          )} */}
        </div>
        {/* {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )} */}
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  )
}
