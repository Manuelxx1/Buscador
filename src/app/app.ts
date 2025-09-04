import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Busquedaservice } from './busquedaservice';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder,FormGroup,Validators } from '@angular/forms';


import { CommonModule } from '@angular/common';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule,CommonModule,ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('buscador');
  mensaje!: string;
dnidefinido!:any;
  campoinformaciondatabase:any;
  public datos: any[] = []; 
  datosporid:any;
  datosporidform:any;
  
    post: any;

enlace:any;
formulario: FormGroup;
  
  constructor(private miServicio: Busquedaservice,private fb: FormBuilder,private cdRef: ChangeDetectorRef) {
    //this.mensaje = this.miServicio.getData();
  this.formulario = this.fb.group({
    dni: ['', Validators.required]
    //email: ['', [Validators.required, Validators.email]]
  });
  }



  




  

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

  
enviar() {
    if (this.formulario.valid) {
      console.log('Datos enviados:', this.formulario.value);

      this.miServicio.obtenerEnlace(this.formulario.value.dni).subscribe(data => {
      this.enlace = data;
    });
    } else {
      this.formulario.markAllAsTouched();
    }
  }
      
  
  }     
