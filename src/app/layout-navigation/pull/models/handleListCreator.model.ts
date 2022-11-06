import { IListCreator } from '../interfaces/listCreator.interface';
import { UntypedFormGroup } from '@angular/forms';
import { HandleList } from './handleList.model';

export class HandleListCreator implements IListCreator{
    private static isList (dataObject : any) : boolean {
        return dataObject.hasOwnProperty('title') &&
            dataObject.hasOwnProperty('id') &&
            dataObject.hasOwnProperty('color') &&
            dataObject.hasOwnProperty('isEditable');
    }

    public listFromForm (form : UntypedFormGroup, id : number) : HandleList {
        return {
            title: form.value.title,
            id: id,
            color: form.value.color,
            isEditable: true
        };
    }

    public listFromData (listObject : any) : HandleList {
        if (HandleListCreator.isList(listObject)) {
            return {
                title: listObject.title,
                id: listObject.id,
                color: listObject.color,
                isEditable: listObject.isEditable
            };
        } else {
            throw('Wrong data object!');
        }
    }
}
