import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaDeMusicasComponent } from './pages/lista-de-musicas/lista-de-musicas.component';
import { MyListsComponent } from './pages/my-lists/my-lists.component';
import { AboutComponent } from './pages/about/about.component';
import { ShareComponent } from './share/share.component';


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
