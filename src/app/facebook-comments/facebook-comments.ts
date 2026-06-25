


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
  
  // Le damos un pequeño respiro para asegurarnos de que el SDK del index.html cargó
  setTimeout(() => {
    if (win.FB) {
      // Si ya existe (lo normal gracias al index.html), lo parseamos
      win.FB.XFBML.parse();
    } else {
      // Si justo tardó un cachito más, reintentamos en medio segundo
      setTimeout(() => {
        if (win.FB) win.FB.XFBML.parse();
      }, 500);
    }
  }, 300);
}
  
}

