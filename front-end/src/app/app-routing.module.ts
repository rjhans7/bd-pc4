import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoadDataComponent } from './load-data/load-data.component';
import { SearchEngineComponent } from './search-engine/search-engine.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'load',
    component: LoadDataComponent
  },
  {
    path: 'search',
    component: SearchEngineComponent
  },
  {
    path: '**',
    redirectTo: '/algorithm'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
