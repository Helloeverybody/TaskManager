import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'repeat',
})
export class RepeatPipe implements PipeTransform {
    public transform(value: number | undefined, args?: any): string | undefined {
        if (value !== undefined) {
            return RepeatMode[value];
        } else {
            return 'undefined';
        }
    }
}

enum RepeatMode{
    'без повтора',
    'каждый день',
    'каждую неделю',
    'каждый месяц',
    'каждый год'
}
