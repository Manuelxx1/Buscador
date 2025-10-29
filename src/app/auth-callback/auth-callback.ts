import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth-callback',
  imports: [],
  templateUrl: './auth-callback.html',
  styleUrl: './auth-callback.css'
})
export class AuthCallback implements OnInit{

constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.http.get(`http://localhost:3000/auth/callback?code=${code}`)
        .subscribe({
          next: (data) => {
            console.log('Perfil:', data);
            // Podés guardar los datos en localStorage o mostrar en pantalla
          },
          error: (err) => {
            console.error('Error al autenticar:', err);
          }
        });
    }
  }


}
