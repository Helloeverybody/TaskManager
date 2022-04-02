import { List } from '../../core/list.model';
import { Injectable } from '@angular/core';
import { lists } from './data/lists-data.mock';

@Injectable({ providedIn: 'root' })
export class ListsDataService {

    public get listsPull () : List[] {
        return lists;
    }

    constructor() { }

    public addList (list: List) : void {
        list.id = lists.length + 1;
        lists.push(list);
    }

    public addTask () : void {

    }
}
