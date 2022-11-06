import { IList } from './list.interface';
import { UntypedFormGroup } from '@angular/forms';

export interface IListCreator {
    listFromForm (form : UntypedFormGroup, id : number) : IList
    listFromData (listObject : any) : IList
}
