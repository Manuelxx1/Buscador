import { Routes } from '@angular/router';
import { Busqueda} from './busqueda/busqueda';

import { NotFound} from './Not-Found/not-Found';

export const routes: Routes = [
  { path: 'buscar', component: Busqueda },
  { path: '**', component: NotFound }

];
