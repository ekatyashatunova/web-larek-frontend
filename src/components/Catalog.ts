import {ICatalog, IProductItem} from '../types/index';
import {IEvents} from '../components/base/events';


//Модель данных каталога товаров
export class Catalog implements ICatalog {
    protected products: IProductItem[];
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }
    
    setProduct(items: IProductItem[]) {
        this.products =  items
    }

    getProduct(): IProductItem[] {
        return this.products
    }
}

