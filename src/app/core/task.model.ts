export class Task{
  name: string
  description: string
  isCompleted: boolean
  startDateTime: Date
  endDateTime: Date
  listId: number
  colorOrEmoji?: string
  file?: string
  geoPosition?: string

  constructor () {
    this.name = ""
    this.description = ""
    this.isCompleted = false
    this.startDateTime = new Date(0)
    this.endDateTime = new Date(0)
    this.listId = 0
  }
}
