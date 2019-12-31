import { Component, OnInit } from '@angular/core';

import { MusicaRecord, MusicasService } from '../services/musicas.service';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: [ './lista.component.scss' ]
})
export class ListaComponent implements OnInit {
  musicaRecords = this.musicasService.allMusicas;
  itemSize = 50;

  constructor(
    private musicasService: MusicasService,
  ) {}

  ngOnInit() {}

  changeFavorite(record: MusicaRecord) {
    record.favorite = !record.favorite;
  }
}
