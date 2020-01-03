import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaDeMusicasComponent } from './lista-de-musicas/lista-de-musicas.component';
import { ShareComponent } from './share/share.component';
import { MyListsComponent } from './my-lists/my-lists.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  { path: '', component: ListaDeMusicasComponent, pathMatch: 'full' },
  { path: 'compartilhar', component: ShareComponent },
  { path: 'minhas-listas', component: MyListsComponent },
  { path: 'sobre', component: AboutComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
