import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchEngineComponent } from './search-engine/search-engine.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search',
    component: SearchEngineComponent
  },
  {
    path: '**',
    redirectTo: '/search'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
