

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Busquedaservice {
  
private apiUrl = 'https://api.example.com/search'; // URL de la API

  constructor(private http: HttpClient) { }

  /**
   * Envía la palabra a la API de búsqueda.
   * @param query La palabra o frase a buscar.
   * @returns Un Observable con la respuesta de la API.
   */
  buscar(query: string): Observable<any> {
    // Crea parámetros de consulta para la URL
    // En este caso, la URL final podría ser: https://api.example.com/search?q=palabra
    const params = new HttpParams().set('q', query);

    // Retorna el Observable de la petición GET
    return this.http.get(this.apiUrl, { params: params });
  }
    
    // return this.http.get (`${this.apiUrl}/${frase}`);
   // return this.http.get (`${this.apiUrl},frase`);
  
  
  
}

