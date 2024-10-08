import { IBasketData, IProductItem, IProductList } from '../../types/index';
import { IEvents } from '../base/events';

//Модель данных товаров с корзиной
export class BasketData implements IBasketData {
	protected _products: IProductItem[] = [];
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	set products(products: IProductItem[]) {
		this._products = products;
	}

	getAllProducts(): IProductItem[] {
		return this._products;
	}

	addProduct(product: IProductItem) {
		this._products = [...this._products, product];
		this.events.emit('basket:add');
	}

	deleteProduct(product: IProductItem) {
		this._products = this._products.filter((data) => data.id !== product.id);
		this.events.emit('basket:delete');
		console.log(this._products);
	}

	checkBasket(id: string): boolean {
		return this._products.some((product) => product.id === id);
	}

	getTotalPrice(): number {
		return this._products.reduce((sum, product) => sum + product.price, 0);
	}

	getProductsCounter() {
		return this._products.length;
	}

	getProductIds(): string[] {
		return this._products.map((item) => item.id);
	}

	clearBasket() {
		this._products = [];
	}
}
