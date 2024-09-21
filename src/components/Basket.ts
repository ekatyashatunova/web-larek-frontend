import { Component } from "./base/Component";
import { IEvents } from "./base/events";
import { createElement } from "../utils/utils"; 

interface IBasket {
    products: HTMLElement[],
    total: number
}

//Класс представления корзины с товарами
export class Basket extends Component<IBasket> {
    protected basketList: HTMLElement;
    protected basketPrice: HTMLElement;
    protected buttonsDelete: HTMLButtonElement;
    protected orderButton: HTMLButtonElement;
    protected basketIndex: HTMLElement;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container);

        this.basketList =  this.container.querySelector('.basket__list');
        this.basketPrice = this.container.querySelector('.basket__price');
        this.buttonsDelete = this.container.querySelector('.basket__item-delete');
        this.orderButton = this.container.querySelector('.basket__button');
        this.basketIndex = this.container.querySelector('.basket__item-index')

        this.orderButton.addEventListener('click', () => {
            this.events.emit('form:open')    
        })

       /* this.buttonsDelete.addEventListener('click', () => {
            this.events.emit('product:delete')
        })*/

        this.products = []
}

set products(products: HTMLElement[]) {
    if (products.length) {
        this.basketList.replaceChildren(...products);
        this.orderButton.disabled = false;
    } else {
        this.basketList.replaceChildren(createElement<HTMLParagraphElement>('p', {
            textContent: 'Корзина пуста'
        }));
        this.orderButton.disabled = true;
    }
}



set index(index: number) {
    this.basketIndex.textContent = index.toString();
}

set _basketPrice(total: number) {
    this.basketPrice.textContent = total.toString() + ' синапсов';
}
}