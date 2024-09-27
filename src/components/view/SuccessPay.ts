import { Component } from "../base/Component";
import { IEvents } from "../base/events";
interface ISuccessPay {
    total: number
}

//Класс представления успешной покупки
export class SuccessPay extends Component<ISuccessPay> {
    protected buttonSuccess: HTMLButtonElement;
    protected _total: HTMLButtonElement

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.buttonSuccess = this.container.querySelector('order-success__close');
        this._total = this.container.querySelector('.order-success__description');

       
            this.buttonSuccess.addEventListener('click', () => {
                this.events.emit('order:success')
            });
    }

    set total(total:number) {
        this._total.textContent = 'Cписано '+ total.toString() + ' синапсов';
    }
}