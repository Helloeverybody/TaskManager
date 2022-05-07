import { HandleList } from '../../pull/models/handleList.model';
import { IList } from '../../pull/interfaces/list.interface';
import { AutoList } from '../../pull/models/autoList.model';

export const sevaLists : IList[] = [
    new HandleList('Мой день', 1, '#d54040', false),
    new HandleList('Входящие', 2, '#4e73ea', false),
    new HandleList('Севин списочек', 3, '#2f6b2f', false),
    new AutoList('Автоматический списочек', 4, '#676c38', false, []),
];

export const ilyaLists : IList[] = [
    new HandleList('Мой день', 1, '#d54040', false),
    new HandleList('Входящие', 2, '#4e73ea', false),
    new HandleList('Илюшин списочек', 3, '#2f6b2f', false),
    new AutoList('Автоматический списочек', 4, '#676c38', false, []),
];
