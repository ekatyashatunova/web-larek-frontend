import {IBasketData} from '../src/types';
import {IProductItem} from '../src/types';
import { IEvents } from '../base/events';

export class BasketData implements IBasketData {
    protected products: IProductItem[];
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    

    getAllProducts() {
        return this.products;
    }

}