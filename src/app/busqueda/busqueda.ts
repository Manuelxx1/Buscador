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
  resultados: any[] = []; // Para guardar los resultados de la API
  isLoading = false;      // Para manejar el estado de carga
  error: string | null = null; // Para manejar errores

  // Inyecta el servicio en el constructor
  constructor(private Busquedaservice: Busquedaservice) { }

  buscar() {
    const palabraBuscada = this.busquedaControl.value;

    if (!palabraBuscada) {
      this.resultados = [];
      return;
    }

    this.isLoading = true; // Empieza el estado de carga
    this.error = null;     // Limpia el error anterior

    // Llama al método del servicio y se suscribe al Observable
    this.Busquedaservice.buscar(palabraBuscada).subscribe({
      next: (data) => {
        // 'next' se ejecuta cuando la petición es exitosa
        console.log('Respuesta de la API:', data);
        this.resultados = data; // Asume que la respuesta tiene una propiedad 'items'
        this.isLoading = false;
      },
      error: (err) => {
        // 'error' se ejecuta si hay un problema con la petición
        console.error('Error al buscar:', err);
        this.error = 'Ocurrió un error al buscar. Por favor, inténtalo de nuevo.';
        this.isLoading = false;
      }
    });
  }




    
    

  
}
