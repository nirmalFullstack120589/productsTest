import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, distinctUntilChanged, map, of, switchMap } from "rxjs";
import { Product } from "../models/product.model";
import { ProductService } from "../services/product/product.service";
import { getAllProduct, getAllProductFail, getAllProductSuccess } from "./product.action";

@Injectable()
export class ProductEffect {
    constructor(
        private action$: Actions,
        private productService: ProductService,
    ) { }

    getAllProduct$ = createEffect(() => {
        return this.action$.pipe(
            ofType(getAllProduct),
            switchMap(() => {
                return this.productService.getProducts().pipe(
                    map((data: Product[]) => getAllProductSuccess({
                        response: data.map((item: Product) => {
                            item.isShowProgressBar = false;
                            item.starRating = Math.floor(item.rating.rate);
                            return item;
                        })
                    })),
                    catchError(
                        error => of(getAllProductFail({ error: error }))
                    )
                );
            })
        );
    });
}