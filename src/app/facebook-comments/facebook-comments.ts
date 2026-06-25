


import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common'; // <-- Sumamos CommonModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-facebook-comments',
  standalone: true, // <-- Asegurate de que tenga esta línea explicitly
  imports: [CommonModule], //
  templateUrl: './facebook-comments.html',
  styleUrl: './facebook-comments.css'
})
export class FacebookComments implements OnInit {
  
  currentRoute: string = '';
  // Reemplazá la de Cloud Shell por la tuya de Firebase:
private baseUrl = 'https://noticiashoy-f24a0.web.app';

  
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

