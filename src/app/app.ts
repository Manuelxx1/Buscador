import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { Busquedaservice } from './busquedaservice';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder,FormGroup,Validators } from '@angular/forms';

import { ThemeToggleComponent } from './theme-toggle-component/theme-toggle-component';
import { Weather } from './weather/weather';
import { CryptoPrices } from './crypto-prices/crypto-prices';

import { CommonModule } from '@angular/common';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule,CommonModule,ReactiveFormsModule,RouterLink,ThemeToggleComponent,Weather,CryptoPrices],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit   {
  protected readonly title = signal('buscador');
  mensaje!: string;
dnidefinido!:any;
  campoinformaciondatabase:any;
  public datos: any[] = []; 
  datosporid:any;
  datosporidform:any;
  
    post: any;

enlace!:any;
 // emailenviado:any;
  cargando = false;
emailenviado: string | null = null;
emailError: string | null = null;


  
  
formulario: FormGroup;
  formulariologin: FormGroup;
  
formularioIntereses: FormGroup;
mensajeConfirmacion: string | null = null;

datosdesesion:any;
  
menuActivo = false;
  clock: string = '';

  toggleMenu() {
    this.menuActivo = !this.menuActivo;
  }

  ngOnInit() {
    this.actualizarReloj();
    setInterval(() => this.actualizarReloj(), 1000);
  }

  actualizarReloj() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const mins = now.getMinutes().toString().padStart(2, '0');
    this.clock = `🕒 ${hours}:${mins}`;
  }
  
  
  constructor(private miServicio: Busquedaservice,private fb: FormBuilder,private cdRef: ChangeDetectorRef) {
    //this.mensaje = this.miServicio.getData();
  this.formulario = this.fb.group({
    palabraclave: ['', Validators.required]
    //email: ['', [Validators.required, Validators.email]]
  });




  //formulario intereses
    this.formularioIntereses = this.fb.group({
    cripto: [false],
    tecnologia: [false],
    politica: [false],
    deportes: [false],
    email: ['', [Validators.required, Validators.email]]
  });
  
 
  //formulario login
    this.formulariologin = this.fb.group({
    nombre: ['', Validators.required],
      password: ['', Validators.required]
    //email: ['', [Validators.required, Validators.email]]
  });
    
  
  
  }

    formulariologin() {
if (this.formulariologin.valid) {
      console.log('Datos enviados:', this.formulariologin.value);

      this.miServicio.iniciarSesion(this.formulariologin.value.nombre,this.formulariologin.value.password).subscribe(data => {
      this.datosdesesion = data;
    });
    } else {
      this.formulariologin.markAllAsTouched();
    }
      
    }

      


  enviarPreferencias() {
this.emailenviado = null;
  this.emailError = null;
  this.cargando = true;

    
  const valores = this.formularioIntereses.value;
  const intereses = Object.keys(valores).filter(key => valores[key] === true && key !== 'email');
  const email = valores.email;

  this.miServicio.enviarCorreoPersonalizado({ email, intereses }).subscribe({
  next: res => {
    this.mensajeConfirmacion = res.message;
    alert('Éxito: ' + JSON.stringify(res));
    this.cargando = false;
  },
  error: err => {
    this.mensajeConfirmacion = 'Error: ' + JSON.stringify(err);
    //alert('Error: ' + JSON.stringify(err));
    this.cargando = false;
  }
});

  }

  




  
/*
         buscar(){

    this.mensaje = this.miServicio.getData();

    this.dnidefinido=30790186;

    // Llama al método del servicio y se suscribe al Observable
    
    
       

  this.miServicio.obtenerTodos().subscribe((data: any[]) => {
      this.datos = data; 
    this.cdRef.detectChanges();
    });
        
      
    this.miServicio.obtenerPorId(this.dnidefinido).subscribe(data => {
      this.datosporid = data;
      this.cdRef.detectChanges();
    });
    
        
      

           this.miServicio.getPost().subscribe(data => {
      this.post = data;
             this.cdRef.detectChanges();
    });
  }

  */
/*
  enviar() {
    if (this.formulario.valid) {
      console.log('Datos enviados:', this.formulario.value);

      this.miServicio.obtenerPorId(this.formulario.value.dni).subscribe(data => {
      this.datosporidform = data;
    });
    } else {
      this.formulario.markAllAsTouched();
    }
  }
  
*/
  
buscarcontenido() {
    if (this.formulario.valid) {
      console.log('Datos enviados:', this.formulario.value);

      this.miServicio.obtenerEnlace(this.formulario.value.palabraclave).subscribe(data => {
      this.enlace = data;
    });
    } else {
      this.formulario.markAllAsTouched();
    }
  }


 /*
    mostrarModal = false;

  cerrarModal() {
    this.mostrarModal = false;
  }
  
*/


  
  }     
