import { Component } from "./base/Component";
import {IEvents } from "./base/events";

export interface IPage {
    cardsCatalog: HTMLElement[];
    counterBasket: HTMLElement
}

export class Page extends Component<IPage> {
    protected _cardsCatalog: HTMLElement[];
    protected _counterBasket: HTMLElement;
    protected buttonBasket: HTMLButtonElement;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container);
        this.events = events;

        this.buttonBasket = document.querySelector('.header__basket');
        this._counterBasket = this.container.querySelector('.basket__price');

        
       this.buttonBasket.addEventListener('click', () => {
            this.events.emit('basket:open');
        })
    
    }

    set cardsCatalog(items: HTMLElement[]) {
        this.container.replaceChildren(...items);
    }
}

