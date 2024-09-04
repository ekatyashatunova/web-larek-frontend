import { cloneTemplate} from "../utils/utils";
import { IEvents } from "./base/events";
import {IProductItem} from '../types'

export class ProductCard {
    protected element: HTMLElement;
    protected events: IEvents;
    protected cardCategory: HTMLElement;
    protected cardTitle: HTMLElement;
    protected cardImage: HTMLImageElement;
    protected cardPrice: HTMLElement;
    protected cardDescription: HTMLElement;
    protected cardId: string;
    protected cardButton: HTMLButtonElement;

    constructor(template: HTMLTemplateElement, events: IEvents) {
        this.events = events;
        this.element = cloneTemplate(template);

        this.cardCategory = this.element.querySelector('.card__category');
        this.cardTitle = this.element.querySelector('.card__title');
        this.cardImage = this.element.querySelector('.card__image');
        this.cardPrice = this.element.querySelector('.card__price');
        this.cardDescription = this.element.querySelector('.card__text');
        this.cardButton = this.element.querySelector('.gallery__item');

        this.cardButton.addEventListener('click', () => {
            this.events.emit('gallery__item:open', {card: this})
        })
    }

    render(productData: Partial<IProductItem>) {
        const {title, image, ...otherCardData} = productData;
        Object.assign(this, otherCardData);
        return this.element
     }
     
     set id(id) {
    this.cardId = id
}
set category(category: string) {
    this.cardCategory.textContent = category;
}

set title(title: string) {
    this.cardTitle.textContent = title;
}

set description(description: string) {
    if (description) {
        this.cardDescription.textContent = description;
    } 
}

set image(image: string) {
    this.cardImage.src = image;
}

set price(price: number | null) {
    price ? this.cardPrice.textContent = price.toString() + 'синапсов' : this.cardPrice.textContent = 'Бесценно' 
}

     get id() {
        return this.cardId
     }
}     
    

   

    

