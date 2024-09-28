import { ICatalog, IProductItem, IProductList } from '../../types';
import { IEvents } from '../base/events';

//Модель данных каталога товаров
export class Catalog implements ICatalog {
	protected products: IProductItem[];
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	setProduct(items: IProductItem[]) {
		this.products = items;
		this.events.emit('productsCard:loaded');
	}

	getProducts(): IProductItem[] {
		return this.products;
	}

	getProduct(cardId: string) {
		return this.products.find((data) => data.id === cardId);
	}
}
