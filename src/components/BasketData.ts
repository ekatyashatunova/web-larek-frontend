import {IBasketData, IProductItem, IProductList} from '../types/index'
import { IEvents } from './base/events';

//Модель данных товаров с корзиной
export class BasketData implements IBasketData {
    protected _products: IProductItem[];
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    set products(products:IProductItem[]) {
        this._products = products;
        this.events.emit('basket:changed')
    }   


    getAllProducts(): IProductItem[] {
        return this._products;
    }

    addProduct(product: IProductItem) {
        this._products = [...this._products, product]
        this.events.emit('basket:changed')   
    }

    deleteProduct(product: IProductItem) {
        this._products = this._products.filter((item) => item.id === product.id);
        this.events.emit('basket:changed') 
    }

    checkBasketValidation(id: string): boolean {
       return this._products.some((product) => product.id === id) 
    }

    getTotalPrice(): number {
        return this._products.reduce((sum, item) => sum + item.price, 0);
    
    }
    getProductsCounter() {
        return this._products.length
        
    }
    clearBasket(): void {
        this._products = []
    }
}