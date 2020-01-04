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
  public listas: Map<string, MusicaRecord[]> = new Map();
  private storageKey = 'my_lists_ids';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private musicasService: MusicasService,
    private storageService: StorageService,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    // ["Rápidas|4920,18483,19807","2Rápidas|4920,18483,19807"]
    this.listas.clear();
    this.loadListasFromStorage();

    const listaFromUrl = this.parseUrl();
    if (listaFromUrl != null) {
      this.addNewLista(listaFromUrl.listaName, listaFromUrl.records);
      this.clearUrl();
    }

    this.saveListas();
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
        this.saveListas();
      }
    });
  }

  // TODO: Manter ordem das listas
  // TODO: Criar botão de editar e aí sim permitir edição
  public renameLista(oldListaName: string, newListaName: string) {
    const modalOptions: ModalOptions<InputDialog> = {
      ignoreBackdropClick: true,
      data: {
        title: 'Nome da lista',
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




    const oldLista = this.listas.get(oldListaName);
    this.listas.delete(oldListaName);
    this.listas.set(newListaName, oldLista);
    this.saveListas();
  }

  private addNewLista(listaName: string, records: MusicaRecord[]) {
    this.listas.set(listaName, records);
    this.listas = new Map(this.listas);
    this.saveListas();
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
    const listasAsString = this.storageService.get<string[]>(this.storageKey) || [];
    this.listas = this.decodeListas(listasAsString);
  }

  private encodeListas() {
    const out = [];
    for (const [ listaName, records ] of this.listas.entries()) {
      const idsString = records.map(record => record.code).join(',');
      out.push(listaName + '|' + idsString);
    }
    return out;
  }

  private decodeListas(listasAsString: string[]) {
    const lista = new Map<string, MusicaRecord[]>();

    listasAsString.forEach(listaAsString => {
      const [ listaName, idsAsString ] = listaAsString.split('|');
      const ids = idsAsString.split(',').map(Number);
      const records = this.musicasService.getMusicasByCodes(ids);
      lista.set(listaName, records);
    });

    return lista;
  }

  private clearUrl() {
    this.router.navigate([], { queryParams: {}, replaceUrl: true }).catch(err => console.error(err));
  }
}