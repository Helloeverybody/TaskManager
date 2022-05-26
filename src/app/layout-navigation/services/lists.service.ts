import { Injectable } from '@angular/core';
import { IList } from '../pull/interfaces/list.interface';
import { map, Observable, Subscriber, tap } from 'rxjs';
import { HandleList } from '../pull/models/handleList.model';
import { DataLoaderService } from './data-loader.service';

@Injectable()
export class ListsService {
    private _lists : IList[] = [];

    constructor(private _dataLoader : DataLoaderService) { }

    public get listsPull() : Observable<IList[]> {
        if (this._dataLoader.areListsLoaded) {
            return new Observable<IList[]>((sub : Subscriber<IList[]>) => {
                sub.next(this._lists);
                sub.complete();
                console.log('ff');
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
                        console.log(this._lists);

                        return lists;
                    })
                );
        }
    }

    public get handleLists() : Observable<HandleList[]> {
        return this.listsPull
            .pipe(
                map((lists: IList[]) => {
                    return lists.filter((list : IList) => !list.hasOwnProperty('filters')) || [];
                })
            );
    }

    public addList(list: IList) : void {
        this.listsPull
            .subscribe((lists : IList[]) => {
                list.id = lists.length + 1;
                this._lists.push(list);
            });
    }

    public updateList(list: IList) : void {
        // возможно не будет работать так как ссылка на пул оч странно отдается
        this.listsPull
            .subscribe((lists : IList[]) => {
                const index : number = lists.indexOf(list);
                lists.splice(index, 1, list);
            });
    }

    public deleteList(list: IList) : void {
        // возможно не будет работать так как ссылка на пул оч странно отдается
        this.listsPull
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
