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
import { FilterPipe } from './pipes/filter.pipe';
import { FavFilterPipe } from './pipes/favFilter.pipe';
import { MapPipe } from './pipes/map.pipe';
import { ListaDeMusicasComponent } from './pages/lista-de-musicas/lista-de-musicas.component';
import { MyListsComponent } from './pages/my-lists/my-lists.component';
import { AboutComponent } from './pages/about/about.component';
import { ShareComponent } from './share/share.component';
import { ConfirmDialog } from './dialogs/confirm/confirm.dialog';
import { InputDialog } from './dialogs/input/input.dialog';


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
    InputDialog,
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
    InputDialog,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
