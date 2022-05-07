import { IList } from './list.interface';
import { FormGroup } from '@angular/forms';

export interface IListCreator {
    listFromForm (form : FormGroup, id : number) : IList
    listFromData (listObject : any) : IList
}
