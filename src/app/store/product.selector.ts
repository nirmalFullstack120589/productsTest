import { createFeatureSelector } from "@ngrx/store";
import { Product } from "../models/product.model";
import { featureKey } from "./product.reducer";

export const selectProduct = createFeatureSelector<Product[]>(featureKey.productFeature);

export const cartItem = createFeatureSelector<Product[]>(featureKey.cartFeature);