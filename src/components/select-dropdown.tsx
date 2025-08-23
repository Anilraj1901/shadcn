// components/SelectDropdown.tsx
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface SelectDropdownProps {
  value?: string
  onValueChange: (value: string) => void
  placeholder?: string
  items: { label: string; value: string }[]
  className?: string
  disabled?: boolean
}

export function SelectDropdown({
  value,
  onValueChange,
  placeholder,
  items,
  className,
  disabled,
}: SelectDropdownProps) {
  const [open, setOpen] = useState(false);
  return (
    <Select
      value={value}
      onValueChange={(v) => {
        onValueChange(v)
        setOpen(false)
      }}
      open={open}
      onOpenChange={setOpen}
    >
      <SelectTrigger
        className={cn("w-full", className)}
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "NumpadEnter") {
            if (!open) {
              e.preventDefault()
              setOpen(true)
            }
            return
          }
          if (!open && (e.key === " " || e.key === "Spacebar" || e.key === "ArrowDown" || e.key === "ArrowUp")) {
            e.preventDefault()
            return
          }
        }}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent
        onCloseAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        {items.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
