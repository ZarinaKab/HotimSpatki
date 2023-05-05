import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';
import {Observable} from "rxjs";

@Injectable()
export class ProductService {
    BASE_URL = 'http://127.0.0.1:8000'
    constructor(private http: HttpClient) { }


    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.BASE_URL}/api/products/`)
    }

    getProduct(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.BASE_URL}/api/products/${id}`)
    }

}
