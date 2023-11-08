import { ComponentProps, useEffect, useState, useRef } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input.tsx'
import { cn } from '@/lib/utils'

type Props = ComponentProps<'input'>

export default function Search(props: Props) {
  const [isInFocus, setIsInFocus] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isInFocus) inputRef.current?.focus()
  }, [isInFocus])

  return (
    <div className="relative bg-white">
      <SearchIcon
        className="absolute left-[9px] top-[1px] text-zinc-700/50"
        height={26}
        width={16}
      />
      <Input
        className={cn(
          'h-7 cursor-pointer rounded-[2rem] border border-zinc-200 pl-7',
          'pb-[2px] pt-[3px] text-sm text-zinc-700 placeholder:text-zinc-700/50',
          'transition-all duration-150 ease-in-out',
          isInFocus ? 'w-[100%] pr-3' : 'w-[50%] pr-0'
        )}
        placeholder={isInFocus ? 'Type to search...' : 'Search'}
        onBlur={() => setIsInFocus(false)}
        onFocus={() => setIsInFocus(true)}
        type="text"
        {...props}
        ref={inputRef}
      />
    </div>
  )
}

{
  /*<Button*/
}
{
  /*  className="mr-2 h-7 rounded-[2rem] py-0 pl-2 pr-3 font-normal text-zinc-700/80"*/
}
{
  /*  onClick={() => setIsActive((prev) => !prev)}*/
}
{
  /*  variant="outline"*/
}
{
  /*>*/
}
{
  /*  <SearchIcon className="mr-1.5" height={28} width={16} />*/
}
{
  /*  Search*/
}
{
  /*</Button>*/
}
