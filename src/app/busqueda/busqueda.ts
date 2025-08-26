import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-busqueda',
  imports: [CommonModule, ReactiveFormsModule] ,
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css'
})
export class Busqueda {
  
busquedaControl = new FormControl('');
  resultado: string | null = null;

  buscar() {
    const valor = this.busquedaControl.value?.trim();
    if (valor) {
      // Simulamos una búsqueda
      this.resultado = `Buscaste: "${valor}"`;
    } else {
      this.resultado = 'No ingresaste ningún término.';
    }
  }
}
