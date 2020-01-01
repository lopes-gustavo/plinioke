import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MusicaRecord, MusicasService } from '../services/musicas.service';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: [ './my-lists.component.scss' ]
})
export class MyListsComponent implements OnInit {
  public listas: Map<string, MusicaRecord[]> = new Map();
  private storageKey = 'my_lists_ids';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private musicasService: MusicasService,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.listas.clear();
    const listas = this.loadListas();

    try {
      const listaFromUrl = this.parseUrl();
      listas.push(listaFromUrl);
      this.clearUrl();
    } catch (e) {
      console.error('URL INVALIDA ou em branco (tratar)');
    }

    listas.forEach(lista => this.listas.set(lista.listaName, lista.records));
    this.saveListas();
  }

  public saveListas() {
    const listasAsString = this.encodeListas();
    this.storageService.save(this.storageKey, listasAsString);
  }

  // TODO: Criar botão de editar e aí sim permitir edição
  public updateKey(oldListaName: string, newListaName: string) {
    const oldLista = this.listas.get(oldListaName);
    this.listas.delete(oldListaName);
    this.listas.set(newListaName, oldLista);
    this.saveListas();
  }

  private parseUrl() {
    // Exemplo: /my-lists?name=lentinhas&ids=4920,18483,19807,6197,9033,1039
    const params = this.route.snapshot.queryParamMap;
    const listaName = params.get('name');
    const ids = params.get('ids').split(',').map(Number);

    const records = this.musicasService.getMusicasByCodes(ids);

    if (records.length === 0 || listaName.length === 0) { throw new Error(); }

    return { listaName, records };
  }

  private loadListas() {
    const listasAsString = this.storageService.get<string[]>(this.storageKey) || [];
    return this.decodeListas(listasAsString);
  }

  private decodeListas(listasAsString: string[]) {
    return listasAsString.map(listaAsString => {
      const [ listaName, idsAsString ] = listaAsString.split('|');
      const ids = idsAsString.split(',').map(Number);
      const records = this.musicasService.getMusicasByCodes(ids);
      return { listaName, records };
    });
  }

  private encodeListas() {
    const out = [];
    for (const [ listaName, records ] of this.listas.entries()) {
      const idsString = records.map(record => record.code).join(',');
      out.push(listaName + '|' + idsString);
    }
    return out;
  }

  private clearUrl() {
    this.router.navigate([], { queryParams: {}, replaceUrl: true }).catch(err => console.error(err));
  }
}
