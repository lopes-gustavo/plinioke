import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { MusicaRecord, MusicasService } from '../services/musicas.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: [ './lista.component.scss' ]
})
export class ListaComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;

  musicaRecords: MusicaRecord[] = [];
  headElements = [
    { title: 'Código', key: 'code' },
    { title: 'Cantor', key: 'cantor' },
    { title: 'Título', key: 'titulo' },
  ];

  searchText = '';
  previousMusicaRecords: MusicaRecord[];

  constructor(
    private cdRef: ChangeDetectorRef,
    private musicasService: MusicasService,
  ) {}

  private _maxVisibleItems = 15;

  get maxVisibleItems() {
    return this._maxVisibleItems;
  }

  set maxVisibleItems(items: number) {
    this._maxVisibleItems = items;
    this.setMaxVisibleItems(items);
  }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    this.musicaRecords = this.musicasService.allMusicas;

    this.mdbTable.setDataSource(this.musicaRecords);
    this.musicaRecords = this.mdbTable.getDataSource();
    this.previousMusicaRecords = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    this.setMaxVisibleItems(15);
  }

  setMaxVisibleItems(numberOfItems: number) {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(numberOfItems);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    const searchText = this.searchText.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    if (!searchText) {
      this.mdbTable.setDataSource(this.previousMusicaRecords);
      this.musicaRecords = this.mdbTable.getDataSource();
    }

    if (searchText) {
      this.musicaRecords = this.mdbTable.searchLocalDataBy(searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }
}
