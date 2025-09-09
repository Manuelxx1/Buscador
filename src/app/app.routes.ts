import { Routes } from '@angular/router';
import { Busqueda} from './busqueda/busqueda';
import { App } from './app';

import { NotFound} from './not-found/not-found';

export const routes: Routes = [
    { path: '', component: App },
  { path: 'buscar', component: Busqueda },
  { path: '**', component: NotFound }

];
