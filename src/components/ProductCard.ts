import {cloneTemplate} from "../utils/utils";
import {IEvents } from "./base/events";
import {IProductItem} from '../types';
import {CDN_URL} from "../utils/constants";

export class ProductCard {
    protected element: HTMLElement;
    protected events: IEvents;
    protected cardCategory: HTMLElement;
    protected cardTitle: HTMLElement;
    protected cardImage: HTMLImageElement;
    protected cardPrice: HTMLElement;
    protected cardDescription: HTMLElement;
    protected cardId: string;
    protected deleteButton: HTMLButtonElement;
    protected cardBasketButton: HTMLButtonElement;
    //protected cardButton: HTMLButtonElement;//

    constructor(template: HTMLTemplateElement, events: IEvents) {
        this.events = events;
        this.element = cloneTemplate(template);

        this.cardCategory = this.element.querySelector('.card__category');
        this.cardTitle = this.element.querySelector('.card__title');
        this.cardImage = this.element.querySelector('.card__image');
        this.cardPrice = this.element.querySelector('.card__price');
        this.cardDescription = this.element.querySelector('.card__text');
       // this.deleteButton = this.element.querySelector('.basket__item-delete');
       // this.cardBasketButton = this.element.querySelector('.button.card__button');

       // this.deleteButton.addEventListener('click', () => {
           // this.events.emit('basket__item-delete:delete', {card: this})  
       // })

       // this.cardBasketButton.addEventListener('click', (event) => {
            //this.events.emit('basket__list:add', {card: this})   
       // })
       // this.cardButton = this.element.querySelector('.card');//

        //*this.cardButton.addEventListener('click', () => {
            //this.events.emit('card:open', {card: this})
       // }//
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
    if (this.cardTitle) {
    this.cardTitle.textContent = title;}
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
    price ? this.cardPrice.textContent = price.toString() + 'синапсов' : this.cardPrice.textContent = 'Бесценно' 
}

     get id() {
        return this.cardId
     }
}     
    

   

    

