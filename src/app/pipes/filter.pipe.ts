import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform<T>(items: T[], searchText: string): T[] {
    if (!items) { return []; }
    if (!searchText) { return items; }

    const localeSearchText = normalize(searchText);
    return items.filter(it => normalize(obj2String(it)).includes(localeSearchText));
  }
}

const normalize = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();

const obj2String = (obj) => Object.values(obj).join('////');
