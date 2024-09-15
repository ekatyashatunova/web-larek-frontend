import {ICatalog, IProductItem} from '../types/index';
import {IEvents} from '../components/base/events';


//Модель данных каталога товаров
export class Catalog implements ICatalog {
    protected products: IProductItem[];
    protected _preview: string | null;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }
    
    setProduct(items: IProductItem[]) {
        this.products =  items;
        this.events.emit('products:changed');
    }

    getProducts(): IProductItem[] {
        return this.products
    }

    getProduct(productId: string) {
        return this.products.find((data) => data.id === productId)
    }

   

    get preview() {
        return this._preview
    }
}

