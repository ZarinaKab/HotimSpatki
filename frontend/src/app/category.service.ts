import { Injectable } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthToken} from "./layout/models";
import {Category, Product} from "./demo/api/product";
import { AppComponent } from './app.component';

@Injectable({
    providedIn: 'root'
})

export class CategoryService {
    BASE_URl = 'http://127.0.0.1:8000/';
    constructor(private http:HttpClient) { }
    // @ts-ignore
    login(username, password): Observable<AuthToken> {
        return this.http.post<AuthToken>(`${this.BASE_URl}api/login/`, {
            username,
            password
        });
    }

    // getCategories(): Observable<Category[]> {
    //     return this.http.get<Category[]>(`${this.BASE_URl}api/categories/`);
    // }
    getAllProducts(id:number): Observable<Product> {
        return this.http.get<Product>(`${this.BASE_URl}api/products`);
    }
}
