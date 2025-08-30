import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Busquedaservice } from '../busquedaservice';

@Component({
  selector: 'app-busqueda',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule ] ,
  providers: [
      Busquedaservice 
      ],
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css'
})
export class Busqueda {
  

mensaje!: string;
busquedaControl = new FormControl('');
  resultados: any[] = []; // Para guardar los resultados de la API
  enlaceDocumento: string | null = null; // Variable para almacenar el enlace
  isLoading = false;      // Para manejar el estado de carga
  error: string | null = null; // Para manejar errores
campoinformaciondatabase:any;
  palabradni!:any;
  dnidefinido:any;
  
  
  // Inyecta el servicio en el constructor
  constructor(private Busquedaservice: Busquedaservice) {
    this.busquedaControl.valueChanges.subscribe(valor => {
    this.palabradni = valor;

      this.mensaje = this.Busquedaservice.getData();
      });
  }

//this.palabradni=this.busquedaControl.value;
  servicioEjecutado = false;
  buscar(){

    this.mensaje = this.Busquedaservice.getData();
this.dnidefinido=30790186;
this.palabradni = this.busquedaControl.value; // Captura el valor actual del input
    // Llama al método del servicio y se suscribe al Observable
    
    this.Busquedaservice.obtenerPorId(this.dnidefinido).
    subscribe(respuesta=>
      {this.campoinformaciondatabase=respuesta.informacion;
       this.servicioEjecutado = true;
       this.palabradni = respuesta.dniRecibido +"la puta madre"; 
      });
  }
  
  }




    
    

  

