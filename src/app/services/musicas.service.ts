import * as csv from 'csvtojson';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DbService } from './db.service';
import { MusicaRecord } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class MusicasService {
  private allMusicas: MusicaRecord[] = [];

  constructor(
    private dbService: DbService,
    private httpClient: HttpClient,
  ) {}

  public isMusicasLoaded(): boolean {
    return this.allMusicas.length > 0;
  }

  public saveToIndexedDb(lista: MusicaRecord[]) {
    const parsedLista = lista.map<MusicaRecord>(({ cantor, code, titulo }) => ({
      cantor: cantor.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
      titulo: titulo.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
      code: Number(code)
    }));

    return this.dbService.musicas.bulkAdd(parsedLista);
  }

  public async loadLista() {
    const lista = await this.downloadLista();
    return this.saveToIndexedDb(lista);
  }

  public getAll() {
    return this.dbService.musicas.toArray();
  }

  private downloadLista() {
    return this.httpClient.get('assets/lista.csv', { responseType: 'text' })
      .toPromise()
      .then<MusicaRecord[]>(csvData => csv().fromString(csvData));
  }

  private async loadFromIndexedDb() {
    this.allMusicas = await this.dbService.musicas.toArray();
  }
}
