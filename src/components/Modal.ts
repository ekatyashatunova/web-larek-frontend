import { Component } from "./base/Component";
import { IEvents } from "./base/events";
interface IModal {
    content: HTMLElement;
}

export class Modal extends Component<IModal> {
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(container:HTMLElement, protected events: IEvents) {
        super(container);

        this._closeButton = this.container.querySelector('.modal__close');
        this._content = this.container.querySelector('.modal__content');

        this._closeButton.addEventListener('click', this.close.bind(this))

        close()
    }
}
