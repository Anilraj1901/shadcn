import { Skeleton } from "@/components/ui/skeleton"

export default function PageSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <Skeleton className="h-10 w-1/3" />  {/* title */}
      <Skeleton className="h-5 w-1/2" />   {/* subtitle */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
      </div>

      <Skeleton className="h-64 w-full rounded-lg" /> {/* main panel */}
    </div>
  );
}
