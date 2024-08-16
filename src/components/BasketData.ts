import {IBasketData, IProductItem, IProductList} from '../types/index'
import { IEvents } from './base/events';

//Модель данных товаров с корзиной
/*export class BasketData implements IBasketData {
    protected _products: IProductItem[];
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    getAllProducts(): IProductItem[] {
        return this._products;
    }

    addProduct(product: IProductItem): void {
        
    }

    deleteProduct(product: IProductItem): void {
        this._products = this._products.filter((item) => item.id === product.id)
        
    }

    checkBasketValidation(id: string): boolean {
       return this._products.some((product) => product.id === id) 
    }

    getTotalPrice(): number {
        return this._products.reduce((sum, item) => sum + item.price * item.id, 0);
    
    }
    getProductsCounter(): number {
        return this._products.length
        
    }
    clearBasket(): void {
        this._products = []
    }
}*/