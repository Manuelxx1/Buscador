import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Busquedaservice } from './busquedaservice';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('buscador');
  mensaje!: string;
dnidefinido!:any;
  campoinformaciondatabase:any;
  
    post: any;
  constructor(private miServicio: Busquedaservice) {
    //this.mensaje = this.miServicio.getData();
  }

         buscar(){

    this.mensaje = this.miServicio.getData();

    this.dnidefinido=30790186;

    // Llama al método del servicio y se suscribe al Observable
    
    this.miServicio.obtenerPorId(this.dnidefinido).
    subscribe(respuesta=>
      {this.campoinformaciondatabase=respuesta[0].informacion;
       
        
      });

           this.miServicio.getPost().subscribe(data => {
      this.post = data;
    });
  }
  
  }     
