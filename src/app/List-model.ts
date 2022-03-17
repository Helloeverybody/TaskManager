export class List{
  name: string
  tasks: Array<any>
  color: string
  isAuto: boolean
  isDeletable: boolean

  constructor() {
    this.name = ""
    this.color = "#000000"
    this.isAuto = false
    this.tasks = new Array<any>()
    this.isDeletable = true
  }

  addTask () {

  }
}
