import { Pipe, PipeTransform } from '@angular/core';
import { KeyValue } from '@angular/common';


@Pipe({ name: 'map' })
export class MapPipe implements PipeTransform {
  public transform<K, V>(map: Map<K, V>): KeyValue<K, V>[] {
    const entries = [];
    for (const [ key, value ] of map) { entries.push({ key, value }); }
    return entries;
  }
}
