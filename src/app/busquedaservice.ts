
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//model para el carrito de compras 
  import { Product } from '../models/product';

import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Busquedaservice {
/*
  // URL de tu API. Asegúrate de que no tenga una barra al final (trailing slash).
  // Por ejemplo, termina en ...dev/html-link, no ...dev/html-link/
//  private apiUrl = 'https://8080-cs-a039ce25-3610-425a-9d0a-fbf343f80023.cs-us-east1-pkhd.cloudshell.dev/html-link';
private backendURL: string = 'https://8080-cs-a039ce25-3610-425a-9d0a-fbf343f80023.cs-us-east1-pkhd.cloudshell.dev/html-link';
  constructor(private http: HttpClient) { }

  /**
   * Envía la palabra a la API como un parámetro de consulta llamado 'frase'.
   * Este es el método más robusto para manejar parámetros de URL.
   * @param query La palabra o frase a buscar.
   * @returns Un Observable con la respuesta de la API (un string).
   */
  /*
  buscar(query: string): Observable<any> {
    return this.http.get(`${this.backendURL}/${query}`);
  }
  */

  //para login x
clientId = 'eWRfV0hqekZhOTY5bkZHQ1RBSE46MTpjaQ';
  redirectUri = 'https://4200-cs-582739288523-default.cs-us-east1-yeah.cloudshell.dev/auth/callback';

//para el carrito de compras 
  private items: Product[] = [];

  
  constructor(private http: HttpClient) {
    //para el carrito de compras 
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.items = JSON.parse(saved);
    }
  }
// Lógica de tu servicio
  getData() {
    return 'Datos del servicio';
  }
   //Endpoint del Backend
  //traer por ID
  //con esto traemos los campos por id o dni
  //que luego en la vista decidimos que campo mostrar
  // //para el imput text a editar
        //sin usar un ngfor
 // private backendURL: string = "https://8080-cs-a039ce25-3610-425a-9d0a-fbf343f80023.cs-us-east1-pkhd.cloudshell.dev/personas/traer";

private apiURL = 'https://portfoliowebbackendkoyeb-1.onrender.com/personas/traer';

//private apiURL = 'https://8080-cs-a039ce25-3610-425a-9d0a-fbf343f80023.cs-us-east1-pkhd.cloudshell.dev/personas/traer';

obtenerTodos():Observable<any> {
    return this.http.get<any>(`${this.apiURL}`);
 

}
obtenerPorId(dni:any):Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${dni}`);
 // console.log('DNI recibido en el servicio:', dni); //Esto lo ves en la consola del navegador


    

    
  
  // con of se simula una respuesta para obtener el valor que llega 
  //al método obtenerPorId(dni: any)
//return of([{ informacion: 'Datos simulados para DNI ' + dni }]);
}
/*
obtenerPorIdform(dni:any):Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${dni}`);
 // console.log('DNI recibido en el servicio:', dni); //Esto lo ves en la consola del navegador
}
  
*/
private apiURLenlace = 'https://portfoliowebbackendkoyeb-1.onrender.com/html-link';
  
obtenerEnlace(dni:any):Observable<any> {
    return this.http.get(`${this.apiURLenlace}?frase=${dni}`, { responseType: 'text' });

 // console.log('DNI recibido en el servicio:', dni); //Esto lo ves en la consola del navegador
}

  //formulario login método
  private apiURLogin = 'https://portfoliowebbackendkoyeb-1.onrender.com/loginsinjwt';

iniciarSesion(nombre: string, password: string): Observable<any> {
  const datosdesesion = { nombre, password };
  return this.http.post(this.apiURLogin, datosdesesion);
}

  //formulario registro método
  private apiURLRegistro = 'https://portfoliowebbackendkoyeb-1.onrender.com/register';

registrarDatos(nombre: string, password: string): Observable<any> {
  const datosderegistro = { nombre, password };
  return this.http.post(this.apiURLRegistro, datosderegistro);
}

  

  
  //json
  getPost() {
    
//mostrar un dato
    //posts representa al endpoint
    //se podría utilizar otros endpoint juntos
    //y mostrar varios endpoint
   // return this.http.get('https://jsonplaceholder.typicode.com/posts/1');

    //traer todos
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  


    //formulario intereses nodemailer
  
    enviarCorreoPersonalizado(data: { email: string, intereses: string[] }): Observable<any> {
  return this.http.post('https://backend-news-tk56.onrender.com/guardar-preferencias', data);
}

//loginconx
  
  loginWithX() {
    const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=tweet.read users.read&state=secure123&code_challenge=challenge123&code_challenge_method=plain`;
    window.location.href = authUrl;
  }
//logindiscord
  //métodos que usa el app .ts 
  //para obtener  el localStorage 
  saveUser(user: any) {
    localStorage.setItem('discordUser', JSON.stringify(user));
  }

  getUser() {
    const user = localStorage.getItem('discordUser');
    //si user es true muestra el response de json 
    //si es false  muestra null
    return user ? JSON.parse(user) : null;
  }

  clearUser() {
    localStorage.removeItem('discordUser');
  }

  //carrito de compras

  addToCart(product: Product) {
    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.save();
  }

  removeFromCart(productId: number) {
    this.items = this.items.filter(item => item.id !== productId);
    this.save();
  }

  decreaseQuantity(productId: number) {
    const item = this.items.find(p => p.id === productId);
    if (item) {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.save();
      }
    }
  }

  clearCart() {
    this.items = [];
    this.save();
  }

  getItems(): Product[] {
    return this.items;
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  private save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
      }

}

  
