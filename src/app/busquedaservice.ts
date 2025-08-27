

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Busquedaservice {
  //private apiUrl = 'https://8080-cs-a039ce25-3610-425a-9d0a-fbf343f80023.cs-us-east1-pkhd.cloudshell.dev/html-link' ; 
private apiUrl = 'http://localhost:8080/html-link';

  constructor(private http: HttpClient) {}

  buscar(frase: string): Observable<string> {
    return this.http.get(this.apiUrl);
  }
  
}

