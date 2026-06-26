


import { Component, OnInit, Inject, PLATFORM_ID,afterNextRender } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common'; // <-- Sumamos CommonModule
import { Router } from '@angular/router';



@Component({
  selector: 'app-facebook-comments',
  standalone: true, // <-- Asegurate de que tenga esta línea explicitly
  imports: [CommonModule], //
  templateUrl: './facebook-comments.html',
  styleUrl: './facebook-comments.css'
})
export class FacebookComments /*implements OnInit*/ {
  
  currentRoute: string = '';
  // Reemplazá la de Cloud Shell por la tuya de Firebase:
//private baseUrl = 'https://noticiashoy-f24a0.web.app';
//private baseUrl = 'http://localhost:4200';
  private baseUrl ='https://4200-cs-582739288523-default.cs-us-east1-pkhd.cloudshell.dev';
  constructor(
    private router: Router
   // @Inject(PLATFORM_ID) private platformId: Object
    
  ) 
  {

// Renderiza el plugin solo después de que el DOM esté listo, evitando errores
    afterNextRender(() => {
      // Escanea el DOM y renderiza la caja de comentarios al cargar la vista
    
      if (typeof (window as any).FB !== 'undefined') {
        (window as any).FB.XFBML.parse();
      }
    });
    }
    
    

  ngOnInit(): void {
    this.currentRoute = this.router.url; 
  //  if (isPlatformBrowser(this.platformId)) {
      //this.cargarOParsearSDK();
    //}
  }


/*en un servidor real tipo firebase usar esto*/
  
  get fullUrl(): string {
    return `${this.baseUrl}${this.currentRoute}`;
  }

  // ESTO ES LO ÚNICO QUE SE CAMBIA EN EL TS:
 /*
  private cargarOParsearSDK() {
    const win = window as any;
    
    // Le damos 1 segundo entero (1000ms) para que Angular termine de dibujar el HTML
    setTimeout(() => {
      if (win.FB) {
        win.FB.XFBML.parse();
      } else {
        // Si el script de Facebook todavía se está descargando, reintentamos un segundo después
        setTimeout(() => {
          if (win.FB) win.FB.XFBML.parse();
        }, 1000);
      }
    }, 1000);
    }
    */
  
}

