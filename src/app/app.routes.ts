import { Routes } from '@angular/router';
import { Busqueda} from './busqueda/busqueda';

import { NotFound} from './not-found/not-found';
import { App} from './app';

export const routes: Routes = [

// el path búsqueda es momentánea hasta que se configure 
//  un rootcomponent para ello y también evitar crear 
  // un component como home no planeado para rellenar ese path
  // sólo para que funcione el 404
      { path: '', component:Busqueda },
  { path: 'buscar', component: Busqueda },
  { path: '**', component: NotFound }

];
