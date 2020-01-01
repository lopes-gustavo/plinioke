import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaDeMusicasComponent } from './lista-de-musicas/lista-de-musicas.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FavFilterPipe } from './pipes/favFilter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ListaDeMusicasComponent,
    FilterPipe,
    FavFilterPipe,
    ListaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ScrollingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MDBBootstrapModule.forRoot(),
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
