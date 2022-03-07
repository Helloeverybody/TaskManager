export class ListModel{
  name: string
  tasks: Array<any>
  color: string
  isAutomatic: boolean

  constructor(name: string, color: string = "", isAutomatic: boolean) {
    this.name = name
    this.color = color
    this.isAutomatic = isAutomatic
    this.tasks = new Array<any>()
  }
}
