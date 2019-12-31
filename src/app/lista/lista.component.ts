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
  musicaRecords = this.musicasService.allMusicas;

  constructor(
    private musicasService: MusicasService,
    private storageService: StorageService,
  ) {}

  ngOnInit() {
    this.favoriteList = this.storageService.get('favorite') || {};
    this.musicaRecords.forEach(record => record.favorite = this.favoriteList[record.code] === true);
  }

  changeFavorite(record: MusicaRecord) {
    record.favorite = !record.favorite;

    if (record.favorite) {
      this.favoriteList[record.code] = true;
    } else {
      delete this.favoriteList[record.code];
    }

    this.storageService.save('favorite', this.favoriteList);
  }
}
