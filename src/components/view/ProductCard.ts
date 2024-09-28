import { IEvents } from '../base/events';
import { IProductItem } from '../../types';
import { CDN_URL } from '../../utils/constants';
import { Component } from '../base/Component';

//Класс представления карточки товара
interface ICard extends IProductItem {
	isButtonActive?: boolean;
}
export class ProductCard extends Component<ICard> {
	protected cardCategory?: HTMLElement;
	protected cardTitle: HTMLElement;
	protected cardImage?: HTMLImageElement;
	protected cardPrice: HTMLElement;
	protected cardDescription?: HTMLElement;
	protected cardId: string;
	protected cardBasketButton?: HTMLButtonElement;
	protected buttonsDelete?: HTMLButtonElement;
	protected cardIndex?: HTMLElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);

		this.cardCategory = this.container.querySelector('.card__category');
		this.cardTitle = this.container.querySelector('.card__title');
		this.cardImage = this.container.querySelector('.card__image');
		this.cardPrice = this.container.querySelector('.card__price');
		this.cardDescription = this.container.querySelector('.card__text');
		this.cardBasketButton = this.container.querySelector(
			'.button.card__button'
		);
		this.buttonsDelete = this.container.querySelector('.basket__item-delete');
		this.cardIndex = this.container.querySelector('.basket__item-index');

		if (this.cardBasketButton) {
			this.cardBasketButton.addEventListener('click', (event) => {
				event.stopPropagation();
				this.events.emit('product:add', { card: this });
			});
		}

		if (this.buttonsDelete) {
			this.buttonsDelete.addEventListener('click', (event) => {
				event.stopPropagation();
				this.events.emit('product:delete', { card: this });
			});
		}

		this.container.addEventListener('click', (event) => {
			event.stopPropagation();
			this.events.emit('product:open', { card: this });
		});
	}

	set id(id) {
		this.cardId = id;
	}

	set category(category: string) {
		if (this.cardCategory) {
			switch (category) {
				case 'софт-скил':
					this.cardCategory.classList.add('card__category_soft');
					break;
				case 'дополнительное':
					this.cardCategory.classList.add('card__category_additional');
					break;
				case 'другое':
					this.cardCategory.classList.add('card__category_other');
					break;
				case 'кнопка':
					this.cardCategory.classList.add('card__category_button');
					break;
				case 'хард-скил':
					this.cardCategory.classList.add('card__category_hard');
					break;

				default:
					break;
			}
		}
	}

	set title(title: string) {
		if (this.cardTitle) {
			this.cardTitle.textContent = title;
		}
	}

	set description(description: string) {
		if (this.cardDescription) {
			this.cardDescription.textContent = description;
		}
	}

	set image(image: string) {
		if (this.cardImage) {
			this.cardImage.src = CDN_URL + image;
		}
	}

	set price(price: number | null) {
		if (price === null) {
			this.cardPrice.textContent = 'Бесценно';
		} else {
			this.cardPrice.textContent = price.toString() + ' синапсов';
		}
	}

	set index(index: number) {
		this.cardIndex.textContent = index.toString();
	}

	set isButtonActive(value: boolean) {
		this.cardBasketButton.disabled = !value;
	}

	get id() {
		return this.cardId;
	}
}
