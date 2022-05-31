import { Observable } from 'rxjs';
import { IList } from '../pull/interfaces/list.interface';
import { Task } from '../../core/task.model';

export interface IDataLoader {
    areListsLoaded : boolean;
    areTasksLoaded : boolean;
    loadListsData() : Observable<IList[]>;
    loadTasksData() : Observable<Task[]>;
}
