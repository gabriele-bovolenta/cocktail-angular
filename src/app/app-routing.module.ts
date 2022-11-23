import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { LookUpDrinkByIdResolver } from './resolver/lookup-drink';


const routes: Routes = [
  { path: "home", component: HomeComponent},
  { path: "home/:search", component: HomeComponent},
  {
    path: 'drink/:idDrink',
    component: DetailsComponent,
    resolve: {
      drink: LookUpDrinkByIdResolver
    }
  },
  { path: "", redirectTo: "home", pathMatch: 'full'},
  { path: "**", component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }