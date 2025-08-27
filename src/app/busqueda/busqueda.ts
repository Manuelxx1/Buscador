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
terminoBuscado: string = 'termino iniciado';
datos: string = 'Esto debería verse';
  constructor(private busquedaService: Busquedaservice) {}

  buscar() {

const valor = this.busquedaControl.value;
  this.terminoBuscado = valor ? valor : 'No llegó ningún valor';
    
  
    
    this.busquedaService.buscar(valor).subscribe({
      next: res => {
        this.resultado =   res;
     
      },
      error: err => {
        this.resultado = 'Error en la búsqueda';
      }
    });
  
}

  
}
