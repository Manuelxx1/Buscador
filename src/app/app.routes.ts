import { Routes } from '@angular/router';
import { Busqueda} from './busqueda/busqueda';

import { NotFound} from './not-found/not-found';

export const routes: Routes = [
    
  { path: 'buscar', component: Busqueda },
  { path: '**', component: NotFound }

];
