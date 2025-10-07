import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { Busquedaservice } from '../busquedaservice';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { ThemeToggleComponent } from './theme-toggle-component/theme-toggle-component';
//import { Weather } from './weather/weather';
//import { CryptoPrices } from './crypto-prices/crypto-prices';

import { CommonModule } from '@angular/common';

import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-registrarse',
  imports: [ HttpClientModule,CommonModule,ReactiveFormsModule,RouterLink ],
  templateUrl: './registrarse.html',
  styleUrl: './registrarse.css'
})
export class Registrarse {
  formularioregistro:FormGroup;
datosdesesion:any;
constructor(private miServicio: Busquedaservice,private fb: FormBuilder,private cdRef: ChangeDetectorRef,private router: Router) {
    //this.mensaje = this.miServicio.getData();
  //formulario registro
    this.formularioregistro = this.fb.group({
    nombre: ['', Validators.required],
      password: [
    '',
    [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+=\\-{}\

\[\\]

:;"\'<>,.?/]).{8,}$'
      )
    ]
  ]
    //email: ['', [Validators.required, Validators.email]]
  });
    

}//constructor

  formularioregistrodatos() {
if (this.formularioregistro.valid) {
      this.miServicio.registrarDatos(this.formularioregistro.value.nombre,this.formularioregistro.value.password).subscribe({
      next: res => {
    // Login exitoso
    console.log('Login OK:', res);
   this.datosdesesion = res;
        alert("datos registrados"); //mensaje del.backend por ejemplo: "Login exitoso"
    this.router.navigate(['/']); // redirige al perfil
  },
  error: err => {
    // Login fallido
    console.error('Error de login:', err);
    alert('Nombre o contraseña ya existen');
  }
});
  } else {
    alert('Por favor completá todos los campos');
  }
      
    }
  
}
