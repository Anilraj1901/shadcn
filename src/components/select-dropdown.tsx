// components/SelectDropdown.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

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
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={cn('w-full', className)} disabled={disabled}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
