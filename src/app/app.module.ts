import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaDeMusicasComponent } from './lista-de-musicas/lista-de-musicas.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FavFilterPipe } from './pipes/favFilter.pipe';
import { MapPipe } from './pipes/map.pipe';
import { ShareComponent } from './share/share.component';
import { MyListsComponent } from './my-lists/my-lists.component';
import { AboutComponent } from './about/about.component';
import { ConfirmDialog } from './dialogs/confirm/confirm.dialog';


@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    FavFilterPipe,
    MapPipe,

    ListaDeMusicasComponent,
    ShareComponent,
    MyListsComponent,
    AboutComponent,

    ConfirmDialog,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    ScrollingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MDBBootstrapModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  entryComponents: [
    ConfirmDialog,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
