import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  totalCount: number
  setLimit: (limit: number) => void
  setPage: (page: number) => void
  page: number
}

export function DataTablePagination<TData>({
  table,
  totalCount,
  setLimit,
  setPage,
  page,
}: DataTablePaginationProps<TData>) {
  const pageSize = table.getState().pagination.pageSize
  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-2">
        <p className="hidden text-sm font-medium sm:block">Rows per page</p>
        <Select
          value={`${pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value))
            setLimit(Number(value))
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
        Page {page + 1} of {totalPages}
      </div>
      <div className='flex items-center space-x-2'>
        <Button
          variant='outline'
          className='hidden h-8 w-8 p-0 lg:flex'
          onClick={() => setPage(0)}
          disabled={page === 0}
        >
          <span className='sr-only'>Go to first page</span>
          <DoubleArrowLeftIcon className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          className='h-8 w-8 p-0'
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          <span className='sr-only'>Go to previous page</span>
          <ChevronLeftIcon className='h-4 w-4' />
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i)
          .filter((i) => i < 4 || i === page || i === page - 1 || i === page + 1)
          .map((i) => (
            <Button
              key={i}
              variant={i === page ? "default" : "outline"}
              onClick={() => setPage(i)}
            >
              {i + 1}
            </Button>
          ))}
        <Button
          variant='outline'
          className='h-8 w-8 p-0'
          onClick={() => setPage(page + 1)} disabled={page >= totalPages - 1}
        >
          <span className='sr-only'>Go to next page</span>
          <ChevronRightIcon className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          className='hidden h-8 w-8 p-0 lg:flex'
          onClick={() => setPage(totalPages - 1)} disabled={page >= totalPages - 1}
        >
          <span className='sr-only'>Go to last page</span>
          <DoubleArrowRightIcon className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}
