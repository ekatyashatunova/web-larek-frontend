import {ICatalog, IProductItem, IProductList} from '../types/index';
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

    getProduct(cardId: string) {
        return this.products.map((data) => data.id === cardId)
    }

    set preview(cardId: string | null) {
        if (!cardId) {
            this._preview = null;
            return;
        }
        const selectedCard = this.getProduct(cardId);
        if (selectedCard) {
            this._preview = cardId;
            this.events.emit('card:selected')
        }
    }

    get preview() {
        return this._preview
    }
}

