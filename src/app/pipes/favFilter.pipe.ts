import { Pipe, PipeTransform } from '@angular/core';

import { MusicaRecord } from '../services/musicas.service';


@Pipe({ name: 'favFilter' })
export class FavFilterPipe implements PipeTransform {
  transform(records: MusicaRecord[], fav: boolean | undefined): MusicaRecord[] {
    if (!records) { return []; }
    if (fav === false) { return records; }
    return records.filter(record => record.favorite);
  }
}
