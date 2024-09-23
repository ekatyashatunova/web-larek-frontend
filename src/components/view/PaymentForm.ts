import { Form } from './Form';
import { TUserOrder } from "../../types";
import { IEvents } from "../base/events";


//Класс представления формы с адресом и способом оплаты
export class PaymentForm<T> extends Form<TUserOrder> {
    protected payment: HTMLElement;
    protected address: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);
    }

}