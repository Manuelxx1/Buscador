import { Routes } from '@angular/router';
import { Busqueda} from './busqueda/busqueda';
import { Politica} from './politica/politica';

import { Economia } from './economia/economia';
import { Deportes } from './deportes/deportes';
import { Cultura } from './cultura/cultura';
import { Registrarse } from './registrarse/registrarse';


import { Tecnologia } from './tecnologia/tecnologia';

import { InteligenciaArtificial1 } from './articulo-noticias/tecnologia/inteligencia-artificial/inteligencia-artificial1';
import { CiberSeguridad1 } from './articulo-noticias/tecnologia/ciberseguridad/ciberseguridad1';
import { CiberSeguridad2 } from './articulo-noticias/tecnologia/ciberseguridad/ciberseguridad2';

import { AuthCallback } from './auth-callback/auth-callback';


import { NotFound} from './not-found/not-found';
import { App} from './app';

export const routes: Routes = [

// el path búsqueda es momentánea hasta que se configure 
//  un rootcomponent para ello y también evitar crear 
  // un component como home no planeado para rellenar ese path
  // sólo para que funcione el 404
     { path: '', component:Busqueda },
    { path: 'politica', component: Politica },
  { path: 'economia', component: Economia },
    { path: 'deportes', component: Deportes },
    { path: 'cultura', component: Cultura },
    { path: 'tecnologia', component: Tecnologia },
  { path: 'registrarse', component: Registrarse },
  {path: 'articulo-noticias-tecnologia-inteligencia-artificial1', component: InteligenciaArtificial1 },
                                {path: 'articulo-noticias/tecnologia/ciberseguridad/ciberseguridad1', component: CiberSeguridad1 },
  {path: 'articulo-noticias/tecnologia/ciberseguridad/ciberseguridad2', component: CiberSeguridad2 },
  { path: 'auth/callback', component: AuthCallback },
  { path: '**', component: NotFound }

];
