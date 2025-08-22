import { Loader2 } from "lucide-react"

export function TableLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
    </div>
  )
}
