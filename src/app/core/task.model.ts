export class Task {
    public id: number;

    public title: string;

    public description: string;

    public startDateTime: Date;

    public endDateTime: Date;

    public listId: number;

    public repeat: RepeatMode;

    public isCompleted: boolean;

    public emoji?: string;

    public file?: string;

    public geoPosition?: string;

    constructor(id?: number, title?: string, description?: string, listId?: number, startDateTime?: Date, endDateTime?: Date, repeat?: RepeatMode) {
        this.id = id || 0;
        this.title = title || '';
        this.description = description || '';
        this.listId = listId || 0;
        this.startDateTime = startDateTime || new Date();
        this.endDateTime = endDateTime || new Date();
        this.repeat = repeat || RepeatMode.none;
        this.isCompleted = false;
    }
}

export enum RepeatMode {
    none,
    everyDay,
    everyWeek,
    everyMonth,
    everyYear
}
