import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-auth-callback',
  imports: [CommonModule],
  templateUrl: './auth-callback.html',
  styleUrl: './auth-callback.css'
})
export class AuthCallback implements OnInit{
  usuario: any = null;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    const codeVerifier = 'challenge123'; // mismo valor que usaste en el login

    this.http.post('https://3000-cs-582739288523-default.cs-us-east1-yeah.cloudshell.dev/auth/callback', {
      code,
      code_verifier: codeVerifier
    }).subscribe({
      next: (data) => this.usuario = data,
      error: (err) => this.error = 'Error al autenticar: ' + err.message
    });
  }

}
