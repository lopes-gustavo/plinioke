import { Injectable } from '@angular/core';

import listaDeMusicas from '../../assets/lista_de_musicas.min.json';

@Injectable({
  providedIn: 'root'
})
export class MusicasService {
  // TODO: Make async. Add favorite from localstorage
  public get allMusicas(): MusicaRecord[] { return listaDeMusicas; }
}

export interface MusicaRecord {
  titulo: string;
  code: number;
  cantor: string;
  favorite?: boolean;
}
