import { createReducer, on } from "@ngrx/store";
import { Product } from "../models/product.model";
import { addProductToCart, getAllProductSuccess } from "./product.action";

export const initialProduct: ReadonlyArray<Product> = [];
export const initialCartState: ReadonlyArray<Product> = [];

export const featureKey = {
    productFeature: 'Product',
    cartFeature: 'Cart'
}

export const productReducer = createReducer(
    initialProduct,
    on(getAllProductSuccess, (state, { response }) => {
        return response;
    })
);

export const cartReducer = createReducer(
    initialCartState,
    on(addProductToCart, (state, action) => {
        return [
            ...action.selectedCart
        ];
    })
);