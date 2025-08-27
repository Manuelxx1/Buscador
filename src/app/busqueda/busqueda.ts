import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { Busquedaservice } from '../busquedaservice';

@Component({
  selector: 'app-busqueda',
  imports: [CommonModule, ReactiveFormsModule] ,
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css'
})
export class Busqueda {
  
busquedaControl = new FormControl('');
  resultado: any='';
terminoBuscado: string = '';
datos: string = 'Esto debería verse';
  constructor(private busquedaService: Busquedaservice) {}

  buscar() {

this.terminoBuscado = this.busquedaControl.value || 'No hay valor';

    
    this.busquedaService.buscar(this.terminoBuscado).subscribe({
      next: res => {
        this.resultado =   res;
     
      },
      error: err => {
        this.resultado = 'Error en la búsqueda';
      }
    });
  
}

  
}
