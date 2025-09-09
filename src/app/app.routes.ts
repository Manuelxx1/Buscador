import { Routes } from '@angular/router';
import { Busqueda} from './busqueda/busqueda';

import { NotFound} from './not-found/not-found';
import { App} from './app';

export const routes: Routes = [
    { path: '', redirectTo: 'App', pathMatch: 'full' },
  { path: 'buscar', component: Busqueda },
  { path: '**', component: NotFound }

];
