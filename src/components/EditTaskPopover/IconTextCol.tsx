import type { LucideIcon } from 'lucide-react'

type Props = {
  icon: LucideIcon
  text: string
}

export default function IconTextCol({ icon: Icon, text }: Props) {
  return (
    <div className="flex w-48 items-center text-zinc-500">
      <Icon height={18} width={18} />
      <span className="ml-1.5 text-sm">{text}</span>
    </div>
  )
}
