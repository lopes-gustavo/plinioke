import { Injectable } from '@angular/core';

import listaDeMusicas from '../../assets/lista_de_musicas.min.json';

@Injectable({ providedIn: 'root' })
export class MusicasService {
  public get allMusicas(): MusicaRecord[] { return listaDeMusicas; }

  public getMusicaByCode(code: number) {
    return this.allMusicas.find(record => record.code === code);
  }

  public getMusicasByCodes(codes: number[]) {
    return codes.reduce((acc, id) => {
      const record = this.getMusicaByCode(id);
      if (record != null) { acc.push(record); }
      return acc;
    }, []);
  }
}

export interface MusicaRecord {
  titulo: string;
  code: number;
  cantor: string;
  favorite?: boolean;
}
