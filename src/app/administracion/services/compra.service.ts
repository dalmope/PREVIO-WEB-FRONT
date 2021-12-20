import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  
  private baseURL : string = environment.baseURL;

  constructor(private http: HttpClient) { }


  getCompras(token:string):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }
    return this.http.get<any>(`${this.baseURL}/compras`, httpOption)
  }

  obtenerCompra(id:any, token:string):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }
    return this.http.get<any>(`${this.baseURL}/compras/${id}`, httpOption)
  }

  postCompra(compra:any, token:string):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    } 

    return this.http.post<any>(`${this.baseURL}/compras`, compra, httpOption);
  }


}
