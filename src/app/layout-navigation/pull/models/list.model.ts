import { ITag } from './filter.interface';

export class List {
    public title: string;

    public id: number;

    public color: string;

    public isAuto: boolean;

    public isEditable: boolean;

    public filters: any[];

    constructor(title?: string, id?: number, color?: string, isAuto?: boolean, isDeletable?: boolean, filters?: ITag[]) {
        this.title = title ?? '';
        this.id = id ?? 0;
        this.color = color ?? '#ffffff';
        this.isAuto = isAuto ?? false;
        this.isEditable = isDeletable ?? true;
        this.filters = filters ?? [];
    }
}
