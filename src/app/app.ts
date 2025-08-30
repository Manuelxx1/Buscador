import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Busquedaservice } from './busquedaservice';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('buscador');
  mensaje: string;

  constructor(private miServicio: Busquedaservice) {
    //this.mensaje = this.miServicio.getData();
  }

         buscar(){

    this.mensaje = this.Busquedaservice.getData();

    
  }     
}
