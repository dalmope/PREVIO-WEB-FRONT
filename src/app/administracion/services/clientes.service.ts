import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private baseURL : string = environment.baseURL;

  constructor(private http:HttpClient) { }

  getClientes(token:string):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }
    return this.http.get<any>(`${this.baseURL}/clientes`, httpOption)
  }

  putCliente(token:string, cliente:any, id:any):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }

    return this.http.put<any>(`${this.baseURL}/clientes/${id}`, cliente, httpOption)
  }

  obtenerCliente(id:any, token:string):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }

    return this.http.get<any>(`${this.baseURL}/clientes/${id}`, httpOption)
  }


  postCliente(token:string, cliente:any):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}` // TODO: MUCHO CUIDADO DEJAR EL ESPACIO ENTRE LA PALABRA BEARER Y TOKEN
      })
    }

    return this.http.post<any>(`${this.baseURL}/clientes`, cliente, httpOption);
  }
}
