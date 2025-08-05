import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import LongText from '@/components/long-text'
import { DataTableColumnHeader } from '../../../components/table/data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import moment from 'moment';

const callTypes = new Map<number, string>([
  [0, 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  [1, 'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10']
])

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'contAakno',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('contAakno')}</LongText>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'contName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('contName')}</div>
    ),
  },
  {
    accessorKey: 'varient',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Varient' />
    ),
    cell: ({ row }) => <div>{row.getValue('varient')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'CStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const badgeColor = callTypes.get(row?.original?.CStatus)
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {row.getValue('CStatus') == '0' ? 'Active' : 'In-Active'}
          </Badge>
        </div>
      )
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'CreatedDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created Date' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>{row.getValue('CreatedDate') ? moment(row.getValue('CreatedDate'), 'DD-MM-YYYY hh:mm:ss').format('DD-MM-YYYY hh:mm A') : ''}</div>
      )
    },
    enableHiding: false,
    enableSorting: false,
  },

  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]