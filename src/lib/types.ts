export type Brand<K, T> = K & { __brand: T }
export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}
export type ColId = Brand<string, 'ColId'>
export type TaskId = Brand<string, 'TaskId'>
export type TaskPriority =
  | {
      label: 'Middle'
      value: '1'
    }
  | {
      label: 'High'
      value: '2'
    }
  | {
      label: 'Low'
      value: '0'
    }

export type TColumn = {
  icon: 'CheckCircle2' | 'Circle' | 'Clock3'
  tasks: TaskId[] | []
  color: string
  name: string
  id: ColId
}

export type TTask = {
  priority: TaskPriority
  description: string
  title: string
  id: TaskId
}
