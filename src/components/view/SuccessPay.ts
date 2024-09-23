import { Component } from "../base/Component"
interface ISuccessPay {
    total: number
}

interface ISuccessActions {
    onClick: () => void;
}

//Класс представления успешной покупки
export class SuccessPay extends Component<ISuccessPay> {
    protected buttonSuccess: HTMLButtonElement;
    protected _total: HTMLButtonElement

    constructor(container: HTMLElement, actions: ISuccessActions) {
        super(container);

        this.buttonSuccess = this.container.querySelector('order-success__close');
        this._total = this.container.querySelector('.order-success__description');

        if (actions?.onClick) {
            this.buttonSuccess.addEventListener('click', actions.onClick);
        }
    }

    set total(total:number) {
        this._total.textContent = 'Cписано '+ total.toString() + ' синапсов';
    }
}