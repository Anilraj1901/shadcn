import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/user-role-columns'
import { UserRoleDialogs } from './components/user-role-dialogs'
import { UserRolePrimaryButtons } from './components/user-role-primary-buttons'
import UserRolesProvider from './context/user-role-context'
import { useQuery } from "@tanstack/react-query";
import UserManagmentServices from "@/services/user-management";
import { useState } from 'react'
import {
  ColumnFiltersState,
  RowData,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { DataTablePagination } from '../../../components/table/data-table-pagination';
import { DataTableToolbar } from './components/data-table-filters';
import { DataTableView } from '@/components/table/data-table-display'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string
  }
}


export default function UserRoles() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("");
  // install with: npm i use-debounce


  const userRoleList = useQuery({
    queryKey: ["userRoleList", page, limit, filter],
    queryFn: async () => {
      let queryParams = `sEcho=5&iColumns=2&sColumns=%2C&mDataProp_0=contAakno&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=contName&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=true&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=asc&iSortingCols=1&_=1755523196428&iDisplayLength=${limit}&iDisplayStart=${page * limit}`;

      if (filter) queryParams += `&filter=${filter}`;

      return await UserManagmentServices.userRoleList(queryParams);
    },
  });

  return (
    <UserRolesProvider>
      <Header fixed>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        {/* Header Row */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">User Roles</h2>
          <UserRolePrimaryButtons />
        </div>

        {/* Toolbar Row */}
        <div className="mb-4 flex items-center justify-between gap-2">
          <DataTableToolbar filter={filter} setFilter={setFilter} setPage={setPage} />
        </div>

        {/* Table Section */}
        <div className="flex-1 overflow-auto px-4 py-2">
          <UserRolesTable
            data={userRoleList?.data?.data?.aaData || []}
            totalRecords={Number(userRoleList?.data?.data?.iTotalRecords) || 0}
            columns={columns}
            setLimit={setLimit}
            setPage={setPage}
            page={page}
            limit={limit}
            setFilter={setFilter}
            filter={filter}
            isLoading={userRoleList.isLoading}
          />
        </div>
      </Main>
      <UserRoleDialogs />
    </UserRolesProvider>
  )
}



export function UserRolesTable({ columns, data, totalRecords, setLimit, setPage, page, limit, isLoading }: any) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: { pageIndex: page, pageSize: limit },
    },
    manualPagination: true,
    pageCount: Math.ceil(totalRecords / limit),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="space-y-4 relative">
      <div className="overflow-hidden rounded-md border relative">
        <DataTableView columns={columns} data={data} table={table} isLoading={isLoading} />
      </div>

      <DataTablePagination
        table={table}
        totalCount={totalRecords}
        setLimit={setLimit}
        setPage={setPage}
        page={page}
      />
    </div>
  )
}
