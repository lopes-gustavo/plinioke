import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MusicaRecord, MusicasService } from '../../services/musicas.service';
import { StorageService } from '../../services/storage.service';
import { ModalOptions, ModalService } from '../../services/modal.service';
import { ConfirmDialog } from '../../dialogs/confirm/confirm.dialog';
import { InputDialog } from '../../dialogs/input/input.dialog';


@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: [ './my-lists.component.scss' ]
})
export class MyListsComponent implements OnInit {
  private storageKey = 'my_lists_ids';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private musicasService: MusicasService,
    private storageService: StorageService,
    private modalService: ModalService,
  ) { }

  private _listas: Map<string, MusicaRecord[]> = new Map();

  get listas(): Map<string, MusicaRecord[]> {
    return this._listas;
  }

  set listas(value: Map<string, MusicaRecord[]>) {
    this._listas = value;
    this.saveListas();
  }

  ngOnInit() {
    // TODO: DELETAR ["Rápidas|4920,18483,19807","2Rápidas|4920,18483,19807"]
    this.loadListasFromStorage();

    const listaFromUrl = this.parseUrl();
    if (listaFromUrl != null) {
      this.addNewLista(listaFromUrl.listaName, listaFromUrl.records);
      this.clearUrl();
    }
  }

  public createLista() {
    const modalOptions: ModalOptions<InputDialog> = {
      ignoreBackdropClick: true,
      data: {
        title: 'Criar nova lista',
        yesButton: 'Criar',
        noButton: 'Cancelar',
        placeholder: 'Nome da lista',
      }
    };
    const modalRef = this.modalService.show(InputDialog, modalOptions);
    modalRef.content.action.subscribe(listaName => {
      if (listaName) {
        this.addNewLista(listaName, []);
      }
    });
  }

  public renameLista(oldListaName: string) {
    const modalOptions: ModalOptions<InputDialog> = {
      ignoreBackdropClick: true,
      data: {
        title: 'Renomear lista',
        yesButton: 'Renomear',
        noButton: 'Cancelar',
        placeholder: 'Novo nome da lista',
        inputText: oldListaName,
      }
    };
    const modalRef = this.modalService.show(InputDialog, modalOptions);
    modalRef.content.action.subscribe(newListaName => {
      if (newListaName) {
        const listaArray = this.getListasFromStorage();
        const index = listaArray.findIndex(element => element[0] === oldListaName);
        listaArray[index][0] = newListaName;
        this.listas = new Map(listaArray);
      }
    });
  }

  public deleteLista(key: string) {
    const modalOptions = {
      ignoreBackdropClick: true,
      data: {
        title: 'Deletar?',
        body: 'Deseja realmente deletar a lista?',
        yesButton: 'Deletar',
        noButton: 'Cancelar',
      }
    };
    const modalRef = this.modalService.show(ConfirmDialog, modalOptions);
    modalRef.content.action.subscribe(shouldDelete => {
      if (shouldDelete) {
        this.listas.delete(key);
        this.listas = new Map(this.listas);
      }
    });
  }

  private addNewLista(listaName: string, records: MusicaRecord[]) {
    this.listas.set(listaName, records);
    this.listas = new Map(this._listas);
  }

  private saveListas() {
    const listasAsString = this.encodeListas();
    this.storageService.save(this.storageKey, listasAsString);
  }

  private parseUrl() {
    try {
      // Exemplo: /minhas-listas?name=lentinhas&ids=4920,18483,19807,6197,9033,1039
      const params = this.route.snapshot.queryParamMap;
      const listaName = params.get('name');
      const ids = params.get('ids').split(',').map(Number);

      const records = this.musicasService.getMusicasByCodes(ids);

      if (records.length === 0 || listaName.length === 0) { return null; }

      return { listaName, records };
    } catch (e) {
      console.error('URL INVALIDA ou em branco (tratar)');
      return null;
    }
  }

  private loadListasFromStorage() {
    this._listas.clear();
    const listasArray = this.getListasFromStorage();
    this._listas = new Map(listasArray);
  }

  private getListasFromStorage() {
    const listasAsString = this.storageService.get<string[]>(this.storageKey) || [];
    return this.decodeListas(listasAsString);
  }

  private encodeListas() {
    const out = [];
    for (const [ listaName, records ] of this._listas.entries()) {
      const idsString = records.map(record => record.code).join(',');
      out.push(listaName + '|' + idsString);
    }
    return out;
  }

  private decodeListas(listasAsString: string[]) {
    const lista: [ string, MusicaRecord[] ][] = [];

    listasAsString.forEach(listaAsString => {
      const [ listaName, idsAsString ] = listaAsString.split('|');
      const ids = idsAsString.split(',').map(Number);
      const records = this.musicasService.getMusicasByCodes(ids);
      lista.push([ listaName, records ]);
    });

    return lista;
  }

  private clearUrl() {
    this.router.navigate([], { queryParams: {}, replaceUrl: true }).catch(err => console.error(err));
  }
}
