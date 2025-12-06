import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeletonRows({
  columnCount = 5,
  rowCount = 5,
}: {
  columnCount?: number;
  rowCount?: number;
}) {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b">
          {Array.from({ length: columnCount }).map((_, colIndex) => (
            <td key={colIndex} className="px-4 py-3">
              <Skeleton className="h-4 w-full" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
