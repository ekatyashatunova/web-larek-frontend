import { Component } from "../base/Component";
import { IEvents } from "../base/events";
import { createElement } from "../../utils/utils"; 

interface IBasket {
    products: HTMLElement[],
    total: number,
}

//Класс представления корзины с товарами
export class Basket extends Component<IBasket> {
    protected basketList: HTMLElement;
    protected basketPrice: HTMLElement;
    protected basketIndex: HTMLElement;
    protected orderButton: HTMLButtonElement;
    
    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container);

        this.basketList =  this.container.querySelector('.basket__list');
        this.basketPrice = this.container.querySelector('.basket__price');
        this.orderButton = this.container.querySelector('.basket__button');

        this.orderButton.addEventListener('click', () => {
            this.events.emit('form:open')    
        })
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

set productIndex(productIndex: number) {
    this.basketIndex.textContent = productIndex.toString();
}

set total(total: number) {
    this.basketPrice.textContent = total.toString() + ' синапсов';
}

}