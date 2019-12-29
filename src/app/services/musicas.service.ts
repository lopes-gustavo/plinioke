import { Injectable } from '@angular/core';

import listaDeMusicas from '../../assets/lista de musicas.json';

@Injectable({
  providedIn: 'root'
})
export class MusicasService {
  public get allMusicas(): MusicaRecord[] { return listaDeMusicas; }
}

export interface MusicaRecord {
  titulo: string;
  code: number;
  cantor: string;
}
