// src/app/busquedaservice.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Busquedaservice {

  // URL de tu API. Asegúrate de que no tenga una barra al final (trailing slash).
  // Por ejemplo, termina en ...dev/html-link, no ...dev/html-link/
  private apiUrl = 'https://8080-cs-a039ce25-3610-425a-9d0a-fbf343f80023.cs-us-east1-pkhd.cloudshell.dev/html-link';

  constructor(private http: HttpClient) { }

  /**
   * Envía la palabra a la API como un parámetro de consulta llamado 'frase'.
   * Este es el método más robusto para manejar parámetros de URL.
   * @param query La palabra o frase a buscar.
   * @returns Un Observable con la respuesta de la API (un string).
   */
  buscar(query: string): Observable<string> {
    // 1. Limpia cualquier espacio en blanco que el usuario haya escrito.
    const palabraLimpia = query.trim();

    // 2. Crea los parámetros de la URL de forma segura. HttpParams
    // se encarga de codificar correctamente la palabra.
    const params = new HttpParams().set('frase', palabraLimpia);
    
    // 3. Imprime la URL completa en la consola de tu servidor (Cloud Shell).
    // Esto te permitirá ver exactamente lo que se envía.
    console.log(`Petición enviada a: ${this.apiUrl}?${params.toString()}`);

    // 4. Realiza la petición GET con los parámetros.
    return this.http.get(this.apiUrl, { params: params, responseType: 'text' });
  }
}
