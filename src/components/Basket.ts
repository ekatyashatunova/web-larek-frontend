import { Component } from "./base/Component";
import { IEvents } from "./base/events";

interface IBasket {
    items: HTMLElement[],
    total: number
}

export class Basket extends Component<IBasket> {
    protected basketList: HTMLElement;
    protected _total: HTMLElement;
    protected buttonsDelete: HTMLButtonElement;
    protected orderButton: HTMLButtonElement;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container);
        this.events = events;

        this.basketList =  this.container.querySelector('.basket__list');
        this._total = this.container.querySelector('.basket__price');
        this.buttonsDelete = this.container.querySelector('.basket__item-delete');
        this.orderButton = this.container.querySelector('.basket__button');

        this.orderButton.addEventListener('click', () => {
            this.events.emit('basket__button:open')    
        })
}

set items(items: HTMLElement[]) {
    if (items.length) {
        this.basketList.replaceChildren(...items);
        this.orderButton.disabled = false
    } else {
        this.orderButton.disabled = true
    }
}

set total(total: number) {
    this.(this._total, total.toString() + ' синапсов');
}
}