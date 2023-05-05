import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthToken} from "./layout/models";
import {Product} from "./demo/api/product";
import {Observable} from "rxjs";
import * as process from "process";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    BASE_URl = 'http://127.0.0.1:8000';
    constructor(private http:HttpClient) { }
    // @ts-ignore
    login(email, password): Observable<AuthToken> {
        return this.http.post<AuthToken>(`${this.BASE_URl}/api/login/`, {
            email,
            password
        });
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.BASE_URl}/api/products/`)
    }

    getProduct(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.BASE_URl}/api/products/${id}/`)
    }

    createProduct (
        product : Product
    ): Observable<Product> {
        console.log(product)
        console.log(`${this.BASE_URl}/api/products/`)
        return this.http.post<Product>(
            `${this.BASE_URl}/api/products/`,
            {
                name: product.name,
                description: product.description,
                price: product.price,
                image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.jobscan.co%2Fblog%2Fjobs-for-former-teachers%2F&psig=AOvVaw0cTHX0wbRQYrwGLMYLXNNS&ust=1683306239030000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOjbtMWS3P4CFQAAAAAdAAAAABAE",
                inventoryStatus: 1,
                category: [1],
            }
        )
    }

    updateProduct (
        product:Product
    ): Observable<Product> {
        return this.http.put<Product>(
            `${this.BASE_URl}/api/products/${product.id}/`,
            {
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image,
                inventoryStatus: product.inventoryStatus,
                category: product.category,
                seller: product.seller
            }
        )
    }

    deleteProduct(id: number): Observable<any>{
        return this.http.delete(`${this.BASE_URl}/api/products/${id}/`)
    }

    getCategoriesProducts(id: number) {
        return this.http.get<Product[]>(`${this.BASE_URl}/api/categories/${id}/products/`)
    }

}
