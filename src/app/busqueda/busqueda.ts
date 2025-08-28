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
  


  // 1. Define el FormControl
  // El valor inicial de la caja de texto será un string vacío.
  busquedaControl = new FormControl('');

  constructor() { }

  // 2. Implementa la función 'buscar()'
  // Esta función se ejecuta cuando se hace clic en el botón "Buscar".
  buscar() {
    // 3. Accede al valor del formulario a través de .value
    const palabraBuscada = this.busquedaControl.value;

    // Aquí puedes hacer lo que necesites con la palabra,
    // por ejemplo, mostrarla en la consola, o enviarla a un servicio.
    console.log('Se envió la palabra:', palabraBuscada);


    
    // Puedes agregar lógica adicional, como enviar la palabra a una API.
    // Ejemplo: this.servicioDeBusqueda.buscar(palabraBuscada).subscribe(...);
  }

}



    
    

  
}
