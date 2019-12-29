import { Injectable } from '@angular/core';

import listaDeMusicas from '../../assets/lista_de_musicas.min.json';

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
