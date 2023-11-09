import type { ChangeEvent } from 'react'

import { useAppStore } from '@/stores/appStore.ts'

export default function InfoBar() {
  const { setBoardTitle, boardTitle } = useAppStore()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBoardTitle(e.target.value)
  }

  return (
    <div className="mb-3 pl-6 pt-6">
      <input
        className="title caret-z w-full whitespace-pre-wrap break-words px-0.5
        py-[0.125rem] text-[2rem] font-bold leading-[1.2] caret-zinc-900 outline-none"
        onChange={handleChange}
        placeholder="Untitled"
        value={boardTitle}
      />
    </div>
  )
}
