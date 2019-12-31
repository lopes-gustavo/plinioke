import { Pipe, PipeTransform } from '@angular/core';
import { MusicaRecord } from '../services/musicas.service';


@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  private static normalize(str) {
    return str.normalize('NFD') // Separa "é" para 'e'+'´'
              .replace(/[\u0300-\u036f]/g, '') // Remove os acentos
              .replace(/[ ]/g, '') // Remove os espaços das palavras
              .toLocaleLowerCase();
  }

  private static obj2String(obj) {
    return Object.values(obj).join('////');
  }

  public transform(records: MusicaRecord[], searchText: string): MusicaRecord[] {
    if (!records) { return []; }
    if (!searchText) { return records; }

    const localeSearchText = FilterPipe.normalize(searchText)
                                       .replace(/^0/, '');

    return records.filter(record => {
      const objString = FilterPipe.obj2String(record);
      const localeObjString = FilterPipe.normalize(objString);
      return localeObjString.includes(localeSearchText);
    });
  }
}
