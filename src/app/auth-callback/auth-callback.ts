import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  imports: [CommonModule],
  templateUrl: './auth-callback.html',
  styleUrl: './auth-callback.css'
})
export class AuthCallback implements OnInit{
  usuario: any = null;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    const codeVerifier = 'challenge123'; // mismo valor que usaste en el login

    this.http.post('https://loginconx.onrender.com/auth/callback', {
      code,
      code_verifier: codeVerifier
    }).subscribe({
      next: (data) => {
        this.usuario = data;
      localStorage.setItem('twitter_session', JSON.stringify(data));
        //¿Qué hace esto?
//Navega a la raíz (/) como antes
//Pero además recarga la app, 
        //lo que fuerza que AppComponent ejecute ngOnInit() de nuevo
//Así se lee el localStorage 
        //y se muestra el usuario sin tocar F5
this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  window.location.reload();
});
;   
  },

      error: (err) => this.error = 'Error al autenticar: ' + err.message
    });
  }

}
