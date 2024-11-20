import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  http = inject(HttpClient);
  API = "http://localhost:8080/api/v1/category"
  constructor() { }

  findAll(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.API)

  }
  deleteById(id:number): Observable<void>{
    return this.http.delete<void>(this.API+'/'+id)
  }
  save(categoria: Categoria): Observable<Categoria>{
    return this.http.post<Categoria>(this.API, categoria)
  }
  update(categoria: Categoria, id:number): Observable<Categoria>{
    return this.http.put<Categoria>(this.API+'/'+id, categoria)
  }
  findById(id:number): Observable<Categoria>{
    return this.http.get<Categoria>(this.API+'/'+id)
  }
}
