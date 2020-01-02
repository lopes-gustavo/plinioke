import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class MusicasService {
  private listaDeMusicas: MusicaRecord[];

  public loadListaDeMusicas() {
    this.listaDeMusicas = require('../../assets/lista_de_musicas.min.json');
  }

  public get allMusicas(): MusicaRecord[] { return this.listaDeMusicas; }

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
