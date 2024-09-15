import { Component} from "./base/Component";
import { TUserOrder } from "../types";
import { IEvents } from "./base/events";


export class PaymentForm extends Component<TUserOrder> {
    protected payment: HTMLElement;
    protected address: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
    }

}