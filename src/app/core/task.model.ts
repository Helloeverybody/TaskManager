export class Task{
  title: string
  description: string
  startDateTime: Date
  endDateTime: Date
  listId: number
  repeat: RepeatMode
  emoji?: string
  file?: string
  geoPosition?: string

  constructor (title?: string, description?: string, listId?: number, startDateTime?: Date, endDateTime?: Date, repeat?: RepeatMode) {
    this.title = title || ""
    this.description = description || ""
    this.listId = listId || 0
    this.startDateTime = startDateTime || new Date()
    this.endDateTime = endDateTime || new Date()
    this.repeat = repeat || RepeatMode.None
  }
}

export enum RepeatMode {
  None,
  EveryDay,
  EveryWeek,
  EveryMonth,
  EveryYear
}
