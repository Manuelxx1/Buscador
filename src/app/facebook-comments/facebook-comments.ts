import { Component, Input, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';



@Component({
  selector: 'app-facebook-comments',
  imports: [],
  templateUrl: './facebook-comments.html',
  styleUrl: './facebook-comments.css'
})
export class FacebookComments implements AfterViewInit {
  

  // Recibimos la ruta del artículo desde el componente padre (ej: '/articulo-noticias/.../ciberseguridad2')
  @Input() currentRoute: string = ''; 

  // Tu dominio web definitivo (cuando lo subas). Para pruebas locales, Facebook suele usar localhost
  private baseUrl = 'https://4200-cs-582739288523-default.cs-us-east1-pkhd.cloudshell.dev'; 

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  get fullUrl(): string {
    return `${this.baseUrl}${this.currentRoute}`;
  }

  ngAfterViewInit(): void {
    // Nos aseguramos de ejecutar esto solo en el navegador (evita errores si usás SSR)
    if (isPlatformBrowser(this.platformId)) {
      this.cargarOParsearSDK();
    }
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
