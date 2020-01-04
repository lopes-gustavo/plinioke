import { Component, OnInit } from '@angular/core';

import { MusicaRecord, MusicasService } from '../../services/musicas.service';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-lista-de-musicas',
  templateUrl: './lista-de-musicas.component.html',
  styleUrls: [ './lista-de-musicas.component.scss' ]
})
export class ListaDeMusicasComponent implements OnInit {
  private favoritoIds: {[key: number]: boolean} = {};
  private storageFavoritosKey = 'favorites';

  musicaRecords = this.musicasService.allMusicas;

  constructor(
    private musicasService: MusicasService,
    private storageService: StorageService,
  ) {}

  ngOnInit() {
    this.favoritoIds = this.storageService.get(this.storageFavoritosKey) || {};
    this.musicaRecords.forEach(record => record.favorite = this.favoritoIds[record.code]);
  }

  changeFavorite(record: MusicaRecord) {
    record.favorite = !record.favorite;

    if (record.favorite) {
      this.favoritoIds[record.code] = true;
    } else {
      delete this.favoritoIds[record.code];
    }

    this.storageService.save(this.storageFavoritosKey, this.favoritoIds);
  }
}
