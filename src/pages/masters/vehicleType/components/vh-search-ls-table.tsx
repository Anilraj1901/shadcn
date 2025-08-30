"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import MasterServices from "../../../../services/master"

interface VehicleTypeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  searchValue: string
  onSelect: (rowData: any) => void
}

export function VehicleTypeDialog({
  open,
  onOpenChange,
  searchValue = "",
  onSelect,
}: VehicleTypeDialogProps) {
  const [page, setPage] = React.useState(0)
  const [limit, setLimit] = React.useState(10)
  

  const vehicleTypeList = useQuery({
    queryKey: ["vehicleTypeList", page, limit, searchValue],
    queryFn: async () => {
      let queryParams = `sEcho=5&iColumns=2&sColumns=%2C&mDataProp_0=contAakno&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=contName&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=true&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=asc&iSortingCols=1&_=1755523196428&iDisplayLength=${limit}&iDisplayStart=${page * limit}`

      if (searchValue) queryParams += `&filter=${searchValue}`

      return await MasterServices.vehicleTypeList(queryParams)
    },
    enabled: open,
  })

  const rows = vehicleTypeList?.data?.data?.aaData || []
  const totalRecords = Number(vehicleTypeList?.data?.data?.iTotalRecords) || 0
  const totalPages = Math.ceil(totalRecords / limit)

  const renderPageNumbers = () => {
    const pages = []
    const maxVisible = 3
    const startPage = Math.max(0, page - 1)
    const endPage = Math.min(totalPages - 1, page + maxVisible)

    if (startPage > 0) pages.push(<span key="start">...</span>)
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          size="sm"
          variant={i === page ? "default" : "outline"}
          onClick={() => setPage(i)}
        >
          {i + 1}
        </Button>
      )
    }
    if (endPage < totalPages - 1) pages.push(<span key="end">...</span>)

    return pages
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] w-full">
        <DialogHeader>
          <DialogTitle>Vehicle Types</DialogTitle>
        </DialogHeader>

        {/* Scrollable table with fixed headers */}
        <div className="max-h-[500px] overflow-y-auto border rounded-md">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="sticky top-0 bg-white z-10 text-left px-4 py-2 border-b w-1/3">
                  Code
                </th>
                <th className="sticky top-0 bg-white z-10 text-left px-4 py-2 border-b w-2/3">
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows.map((row: any, idx: number) => (
                  <tr
                    key={idx}
                    className="even:bg-gray-50 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      row.opt = 2; // Set opt to 3 for selection
                      onSelect(row);
                      onOpenChange(false)
                    }}
                  >
                    <td className="px-4 py-2 border-b">{row.contAakno}</td>
                    <td className="px-4 py-2 border-b">{row.contName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-center py-4">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          {/* Left: Rows per page */}
          <div className="flex items-center gap-2 text-sm">
            <Select
              value={String(limit)}
              onValueChange={(val) => {
                setLimit(Number(val))
                setPage(0)
              }}
            >
              <SelectTrigger className="w-20 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Right: Page navigation */}
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="outline"
              onClick={() => setPage(0)}
              disabled={page === 0}
              className="h-8 w-8"
            >
              {"<<"}
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="h-8 w-8"
            >
              {"<"}
            </Button>
            {renderPageNumbers()}
            <Button
              size="icon"
              variant="outline"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page + 1 >= totalPages}
              className="h-8 w-8"
            >
              {">"}
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => setPage(totalPages - 1)}
              disabled={page + 1 >= totalPages}
              className="h-8 w-8"
            >
              {">>"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
