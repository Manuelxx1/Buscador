import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
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

  get fullUrl(): string {
    return `${this.baseUrl}${this.currentRoute}`;
  }

  

  private cargarOParsearSDK() {
    const win = window as any;

    // Si el SDK de Facebook ya está cargado en el index.html, solo le pedimos que parsee el nuevo componente
    if (win.FB) {
      setTimeout(() => {
        win.FB.XFBML.parse(); 
      }, 100);
    } else {
      // Si no existe, creamos el script dinámicamente (reemplaza 'TU_APP_ID' si tenés una, sino funciona igual)
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v17.0';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);
    }
  }
  }
