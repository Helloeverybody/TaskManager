import { IListCreator } from '../interfaces/listCreator.interface';
import { UntypedFormGroup } from '@angular/forms';
import { AutoList } from './autoList.model';

export class AutoListCreator implements IListCreator{
    private static isList (dataObject : any) : boolean {
        return dataObject.hasOwnProperty('title') &&
            dataObject.hasOwnProperty('id') &&
            dataObject.hasOwnProperty('color') &&
            dataObject.hasOwnProperty('isEditable') &&
            dataObject.hasOwnProperty('filters');
    }

    public listFromForm (form : UntypedFormGroup, id : number) : AutoList {
        return {
            title: form.value.title,
            id: id,
            color: form.value.color,
            isEditable: true,
            filters: form.value.filters
        };
    }

    public listFromData (listObject : any) : AutoList {
        if (AutoListCreator.isList(listObject)) {
            return {
                title: listObject.title,
                id: listObject.id,
                color: listObject.color,
                isEditable: listObject.isEditable,
                filters: listObject.filters
            };
        } else {
            throw('Wrong data object!');
        }
    }
}
