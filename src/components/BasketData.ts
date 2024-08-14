import {IBasketData, IProductItem} from '../types/index';
import { IEvents } from './base/events';

/*export class BasketData implements IBasketData {
    protected _products: IProductItem[];
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    getAllProducts() {
        return this._products;
    }

    addProduct(product: IProductItem): void {
        
    }

    deleteProduct(product: IProductItem): void {
        
    }

    checkBasketValidation(id: string): boolean {
       return this._products.some((product) => product.id === id) 
    }

    getTotalPrice(): number {
        
    }
    getProductsCounter(): number {
        return this._products.length
        
    }
    clearBasket(): void {
        this._products = []
    }
}*/