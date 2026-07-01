import { Component } from '@angular/core';
import { Busquedaservice } from '../../../busquedaservice';

import { CommonModule } from '@angular/common';

import { Comentarios } from '../../../comentarios/comentarios';

@Component({
  selector: 'app-ciberseguridad1',
  imports: [CommonModule,Comentarios],
  templateUrl: './ciberseguridad1.html',
  styleUrl: './ciberseguridad1.css'
})
export class CiberSeguridad1 
{

  resultadosDeBusqueda:any;
  keywordParaBuscar:number=2;

  constructor(private miServicio: Busquedaservice){
      }

  ngOnInit() {
  // DISPARAMOS la búsqueda real en la base de datos con la palabra completa
  this.miServicio.searchArticulosPorId(this.keywordParaBuscar).subscribe({
    next: data => {
      // Ahora data no es una lista, es el artículo directo
      this.resultadosDeBusqueda = data;
      //this.resultadosobtenidos=true;
          //this.cargandobuscarcontenido=false;
    }
  });
  }

}
