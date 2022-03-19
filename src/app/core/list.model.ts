import { Task } from './task.model'

export class List{
  name: string
  id: number
  tasks: Array<Task>
  color: string
  isAuto: boolean
  isDeletable: boolean

  constructor() {
    this.name = ""
    this.id = 0
    this.color = "#000000"
    this.isAuto = false
    this.tasks = new Array<any>()
    this.isDeletable = true
  }

  addTask? () {

  }
}

