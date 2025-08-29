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
campoinformaciondatabase:any;
  palabradni:number;
  // Inyecta el servicio en el constructor
  constructor(private Busquedaservice: Busquedaservice) { }

  buscar() {
    const palabraBuscada = this.busquedaControl.value;
this.palabradni=palabraBuscada;
    if (!palabraBuscada) {
      
      return;
    }

    // CORRECCIÓN: Elimina cualquier espacio en blanco al inicio y final
    //const palabraLimpia = palabraBuscada.trim();


    this.isLoading = true; // Empieza el estado de carga
    this.error = null;     // Limpia el error anterior

    // Llama al método del servicio y se suscribe al Observable
    
    this.Busquedaservice.obtenerPorId(this.palabradni).
    subscribe(respuesta=>
      {this.campoinformaciondatabase=respuesta.informacion});
  }
  }




    
    

  
}
