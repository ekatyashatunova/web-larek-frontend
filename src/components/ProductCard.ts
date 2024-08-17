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

    setData(productData: IProductItem) {
        if (this.cardCategory) {
        this.cardCategory.textContent = productData.category;
    }
        this.cardTitle.textContent = productData.title;

        if(this.cardDescription){
            this.cardDescription.textContent = productData.description;
        }

        if(this.cardPrice === null) {
            this.cardPrice.textContent = 'Бесценно' 
        } else {
            this.cardPrice.textContent = productData.toString() + 'синапсов'
        }

        if(this.cardImage){
            this.cardImage.src = productData.image;
      }
     }

     render() {
        return this.element 
    }
}     
    

   

    

