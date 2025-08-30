import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { Busquedaservice } from '../busquedaservice';

@Component({
  selector: 'app-busqueda',
  imports: [CommonModule, ReactiveFormsModule] ,
  providers: [
        Busquedaservice 
      ],
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
  palabradni!:any;
  
  
  // Inyecta el servicio en el constructor
  constructor(private Busquedaservice: Busquedaservice) {
    this.busquedaControl.valueChanges.subscribe(valor => {
    this.palabradni = valor;
      });
  }

//this.palabradni=this.busquedaControl.value;
  servicioEjecutado = false;
  buscar(){

this.palabradni = this.busquedaControl.value; // Captura el valor actual del input
    // Llama al método del servicio y se suscribe al Observable
    
    this.Busquedaservice.obtenerPorId(this.palabradni).
    subscribe(respuesta=>
      {this.campoinformaciondatabase=respuesta.informacion;
       this.servicioEjecutado = true;
       this.palabradni = respuesta.dniRecibido +"la puta madre"; 
      });
  }
  
  }




    
    

  

