import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  http = inject(HttpClient);
  API = "http://localhost:8080/api/v1/product"
  constructor() { }

  findAll(): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.API)

  }
  deleteById(id:number): Observable<void>{
    return this.http.delete<void>(this.API+'/'+id)
  }
  save(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>(this.API, produto)
  }
  update(produto: Produto, id:number): Observable<Produto>{
    return this.http.put<Produto>(this.API+'/'+id, produto)
  }
  findById(id:number): Observable<Produto>{
    return this.http.get<Produto>(this.API+'/'+id)
  }

}
