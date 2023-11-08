import { useAutosizeTextArea } from '@/lib/hooks.ts'
import { ComponentProps, useRef } from 'react'
import { cn } from '@/lib/utils.ts'

type TInputProps = ComponentProps<'textarea'>

type Props = {
  onChange?: TInputProps['onChange']
  value?: string
} & TInputProps

export default function Input({ className = '', ...props }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useAutosizeTextArea(ref.current, props.value ?? '')

  return (
    <textarea className={cn('outline-none', className)} ref={ref} {...props} />
  )
}
