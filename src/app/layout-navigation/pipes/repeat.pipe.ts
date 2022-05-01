import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'repeat',
})
export class RepeatPipe implements PipeTransform {
    public transform(value: number, args?: any): string {
        return RepeatMode[value];
    }
}

enum RepeatMode{
    'без повтора',
    'каждый день',
    'каждую неделю',
    'каждый месяц',
    'каждый год'
}
