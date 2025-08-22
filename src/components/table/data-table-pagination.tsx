import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  totalCount: number;
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
  page: number;
}

import { useEffect } from "react";

export function DataTablePagination<TData>({
  table,
  totalCount,
  setLimit,
  setPage,
  page,
}: DataTablePaginationProps<TData>) {
  const pageSize = table.getState().pagination.pageSize;
  const totalPages = Math.ceil(totalCount / pageSize);

  // Clamp page if out of range
  useEffect(() => {
    if (page >= totalPages && totalPages > 0) {
      setPage(totalPages - 1);
    }
  }, [page, totalPages, setPage]);

  if (totalPages === 0) return null; // hide if no data

  const renderPageButtons = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
    } else {
      pages.push(0); // first page
      if (page > 2) pages.push("...");

      for (let i = Math.max(1, page - 1); i <= Math.min(totalPages - 2, page + 1); i++) {
        pages.push(i);
      }

      if (page < totalPages - 3) pages.push("...");
      pages.push(totalPages - 1); // last page
    }

    return pages.map((p, idx) =>
      p === "..." ? (
        <span key={idx} className="px-2 text-gray-400">
          ...
        </span>
      ) : (
        <Button
          key={p}
          variant={p === page ? "default" : "outline"}
          onClick={() => setPage(p as number)}
          className="h-8 w-8 p-0"
        >
          {(p as number) + 1}
        </Button>
      )
    );
  };

  return (
    <div className="flex items-center justify-between px-2">
      {/* Rows per page */}
      <div className="flex items-center space-x-2">
        <p className="hidden text-sm font-medium sm:block">Rows per page</p>
        <Select
          value={`${pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
            setLimit(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 50, 100].map((size) => (
              <SelectItem key={size} value={`${size}`}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Page info */}
      <div className="flex w-[150px] items-center justify-center text-sm font-medium">
        Page {page + 1} of {totalPages}
      </div>

      {/* Navigation */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => setPage(0)}
          disabled={page === 0}
        >
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>

        {renderPageButtons()}

        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages - 1}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => setPage(totalPages - 1)}
          disabled={page >= totalPages - 1}
        >
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

