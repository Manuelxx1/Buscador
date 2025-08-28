

import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Busquedaservice {
  
//private apiUrl = 'https://8080-cs-a039ce25-3610-425a-9d0a-fbf343f80023.cs-us-east1-pkhd.cloudshell.dev/html-link';
private apiUrl = 'https://8080-cs-a039ce25-3610-425a-9d0a-fbf343f80023.cs-us-east1-pkhd.cloudshell.dev/test-param';
  
  
  constructor(private http: HttpClient) { }

  /**
   * Envía la palabra a la API de búsqueda.
   * @param query La palabra o frase a buscar.
   * @returns Un Observable con la respuesta de la API.
   */

/*
  buscar(query: string): Observable<string> {
    // 1. Crea parámetros de consulta, usando 'frase' como nombre de parámetro
    const params = new HttpParams().set('frase', query);

    // 2. Envía la petición con los parámetros y el responseType correcto
    return this.http.get(this.apiUrl, { params: params, responseType: 'text' });
  }
    */

    // Temporarily use a hardcoded value for testing
  buscar(): Observable<string> {
    const palabraDePrueba = 'informacion'; // Usa una palabra que sepas que funciona

    // Usa HttpParams con la palabra codificada
    const params = new HttpParams().set('frase', palabraDePrueba);

    // Envía la petición a tu nuevo endpoint de prueba
    return this.http.get(this.apiUrl, { params: params, responseType: 'text' });
  }
    // return this.http.get (`${this.apiUrl}/${frase}`);
   // return this.http.get (`${this.apiUrl},frase`);
  
  
  
}

