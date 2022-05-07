import { ITag } from '../interfaces/filter.interface';
import { IList } from '../interfaces/list.interface';

export class AutoList implements IList{
    public title: string;

    public id: number;

    public color: string;

    public isEditable: boolean;

    public filters : ITag[];

    constructor(title?: string, id?: number, color?: string, isDeletable?: boolean, filters?: ITag[]) {
        this.title = title ?? '';
        this.id = id ?? 0;
        this.color = color ?? '#ffffff';
        this.isEditable = isDeletable ?? true;
        this.filters = filters ?? [];
    }
}
