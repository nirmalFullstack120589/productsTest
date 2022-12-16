import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Product } from '../models/product.model';
import { addProductToCart } from '../store/product.action';
import { cartItem } from '../store/product.selector';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartData: Product[] = [];
  total = 0;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.pipe(select(cartItem)).subscribe((item: Product[]) => {
      this.cartData = JSON.parse(JSON.stringify(item));
    });
    this.calculateTotal();
  }

  private calculateTotal(): void {
    this.total = this.cartData.reduce((acc: number, item: Product) => {
      return acc += (item.quantity * item.price);
    }, 0);
  }

  deleteProduct(index: number): void {
    this.cartData.splice(index, 1);
    this.store.dispatch(addProductToCart({ selectedCart: this.cartData }));
    this.calculateTotal();
  }

  updateCart(isAdd: boolean, index: number, product: Product): void {
    if (isAdd) {
      product.quantity += 1;
    } else {
      product.quantity -= 1;
    }
    if (product.quantity === 0) {
      this.deleteProduct(index);
    }
    this.store.dispatch(addProductToCart({ selectedCart: this.cartData }));
    this.calculateTotal();
  }

}
