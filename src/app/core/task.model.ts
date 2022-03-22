export class Task{
  id: number
  title: string
  description: string
  startDateTime: Date
  endDateTime: Date
  listId: number
  repeat: RepeatMode
  isCompleted: boolean
  emoji?: string
  file?: string
  geoPosition?: string

  constructor (id?: number, title?: string, description?: string, listId?: number, startDateTime?: Date, endDateTime?: Date, repeat?: RepeatMode) {
    this.id = id || 0
    this.title = title || ""
    this.description = description || ""
    this.listId = listId || 0
    this.startDateTime = startDateTime || new Date()
    this.endDateTime = endDateTime || new Date()
    this.repeat = repeat || RepeatMode.None
    this.isCompleted = false
  }
}

export enum RepeatMode {
  None,
  EveryDay,
  EveryWeek,
  EveryMonth,
  EveryYear
}
