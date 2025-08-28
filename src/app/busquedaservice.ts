

import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Busquedaservice {
  
private apiUrl = 'https://8080-cs-a039ce25-3610-425a-9d0a-fbf343f80023.cs-us-east1-pkhd.cloudshell.dev/html-link';

  constructor(private http: HttpClient) { }

  buscar(query: string): Observable<string> {
    const palabraLimpia = encodeURIComponent(query.trim());
    const urlCompleta = `${this.apiUrl}?frase=${palabraLimpia}`;

    return this.http.get(urlCompleta, { responseType: 'text' });
  }
    // return this.http.get (`${this.apiUrl}/${frase}`);
   // return this.http.get (`${this.apiUrl},frase`);
  
  
  
}

