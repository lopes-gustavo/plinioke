import * as csv from 'csvtojson';

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DbService } from './services/db.service';
import { MusicasService } from './services/musicas.service';

export interface MusicaRecord {
  titulo: string;
  code: number;
  cantor: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {

  constructor(
    private musicasService: MusicasService,
  ) {}

  async ngOnInit() {
    debugger
    if (!this.musicasService.isMusicasLoaded()) {
      await this.musicasService.loadLista();
      console.log('Done', await this.musicasService.getAll());
    }
  }
}
