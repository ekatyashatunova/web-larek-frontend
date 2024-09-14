import {cloneTemplate} from "../utils/utils";
import {IEvents } from "./base/events";
import {IProductItem} from '../types';
import {CDN_URL} from "../utils/constants";
import {Component} from "./base/Component";

export class ProductCard extends Component<IProductItem>{
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

    constructor(protected container: HTMLTemplateElement, events: IEvents) {
        super(container);
        this.events = events;

        this.cardCategory = this.container.querySelector('.card__category');
        this.cardTitle = this.container.querySelector('.card__title');
        this.cardImage = this.container.querySelector('.card__image');
        this.cardPrice = this.container.querySelector('.card__price');
        this.cardDescription = this.container.querySelector('.card__text');
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

    render(productData: Partial<IProductItem>| undefined) {
        const {...otherCardData} = productData;
        Object.assign(this, otherCardData);
        return this.container
     }

     set id(id) {
        this.cardId = id
    }

    set category(category: string) {
    this.cardCategory.textContent = category;
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
    

    /*price ? this.cardPrice.textContent = price.toString() + 'синапсов' : this.cardPrice.textContent = 'Бесценно' */
}

     get id() {
        return this.cardId
     }
}     
    

   

    

