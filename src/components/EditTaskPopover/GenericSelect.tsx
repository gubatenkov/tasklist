import type { ComponentProps } from 'react'

import {
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectValue,
  SelectItem,
  Select,
} from '@/components/ui/select'

type TSelectItem = { value: string; label: string }

type Props<T extends TSelectItem> = {
  onValueChange: (value: T['value']) => void
  placeholder: string
  className?: string
  value: T['value']
  variants: T[]
} & ComponentProps<typeof Select>

export default function GenericSelect<T extends TSelectItem>({
  placeholder = 'Select a variant',
  className = '',
  variants,
  value,
  ...props
}: Props<T>) {
  return (
    <Select defaultValue="" value={value} {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {variants.map(({ value, label }) => (
            <SelectItem key={label + value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
