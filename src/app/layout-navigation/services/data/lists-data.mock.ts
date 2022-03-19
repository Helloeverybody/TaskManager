import { List } from '../../../core/list.model'
import { Task } from '../../../core/task.model'

export let lists : Array<List> = [
{
  name: "Мой день",
  id: 1,
  tasks: [
    <Task>{ name: "Помыть пол" },
    <Task>{ name: "Помыть посуду" },
    <Task>{ name: "Почитать книгу" },
    <Task>{ name: "Написать алгоритм" },
    <Task>{ name: "Приготовить поесть" }
  ],
  color: "#d54040",
  isAuto: false,
  isDeletable: false
},
{
  name: "Входящие",
  id: 2,
  tasks: [<Task>{
    name: "Разложить книги"
  }],
  color: "#4e73ea",
  isAuto: false,
  isDeletable: false
}
]

