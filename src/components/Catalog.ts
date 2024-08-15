import {ICatalog, IProductItem} from '../types/index';
import {IEvents} from '../components/base/events';



export class Catalog implements ICatalog {
    protected _items: IProductItem[];
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }
    
    setProduct(products: IProductItem[]): void {
        this._items = products
    }

    getProduct(): IProductItem[] {
        return this._items 
    }


}

