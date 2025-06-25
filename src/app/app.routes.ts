import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'countries',
        loadChildren: () =>
        import('./features/countries/countries.module').then(m => m.CountriesModule)
    },
    {
        path: 'logs',
        loadChildren: () =>
        import('./features/logs/logs.module').then(m => m.LogsModule)
    },
    {
        path: '',
        redirectTo: 'countries',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'countries'
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
],
  exports: [RouterModule],
  
})

export class AppRoutingModule { }