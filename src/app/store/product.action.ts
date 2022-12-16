import { createAction, props } from "@ngrx/store";
import { Product } from "../models/product.model";

export const getAllProduct = createAction(
    "[Product] product GET API call"
);

export const getAllProductSuccess = createAction(
    "[Product] product GET API success",
    props<{ response: Product[] }>()
);

export const getAllProductFail = createAction(
    "[Product] product GET API failure",
    props<{ error: any }>()
);

export const addProductToCart = createAction(
    "[Product] product add to cart",
    props<{ selectedCart: Product[] }>()
);
