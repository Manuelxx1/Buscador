import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Busquedaservice } from './busquedaservice';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('buscador');
  mensaje!: string;
dnidefinido!:any;
  campoinformaciondatabase:any;
  persona: any[] = []; 
    post: any;
  constructor(private miServicio: Busquedaservice) {
    //this.mensaje = this.miServicio.getData();
  }

         buscar(){

    this.mensaje = this.miServicio.getData();

    this.dnidefinido=30790186;

    // Llama al método del servicio y se suscribe al Observable
    
    
       

  this.miServicio.obtenerPorId().subscribe({
    next: (data: any) => { // <-- aquí la data es de tipo `any` para evitar errores
      // Verifica que los datos sean un array antes de asignarlos
      if (Array.isArray(data)) {
        this.persona = data;
      } else {
        // Si no es un array (por ejemplo, es un solo objeto), puedes envolverlo en uno
        this.persona = [data]; 
      }
      console.log('Datos recibidos:', this.persona);
    },
    error: (error) => {
      console.error('Ocurrió un error al obtener las personas:', error);
    }
        
      });

           this.miServicio.getPost().subscribe(data => {
      this.post = data;
    });
  }
  
  }     
