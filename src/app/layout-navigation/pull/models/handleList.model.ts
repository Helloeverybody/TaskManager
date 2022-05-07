import { IList } from '../interfaces/list.interface';

export class HandleList implements IList{
    public title: string;

    public id: number;

    public color: string;

    public isEditable: boolean;

    constructor(title?: string, id?: number, color?: string, isDeletable?: boolean) {
        this.title = title ?? '';
        this.id = id ?? 0;
        this.color = color ?? '#ffffff';
        this.isEditable = isDeletable ?? true;
    }
}
