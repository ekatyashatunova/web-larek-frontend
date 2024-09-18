import {cloneTemplate} from "../utils/utils";
import {IEvents } from "./base/events";
import {IProductItem} from '../types';
import {CDN_URL} from "../utils/constants";
import {Component} from "./base/Component";

//Класс представления карточки товара
export class ProductCard extends Component<IProductItem>{
    protected cardCategory?: HTMLElement;
    protected cardTitle: HTMLElement;
    protected cardImage?: HTMLImageElement;
    protected cardPrice: HTMLElement;
    protected cardDescription?: HTMLElement;
    protected cardId: string;
    protected deleteButton: HTMLButtonElement;
    protected cardBasketButton: HTMLButtonElement;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container);

        this.cardCategory = this.container.querySelector('.card__category');
        this.cardTitle = this.container.querySelector('.card__title');
        this.cardImage = this.container.querySelector('.card__image');
        this.cardPrice = this.container.querySelector('.card__price');
        this.cardDescription = this.container.querySelector('.card__text');
        //this.deleteButton = document.querySelector('.basket__item-delete');
        this.cardBasketButton = document.querySelector('.button.card__button');

        /*this.deleteButton.addEventListener('click', () => {
            this.events.emit('basket__item-delete:delete', {card: this})
        })*/
        if (this.cardBasketButton) {
        this.cardBasketButton.addEventListener('click', () => {
            this.events.emit('basket__list:add', {card: this})
        })
        }
        
        this.container.addEventListener('click', () => {
            this.events.emit('card:open', {card: this})
        })
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
        if (this.cardCategory) {  
            this.cardCategory.classList.remove('.card__category_soft','.card__category_additional', '.card__category_other', '.card__category_button', '.card__category_hard');
            
            this.cardCategory.textContent = category;

        switch (category) {
            case 'софт-скилл':
                this.cardCategory.classList.add('.card__category_soft');
                break;
                case 'дополнительное':
                    this.cardCategory.classList.add('.card__category_additional');
                    break;
                    case 'другое':
                        this.cardCategory.classList.add('.card__category_other');
                        break;
                        case 'кнопка':
                            this.cardCategory.classList.add('.card__category_button');
                            break;
                            case 'хард-скилл':
                                this.cardCategory.classList.add('.card__category_hard');
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
        this.cardPrice.textContent = 'Бесценно'
    } else {
        this.cardPrice.textContent = price.toString() + ' синапсов' 
    }

    /*price ? this.cardPrice.textContent = price.toString() + 'синапсов' : this.cardPrice.textContent = 'Бесценно' */
}

     get id() {
        return this.cardId
     }
}     
    

   

    

