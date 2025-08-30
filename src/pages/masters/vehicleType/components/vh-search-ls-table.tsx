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
import MasterServices from "../../../../services/master";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface VhSearchLsTableViewProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  searchValue: string
  onSelect: (rowData: any) => void
}

export function VhSearchLsTableView({
  open,
  onOpenChange,
  searchValue = "",
  onSelect,
}: VhSearchLsTableViewProps) {
  const [page, setPage] = React.useState(0)
  const [limit, setLimit] = React.useState(10)
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1)
  const rowRefs = React.useRef<(HTMLTableRowElement | null)[]>([])



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

  React.useEffect(() => {
    if (open && rows.length > 0) {
      setSelectedIndex(0)
      // small delay ensures DOM is ready
      setTimeout(() => {
        rowRefs.current[0]?.focus()
      }, 0)
    }
  }, [open, rows])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[90vw] w-full"
      >
        <DialogHeader>
          <DialogTitle>Vehicle Types</DialogTitle>
        </DialogHeader>

        {/* Scrollable table with fixed headers */}
        <div className="max-h-[500px] overflow-y-auto border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sticky top-0 z-10 bg-background">Code</TableHead>
                <TableHead className="sticky top-0 z-10 bg-background">Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length > 0 ? (
                rows.map((row: any, idx: number) => (
                  <TableRow
                    key={idx}
                    tabIndex={0}
                    ref={(el) => {
                      rowRefs.current[idx] = el
                    }}
                    className={cn(
                      "cursor-pointer border-b hover:bg-accent focus:bg-blue-25",
                      selectedIndex === idx && "bg-accent",
                      "odd:bg-background even:bg-muted"
                    )}

                    onClick={() => {
                      row.opt = 2
                      setSelectedIndex(idx)
                      onSelect(row)
                      onOpenChange(false)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault()
                        const next = (idx + 1) % rows.length
                        setSelectedIndex(next)
                        rowRefs.current[next]?.focus()
                      }
                      if (e.key === "ArrowUp") {
                        e.preventDefault()
                        const prev = (idx - 1 + rows.length) % rows.length
                        setSelectedIndex(prev)
                        rowRefs.current[prev]?.focus()
                      }
                      if (e.key === "Enter") {
                        e.preventDefault()
                        row.opt = 2
                        setSelectedIndex(idx)
                        onSelect(row)
                        onOpenChange(false)
                      }
                    }}
                  >
                    <TableCell className="px-4 py-2">{row.contAakno}</TableCell>
                    <TableCell className="px-4 py-2">{row.contName}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-4">
                    No records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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
