import {cloneTemplate} from "../utils/utils";
import {IEvents } from "./base/events";
import {IProductItem} from '../types';
import {CDN_URL} from "../utils/constants";
import {Component} from "./base/Component";

//Класс представления карточки товара
export class ProductCard extends Component<IProductItem> {
    protected cardCategory?: HTMLElement;
    protected cardTitle: HTMLElement;
    protected cardImage?: HTMLImageElement;
    protected cardPrice: HTMLElement;
    protected cardDescription?: HTMLElement;
    protected cardId: string;
    protected deleteButton: HTMLButtonElement;
    protected cardBasketButton: HTMLButtonElement;

    //Для отключения кнопки если товар бесценный
    protected buttonDisabled: boolean;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container);

        this.cardCategory = this.container.querySelector('.card__category');
        this.cardTitle = this.container.querySelector('.card__title');
        this.cardImage = this.container.querySelector('.card__image');
        this.cardPrice = this.container.querySelector('.card__price');
        this.cardDescription = this.container.querySelector('.card__text');
        //this.deleteButton = document.querySelector('.basket__item-delete');
        this.cardBasketButton =this.container.querySelector('.button.card__button');

        /*this.deleteButton.addEventListener('click', () => {
            this.events.emit('basket__item-delete:delete', {card: this})
        })*/
        if (this.cardBasketButton) {
        this.cardBasketButton.addEventListener('click', (event) => {
            event.stopPropagation();
            this.events.emit('product:add', {card: this})
        })
        }
        
        this.container.addEventListener('click', (event) => {
            event.stopPropagation();
            this.events.emit('product:open', {card: this})
        })
    }

    render(productData: Partial<IProductItem>| undefined) {
        const {...otherCardData} = productData;
        Object.assign(this, otherCardData);
        return this.container
     }

     set id(id) {
        this.cardId = id;
         
    }

    set category(category: string) {
       if (this.cardCategory) {  
            this.cardCategory.classList.remove('card__category_soft', 'card__category_additional', 'card__category_other', 'card__category_button', 'card__category_hard');
        }
            
            this.cardCategory.textContent = category; 
            /*console.log(this.cardCategory);*/

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


//Проверка если товар в корзине - меняем текст кнопки 'Удалить из корзины'

    /*if(this.cardBasketButton) {
    
        this.cardBasketButton.textContent = this.buttonDisabled ? 'Удалить из корзины': 'В корзину'
    }
}*/

set price(price: number | null) {

    if (price === null) {
        this.cardPrice.textContent = 'Бесценно';
        this.buttonDisabled = true;
    } else {
        this.cardPrice.textContent = price.toString() + ' синапсов';
        this.buttonDisabled = false;
    }
    
    if(this.cardBasketButton) {
        this.cardBasketButton.disabled = this.buttonDisabled;
    }
}



     get id() {
        return this.cardId

     }
} 
    
    

   

    

