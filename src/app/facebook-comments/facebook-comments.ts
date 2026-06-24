/*import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router'; // <-- Importamos el Router



@Component({
  selector: 'app-facebook-comments',
  imports: [],
  templateUrl: './facebook-comments.html',
  styleUrl: './facebook-comments.css'
})
export class FacebookComments implements OnInit {
  

currentRoute: string = '';
  // Tu dominio web definitivo (cuando lo subas). Para pruebas locales, Facebook suele usar localhost
  private baseUrl = 'https://4200-cs-582739288523-default.cs-us-east1-pkhd.cloudshell.dev'; 

  // Inyectamos el Router en el constructor
  constructor(private router: Router,@Inject(PLATFORM_ID) private platformId: Object ) {}

  ngOnInit(): void {
    // ¡Acá está el truco! Obtenemos la ruta exacta donde está parado el usuario
    // Ejemplo: /articulo-noticias/tecnologia/ciberseguridad/ciberseguridad2
    this.currentRoute = this.router.url; 

    if (isPlatformBrowser(this.platformId)) {
      this.cargarOParsearSDK();
    }
  }
/*en un servidor real tipo firebase usar esto
  get fullUrl(): string {
    return `${this.baseUrl}${this.currentRoute}`;
  }

*/
  /*en cloudshell pata pruebas*/
 /* get fullUrl(): string {
  // Como Cloud Shell está protegido, le pasamos una URL real externa 
  // para que Facebook se digne a renderizar la caja de comentarios de prueba.
  return 'https://www.facebook.com'; 
}

  private cargarOParsearSDK() {
  const win = window as any;
  
  if (win.FB) {
    // Le damos 500ms para asegurarnos de que Angular ya pintó el HTML en Cloud Shell
    setTimeout(() => { 
      win.FB.XFBML.parse(); 
    }, 500);
  } else {
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v17.0';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    
    // Cuando el script termine de descargarse en Cloud Shell, forzamos el renderizado
    script.onload = () => {
      setTimeout(() => {
        if (win.FB) win.FB.XFBML.parse();
      }, 500);
    };
    
    document.body.appendChild(script);
  }
  }


  }
  */



import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common'; // <-- Sumamos CommonModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-facebook-comments',
  standalone: true, // <-- Asegurate de que tenga esta línea explicitly
  imports: [CommonModule], // <-- Agregamos CommonModule acá
  templateUrl: './facebook-comments.html',
  styleUrl: './facebook-comments.css'
})
export class FacebookComments implements OnInit {
  
  currentRoute: string = '';
  private baseUrl = 'https://4200-cs-582739288523-default.cs-us-east1-pkhd.cloudshell.dev'; 

  
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url; 
    if (isPlatformBrowser(this.platformId)) {
      this.cargarOParsearSDK();
    }
  }
/*
  get fullUrl(): string {
    // Forzamos la URL externa fija para engañar al proxy de Cloud Shell
    return 'https://www.facebook.com'; 
  }
*/

/*en un servidor real tipo firebase usar esto*/
  get fullUrl(): string {
    return `${this.baseUrl}${this.currentRoute}`;
  }

  
  private cargarOParsearSDK() {
    const win = window as any;
    
    // Si ya existe el objeto de Facebook en el navegador, lo parseamos directo
    if (win.FB) {
      setTimeout(() => { 
        win.FB.XFBML.parse(); 
      }, 500);
    } else {
      // Si no existe, lo creamos dinámicamente asegurando el onload
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v17.0';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        setTimeout(() => {
          if (win.FB) {
            win.FB.XFBML.parse();
          }
        }, 600);
      };
      
      document.body.appendChild(script);
    }
  }
}

