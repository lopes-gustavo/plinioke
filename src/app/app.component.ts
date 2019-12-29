import { Component, OnInit } from '@angular/core';
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
    if (!this.musicasService.isMusicasLoaded()) {
      await this.musicasService.loadLista();
      console.log('Done', await this.musicasService.getAll());
    }
  }
}
