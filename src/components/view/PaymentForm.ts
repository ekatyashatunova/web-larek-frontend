import { Form } from './Form';
import { TUserOrder } from "../../types";
import { IEvents } from "../base/events";

//Класс представления формы с адресом и способом оплаты
export class PaymentForm extends Form<TUserOrder> {
    protected paymentCard: HTMLButtonElement;
    protected paymentCash: HTMLButtonElement;
    protected address: HTMLInputElement;

    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container, events);

        this.paymentCash = this.container.cash as HTMLButtonElement; 
        this.paymentCard = this.container.card as HTMLButtonElement; 
        this.address = this.container.querySelector('input[name=address]');

        this.paymentCard.addEventListener('click', () => {
            /*this._payment = 'card';*/
            this.events.emit('payment:select', {payment: 'card'})
        })

        this.paymentCash.addEventListener('click', () => {
            this.events.emit('payment:select', {payment: 'cash'})
        })
    }
    
   set _payment(value: string) {
    this.toggleClass(this.paymentCard, 'button_alt-active', value === 'card');
    this.toggleClass(this.paymentCash, 'button_alt-active', value === 'cash');
   }

    set _address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }

}