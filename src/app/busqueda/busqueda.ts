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
  enlaceDocumento: string | null = null; // Variable para almacenar el enlace
  isLoading = false;      // Para manejar el estado de carga
  error: string | null = null; // Para manejar errores

  // Inyecta el servicio en el constructor
  constructor(private Busquedaservice: Busquedaservice) { }

  buscar() {
    const palabraBuscada = this.busquedaControl.value;

    if (!palabraBuscada) {
      
      return;
    }

    // CORRECCIÓN: Elimina cualquier espacio en blanco al inicio y final
    const palabraLimpia = palabraBuscada.trim();


    this.isLoading = true; // Empieza el estado de carga
    this.error = null;     // Limpia el error anterior

    // Llama al método del servicio y se suscribe al Observable
    this.Busquedaservice.buscar(palabraLimpia).subscribe({
      next: (data: string) => {
        // 'data' ahora es la cadena de texto con el enlace
        console.log('Enlace de la API:', data);
        this.enlaceDocumento = data;
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
