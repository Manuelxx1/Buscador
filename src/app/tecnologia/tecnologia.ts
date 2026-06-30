import { Component,OnInit} from '@angular/core';
import { Busquedaservice } from './busquedaservice';

@Component({
  selector: 'app-tecnologia',
  imports: [],
  templateUrl: './tecnologia.html',
  styleUrl: './tecnologia.css'
})

  
export class Tecnologia {
resultadosDeBusqueda:any[] = [];
  keywordParaBuscar:string="tecnologia";

  

        constructor(private miServicio: Busquedaservice){
      }

  ngOnInit() {
  // DISPARAMOS la búsqueda real en la base de datos con la palabra completa
  this.miServicio.searchProducts(this.keywordParaBuscar).subscribe({
    next: data => {
      // Guardamos TODOS los artículos que tengan esa keyword en el array general
      this.resultadosDeBusqueda = data;
      //this.resultadosobtenidos=true;
          //this.cargandobuscarcontenido=false;
    }
  });
}

}
