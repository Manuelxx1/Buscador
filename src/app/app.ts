import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { Busquedaservice } from './busquedaservice';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

sesionActiva: boolean = false;
  
  ngOnInit() {
    this.actualizarReloj();
    setInterval(() => this.actualizarReloj(), 1000);

    const usuarioGuardado = localStorage.getItem('usuario');
    this.sesionActiva = !!usuarioGuardado; // true si hay sesión
  if (usuarioGuardado) {
    const usuario = JSON.parse(usuarioGuardado);
    console.log('Usuario en sesión:', usuario);
    this.datosdesesion =  'Usuario en sesión:' +  usuario;
  }
  }

  actualizarReloj() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const mins = now.getMinutes().toString().padStart(2, '0');
    this.clock = `🕒 ${hours}:${mins}`;
  }
  
  
  constructor(private miServicio: Busquedaservice,private fb: FormBuilder,private cdRef: ChangeDetectorRef,private router: Router) {
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


    
  
  
  }//constructor


  

    formulariologindatos() {
if (this.formulariologin.valid) {
      this.miServicio.iniciarSesion(this.formulariologin.value.nombre,this.formulariologin.value.password).subscribe({
      next: res => {
    // Login exitoso
    console.log('Login OK:', res);
   
        // ✅ Guardar sesión en localStorage
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        
        alert(res.mensaje); //mensaje del.backend por ejemplo: "Login exitoso"
    this.router.navigate(['/']); // redirige al perfil
  },
  error: err => {
    // Login fallido
    console.error('Error de login:', err);
    alert('Nombre o contraseña incorrectos');
  }
});
  } else {
    alert('Por favor completá todos los campos');
  }
      
    }

      //cerrar session
  
      cerrarSesion() {
  localStorage.removeItem('usuario'); // Elimina la sesión
      //si quiero borrar todos los datos
        //de session
        //incluido el usuario
        //localStorage.clear();

  this.router.navigate(['/']);   // Redirige al login o donde prefieras
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
