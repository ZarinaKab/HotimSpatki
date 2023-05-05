import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService} from "../../../../product.service";

@Component({
    templateUrl: './formlayoutdemo.component.html',
    providers: [MessageService]
})
export class FormLayoutDemoComponent implements OnInit{
    // productName: string = '';
    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;
    createDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];


    constructor(private productService: ProductService, private messageService: MessageService) { }

    ngOnInit() {
        this.productService.getProducts().subscribe(data => {
            this.products = data
            console.log(data)

        });
        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'seller', header: 'Seller' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
        this.createDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.createDialog = false;
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        product.id = product.id ?? -1
        if (product.id === -1){
            this.products = this.products.filter((cur_product) => cur_product !== product)
        }
        else {
            this.productService.deleteProduct(product.id).subscribe((product_del) => {
                this.products = this.products.filter((cur_product) => cur_product.id !== product_del.id)
            })
        }
        // this.deleteProductDialog = true;
        // this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        // this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        if (this.createDialog) {
            this.productService.createProduct(
                this.product
            ).subscribe((Product) => {
                this.products.push(Product)
            })
        }else{
            console.log(this.product)
            this.productService.updateProduct(this.product).subscribe((product) => {
                console.log(product)
                this.products = this.products.filter((cur_product) => cur_product.id !== product.id)
                this.products.push(product)
            })
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    // createId(): string {
    //     let id = '';
    //     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     for (let i = 0; i < 5; i++) {
    //         id += chars.charAt(Math.floor(Math.random() * chars.length));
    //     }
    //     return id;
    // }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    getSellerId(id: number){
        return this.productService.getProduct(id).subscribe(
            (data) => {
                this.product = data
                return this.product.seller?.id
            })
    }

}
