import { Component} from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { DataView } from 'primeng/dataview';
import { CartService } from '../../service/cart.service';


@Component({
  templateUrl: './shopping-cart.component.html',
})
export class ShoppingCartComponent {
  product: Product = {};
  products = this.cartService.getItems();
  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = '';
  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
      this.productService.getProducts().then(data => this.products = data);

      this.sortOptions = [
          { label: 'Price High to Low', value: '!price' },
          { label: 'Price Low to High', value: 'price' }
      ];
  }

  onSortChange(event: any) {
      const value = event.value;

      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
      } else {
          this.sortOrder = 1;
          this.sortField = value;
      }
  }

  onFilter(dv: DataView, event: Event) {
      dv.filter((event.target as HTMLInputElement).value);
  }

  deleteProduct(product: Product) {
    this.products = this.products.filter(val => val.id !== this.product.id);
    this.product = { ...product };
}

}
