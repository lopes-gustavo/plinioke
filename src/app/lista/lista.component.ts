import { Component, OnInit } from '@angular/core';

import { MusicaRecord, MusicasService } from '../services/musicas.service';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: [ './lista.component.scss' ]
})
export class ListaComponent implements OnInit {
  private favoriteList = {};
  private storageFavoritosKey = 'favorites';

  musicaRecords = this.musicasService.allMusicas;

  constructor(
    private musicasService: MusicasService,
    private storageService: StorageService,
  ) {}

  ngOnInit() {
    this.favoriteList = this.storageService.get(this.storageFavoritosKey) || {};
    this.musicaRecords.forEach(record => record.favorite = this.favoriteList[record.code] === true);
  }

  changeFavorite(record: MusicaRecord) {
    record.favorite = !record.favorite;

    if (record.favorite) {
      this.favoriteList[record.code] = true;
    } else {
      delete this.favoriteList[record.code];
    }

    this.storageService.save(this.storageFavoritosKey, this.favoriteList);
  }
}
