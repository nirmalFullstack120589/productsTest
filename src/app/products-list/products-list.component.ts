import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { addProductToCart, getAllProduct } from '../store/product.action';
import { cartItem, selectProduct } from '../store/product.selector';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  cartData: Product[] = [];

  subscription: Subscription[] = [];
  constructor(private store: Store, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.store.dispatch(getAllProduct());
    this.subscription.push(
      this.store.pipe(select(selectProduct)).subscribe((product: Product[]) => {
        this.products = JSON.parse(JSON.stringify(product));
        this.products = this.products.map(m => ({
          ...m,
          quantity: 0,
        }));
        if (this.cartData.length) {
          this.patchQty();
        }
      })
    )

    this.subscription.push(
      this.store.pipe(select(cartItem)).subscribe((item: Product[]) => {
        this.cartData = JSON.parse(JSON.stringify(item));
      })
    )
  }

  private patchQty(): void {
    this.cartData.forEach(cart => {
      const selectedProduct = this.products.find(f => f.id === cart.id);
      if (selectedProduct)
        selectedProduct.quantity = cart.quantity;
    });
  }

  addToCart(product: Product): void {
    product.isShowProgressBar = true;
    product.quantity += 1;
    this.updateQuantity(product);

    this.snackBar.open('Product added to cart!', '', { duration: 1000 });
    setTimeout(() => {
      product.isShowProgressBar = false;
    }, 500);
  }

  private updateQuantity(product: Product): void {
    const selectedProduct = { ...product };

    const productIndex = this.cartData.findIndex(x => x.id === selectedProduct.id);
    if (selectedProduct.quantity === 0) {
      const cartIndex = this.cartData.findIndex(f => f.id === selectedProduct.id);
      if (cartIndex !== -1) this.cartData.splice(cartIndex, 1);
    }
    else if (productIndex !== -1) {
      this.cartData[productIndex].quantity = selectedProduct.quantity;
    } else {
      selectedProduct.quantity = 1;
      this.cartData.push(selectedProduct);
    }
    this.store.dispatch(addProductToCart({ selectedCart: this.cartData }));
  }

  updateCart(isAdd: boolean, index: number, product: Product): void {
    if (isAdd) {
      product.quantity += 1;
    } else {
      product.quantity -= 1;
    }
    this.updateQuantity(product);
  }

  ngOnDestroy(): void {
    this.subscription.forEach(f => f.unsubscribe());
  }

}
