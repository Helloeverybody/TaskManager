import { Inject, Injectable } from '@angular/core';
import { IList } from '../pull/interfaces/list.interface';
import { map, Observable, Subscriber } from 'rxjs';
import { HandleList } from '../pull/models/handleList.model';
import { DataLoaderService } from './data-loader.service';
import { IDataLoader } from './dataLoaderInterface';

@Injectable()
export class ListsService {
    public handleLists!: HandleList[];

    private _lists : IList[] = [];

    constructor(
        @Inject('DataLoaderService')
        private _dataLoader: IDataLoader
    ) { }

    public getListsPull() : Observable<IList[]> {
        if (this._dataLoader.areListsLoaded) {
            return new Observable<IList[]>((sub : Subscriber<IList[]>) => {
                sub.next(this._lists);
                sub.complete();
            });
        } else {
            return this._dataLoader.loadListsData()
                .pipe(
                    map((lists: IList[]) => {
                        if (this._dataLoader.areListsLoaded) {
                            return this._lists;
                        } else {
                            this._lists.push(...lists);
                            this._dataLoader.areListsLoaded = true;
                        }

                        return lists;
                    })
                );
        }
    }

    public getHandleLists() : void {
        this.getListsPull()
            .subscribe((lists: IList[]) => {
                this.handleLists = lists.filter((list : IList) => !list.hasOwnProperty('filters')) || [];
            });
    }

    public addList(list: IList) : void {
        this.getListsPull()
            .subscribe((lists : IList[]) => {
                list.id = lists.length + 1;
                this._lists.push(list);
            });
    }

    public updateList(list: IList) : void {
        this.getListsPull()
            .subscribe((lists : IList[]) => {
                const index : number = lists.indexOf(list);
                lists.splice(index, 1, list);
            });
    }

    public deleteList(list: IList) : void {
        this.getListsPull()
            .subscribe((lists : IList[]) => {
                const index : number = lists.indexOf(list);
                lists.splice(index, 1);
            });
    }

    public clearData() : void {
        this._lists = [];
        this._dataLoader.areListsLoaded = false;
    }
}
