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
  resultado: string = '<p style="color: green;">Esto viene de resultado</p>';

datos: string = 'Esto debería verse';
  constructor(private busquedaService: Busquedaservice) {}

  buscar() {

const termino = this.busquedaControl.value?.trim();
  this.resultado = `<a href="https://ejemplo.com" target="_blank">Ver explicación para: ${termino}</a>`;
    
  if (termino) {
    this.busquedaService.buscar(termino).subscribe({
      next: res => {
        this.resultado = res;
      },
      error: err => {
        this.resultado = 'Error en la búsqueda';
      }
    });
  }
}

  
}
