import Dexie from 'dexie';

import { Injectable } from '@angular/core';

import { MusicaRecord } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private db: MyDatabase;

  constructor() {
    this.db = new MyDatabase();
    this.db.open().catch(err => console.error(`Open failed: ${ err.stack }`));
  }

  public get musicas() { return this.db.musicas; }
}

class MyDatabase extends Dexie {
  musicas: Dexie.Table<MusicaRecord, number>;

  constructor() {
    super('ListaDeMusicasDB');
    this.version(1).stores({ musicas: 'code,cantor,titulo' });
    this.musicas = this.table('musicas');
  }
}
