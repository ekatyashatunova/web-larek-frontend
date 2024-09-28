import { Component } from '../base/Component';
import { IEvents } from '../base/events';

export interface IPage {
	cardsCatalog: HTMLElement[];
	counterBasket: number;
	locked: boolean;
}

//Класс представления главной страницы
export class Page extends Component<IPage> {
	protected _cardsCatalog: HTMLElement;
	protected _counterBasket: HTMLElement;
	protected buttonBasket: HTMLButtonElement;
	protected _wrapper: HTMLElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);
		this.events = events;

		this.buttonBasket = document.querySelector('.header__basket');
		this._counterBasket = this.container.querySelector(
			'.header__basket-counter'
		);
		this._wrapper = this.container.querySelector('.page__wrapper');

		this.buttonBasket.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	set cardsCatalog(items: HTMLElement[]) {
		this.container.replaceChildren(...items);
	}

	set counterBasket(counterBasket: number) {
		this._counterBasket.textContent = counterBasket.toString();
	}

	set locked(value: boolean) {
		if (value) {
			this._wrapper.classList.add('page__wrapper_locked');
		} else {
			this._wrapper.classList.remove('page__wrapper_locked');
		}
	}
}
