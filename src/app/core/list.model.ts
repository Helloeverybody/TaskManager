import { Task } from './task.model';

export class List{
  public title: string
  public id: number
  public tasks: Task[]
  public color: string
  public isAuto: boolean
  public isDeletable: boolean

  constructor(title?: string, id?: number, color?: string, isAuto?: boolean, isDeletable?: boolean) {
      this.title = title || '';
      this.id = id || 0;
      this.color = color || '#000000';
      this.isAuto = isAuto || false;
      this.tasks = new Array<Task>();
      this.isDeletable = isDeletable || true;
  }
}

