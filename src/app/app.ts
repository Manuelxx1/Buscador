import { Component, signal, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { Busquedaservice } from './busquedaservice';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeToggleComponent } from './theme-toggle-component/theme-toggle-component';
import { Weather } from './weather/weather';
import { CryptoPrices } from './crypto-prices/crypto-prices';

import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

//para busquedacontenido en tiempo real 
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


//variable global 
//El objeto google viene del script 
//que cargás en index.html
//<script src="https://accounts.google.com/gsi/client" async defer></script>
//Como TypeScript no lo conoce por defecto,
//usamos declare para evitar errores de compilación.
declare const google: any;


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
  cargandobuscarcontenido: boolean = false;

emailenviado: string | null = null;
emailError: string | null = null;


  
  
formulario: FormGroup;
  formulariologin: FormGroup;
  
formularioIntereses: FormGroup;
mensajeConfirmacion: string | null = null;

datosdesesion:any;
  //datosdeltoken de Google
  usuario: any;
  //loginconx
  usuariodex: any = null;
menuActivo = false;
  clock: string = '';

  toggleMenu() {
    this.menuActivo = !this.menuActivo;
  }

sesionActiva: boolean = false;
  sesionActivaSinGoogle: boolean = false;
sesionActivaDex:boolean = false;

  datosDebug: string = '';

  //login discord 
username: string = '';
  avatar: string = '';
  id: string = '';

  //para el buscador que usa springboot
  //que retorna los enlaces 
  mostrarDesplegable = false;

  
  
  ngOnInit() {
    this.actualizarReloj();
    setInterval(() => this.actualizarReloj(), 1000);

//usuario de x en localStorage 

const usuarioGuardadodex = localStorage.getItem('twitter_session');
    this.usuariodex = usuarioGuardadodex ? JSON.parse(usuarioGuardadodex) : null;
    this.sesionActivaDex = !!this.usuariodex;
    //usuario google en localstorage
    //se coloca aquí así cuando se actualiza
    //la pagina se llama a los datos 
    //en localstorage otra vez 
    //así se mantiene en la vista 
    //en todo momento
    const usuarioGuardado = localStorage.getItem('usuario');
  if (usuarioGuardado) {
    this.usuario = JSON.parse(usuarioGuardado);
    
      this.sesionActiva = true; // Activar sesión si hay usuario guardado
  } else {
    this.sesionActiva = false;
  }
    //google button sesión
    //inicia la conexión hacia 
    //cloud console para
    //verificar el client_id
    //y manejar el callback de respuesta
    //que al iniciar sesión 
    //nos retorna el token 
    //con los datos de sesión del usuario
    
google.accounts.id.initialize({
    client_id: '781091117638-l85laji30vsovpooglq3ju7p2p2rrb6j.apps.googleusercontent.com',
    callback: (response: any) => this.handleCredentialResponse(response),
    //auto_select: false,
    cancel_on_tap_outside: false
  
  });

    
  google.accounts.id.prompt(); //Esto muestra el One Tap

    //render el boton de google
    //en el div googleSignInButton
  google.accounts.id.renderButton(
    document.getElementById('googleSignInButton'),
    { theme: 'outline', size: 'large' }
  );

//login discord
    this.route.queryParams.subscribe(params => {
      if (params['username'] && params['avatar'] && params['id']) {
        // Recibido desde el backend
        const user = {
          username: params['username'],
          avatar: params['avatar'],
          id: params['id']
        };
        this.miServicio.saveUser(user);
        this.setUser(user);
      } else {
        // Recuperado desde localStorage
        const savedUser = this.miServicio.getUser();
        if (savedUser && savedUser.username) {
    this.username = savedUser.username;
    this.avatar = savedUser.avatar;
    this.id = savedUser.id;
          }
      }
    });

    //busquedacontenido en tiempo real
    
    this.formulario.get('palabraclave')?.valueChanges
    .pipe(
      debounceTime(300), // espera 300ms después de que el usuario deja de escribir
      distinctUntilChanged() // solo si el valor cambió
    )
    .subscribe(valor => {
      this.buscarcontenidoEnTiempoReal(valor);
    });
  }// oninit

  

  //método de login discord de OnInit 
  //para la vista angular 
  setUser(user: any) {
    this.username = user.username;
    this.avatar = user.avatar;
    this.id = user.id;
  }


  //método que se ocupa callback de sesión
  handleCredentialResponse(response: any) {
  const token = response.credential;

  // Decodificar el token JWT para obtener datos del usuario
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );

 // const userInfo = JSON.parse(jsonPayload);
 //datos del token de sesión
    //para la vista angular
    this.usuario = JSON.parse(jsonPayload);
  localStorage.setItem('usuario', JSON.stringify(this.usuario));
  this.sesionActiva = true; // Activar sesión


      // También Puedes enviarlo a tu backend 
    //para verificar que el token sea legítimo
}


  cerrarSesionGoogle() {
  localStorage.removeItem('usuario');
  this.usuario = null;
this.sesionActiva = false; // Desactivar sesión
  // Desactiva la selección automática de cuenta
  //google.accounts.id.disableAutoSelect();

  // Esperá un momento y re-renderizá el botón
  setTimeout(() => {
    const boton = document.getElementById('googleSignInButton');
    if (boton) {
      google.accounts.id.renderButton(boton, {
        theme: 'outline',
        size: 'large'
      });
    
    google.accounts.id.prompt(); //Esto muestra el One Tap

    }
  }, 100); // pequeño delay para asegurar que el DOM se actualizó
}





  actualizarReloj() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const mins = now.getMinutes().toString().padStart(2, '0');
    this.clock = `🕒 ${hours}:${mins}`;
  }


        //Detectar clic fuera del desplegable
  //del buscadorcontenido para ocultarlo
  @ViewChild('contenedorDesplegable') contenedorDesplegable!: ElementRef;
  @ViewChild('inputBuscador') inputBuscador!: ElementRef;
  @ViewChild('zonaLimite', { static: false }) zonaLimite!: ElementRef;
  
  constructor(private miServicio: Busquedaservice,private fb: FormBuilder,private cdRef: ChangeDetectorRef,private router: Router,private route: ActivatedRoute ) {
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

  const nombre = this.formulariologin.value.nombre;
    const password = this.formulariologin.value.password;

    this.datosDebug = `Enviando: ${nombre} / ${password}`;
      
  
  this.miServicio.iniciarSesion(this.formulariologin.value.nombre,this.formulariologin.value.password).subscribe({
      next: res => {
    // Login exitoso
    console.log('Login OK:', res);
//agregar los datos de la response a la property 
        this.datosDebug += `\nRespuesta: ${JSON.stringify(res)}`;
   
        // ✅ Guardar sesión en localStorage
        localStorage.setItem('usuario', JSON.stringify(res.usuario));

this.session();
        
        alert(res.mensaje); //mensaje del.backend por ejemplo: "Login exitoso"
    //this.router.navigate(['/']); // redirige al perfil
  },
  error: err => {
    // Login fallido
    console.error('Error de login:', err);

    this.datosDebug += `\nError: ${JSON.stringify(err)}`;
    alert('Nombre o contraseña incorrectos');
  }
});
  } else {
    alert('Por favor completá todos los campos');
  }
      
    }

  session(){
  const usuarioGuardado = localStorage.getItem('usuario');
    this.sesionActivaSinGoogle = !!usuarioGuardado; // true si hay sesión
  if (usuarioGuardado) {
    const usuario = JSON.parse(usuarioGuardado);
    console.log('Usuario en sesión:', usuario);
    this.datosdesesion = 'Usuario en sesión<br>' + usuario;

  }
  }

      //cerrar session
  
      cerrarSesion() {
  localStorage.removeItem('usuario'); // Elimina la sesión
      //si quiero borrar todos los datos
        //de session
        //incluido el usuario
        //localStorage.clear();
        this.sesionActivaSinGoogle = false;
this.datosdesesion ="";
  //this.router.navigate(['/']);   // Redirige al login o donde prefieras
}

//loginconx
iniciarSesionConX(): void {
    this.miServicio.loginWithX();
  }

  


  //cerrar session
  
      cerrarSesionDex() {
  localStorage.removeItem('twitter_session'); // Elimina la sesión
      //si quiero borrar todos los datos
        //de session
        //incluido el usuario
        //localStorage.clear();
        this.sesionActivaDex=false;
this.usuariodex = null;
  //this.router.navigate(['/']);   // Redirige al login o donde prefieras
}


  //login discord 
  loginWithDiscord() {
    const clientId = '1435160999891046460';
    const redirectUri = 'https://logindiscord.onrender.com/callback'; // backend
    const scope = 'identify email';
    const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}`;
    window.location.href = discordAuthUrl;

  
  }
  //cerrar  sesión de discord
  logoutdiscord() {
  this.miServicio.clearUser();
    window.location.href = '/';
  this.username = '';
  this.avatar = '';
  this.id = '';
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
    const palabra = this.formulario.value.palabraclave?.trim();

    if (!palabra) {
      this.mostrarDesplegable = false;
      this.enlace = '';
      this.cargandobuscarcontenido = false;
      return;
    }

    if (this.formulario.valid) {
      this.cargandobuscarcontenido = true; // ⏳ empieza la carga
      this.miServicio.obtenerEnlace(palabra).subscribe(data => {
        this.enlace = data.replace(/<\/a>/g, '</a><br>');

        this.mostrarDesplegable = true;
        this.cargandobuscarcontenido = false; // ✅ termina la carga
      }, error => {
        this.enlace = "No se encontraron resultados.";
        this.mostrarDesplegable = false;
        this.cargandobuscarcontenido = false; // ❌ termina la carga con error
      });
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  cerrarSiHaceClickDentroDeZona(event: Event) {
  const target = event.target as HTMLElement;

  const clicDentroZona =
    this.zonaLimite &&
    this.zonaLimite.nativeElement.contains(target);

  const clicDentroDesplegable =
    this.contenedorDesplegable &&
    this.contenedorDesplegable.nativeElement.contains(target);

  // Solo cerrar si el clic fue dentro de la zona límite, pero no en el desplegable
  if (clicDentroZona && !clicDentroDesplegable) {
    setTimeout(() => {
      this.mostrarDesplegable = false;
    }, 150);
  }
  }

  buscarcontenidoEnTiempoReal(valor: string) {
  const palabra = valor?.trim();

  if (!palabra) {
    this.mostrarDesplegable = false;
    this.enlace = '';
    return;
  }

  this.cargandobuscarcontenido = true;

  this.miServicio.obtenerEnlace(palabra).subscribe(data => {
    this.enlace = data;
    this.mostrarDesplegable = true;
    this.cargandobuscarcontenido = false;
  }, error => {
    this.enlace = "No se encontraron resultados.";
    this.mostrarDesplegable = false;
    this.cargandobuscarcontenido = false;
  });
}



 /*
    mostrarModal = false;

  cerrarModal() {
    this.mostrarModal = false;
  }
  
*/


  
  }     
