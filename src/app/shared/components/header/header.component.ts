import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { cartItem } from '../../../store/product.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private store: Store) { }

  addedItemInCart$ = this.store.pipe(select(cartItem));

}
