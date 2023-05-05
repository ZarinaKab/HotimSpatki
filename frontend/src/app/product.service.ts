import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthToken} from "./layout/models";
import {Product} from "./demo/api/product";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    BASE_URl = 'http://127.0.0.1:8000/';
    constructor(private http:HttpClient) { }
    // @ts-ignore
    login(email, password): Observable<AuthToken> {
        return this.http.post<AuthToken>(`${this.BASE_URl}api/login/`, {
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
        productName: string,
        productDescription: string,
        productPrice: number,
        productInventoryStatusID: number,
        productSellerID: number,
        productBuyersID: number,
        productCategoryID: number,
        productImage: string,
    ): Observable<Product> {
        return this.http.post<Product>(
            `${this.BASE_URl}/api/products/create/`,
            {
                name: productName,
                description: productDescription,
                price: productPrice,
                inventoryStatus: productInventoryStatusID,
                seller: productSellerID,
                buyers: productBuyersID,
                category: productCategoryID,
                image: productImage
            }
        )
    }

    updateProduct (
        id: number,
        productName: string,
        productDescription: string,
        productPrice: number,
        productInventoryStatusID: number,
        productSellerID: number,
        productBuyersID: number,
        productCategoryID: number,
        productImage: string,
    ): Observable<Product> {
        return this.http.put<Product>(
            `${this.BASE_URl}/api/products/${id}/`,
            {
                name: productName,
                description: productDescription,
                price: productPrice,
                inventoryStatus: productInventoryStatusID,
                seller: productSellerID,
                buyers: productBuyersID,
                category: productCategoryID,
                image: productImage
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
