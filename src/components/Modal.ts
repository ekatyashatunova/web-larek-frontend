import { Component } from "./base/Component";
import { IEvents } from "./base/events";

/*interface IModal {
  modal: HTMLElement;
}*/

export class Modal<T> extends Component<T> {
    protected _closeButton: HTMLButtonElement;
    protected _modal: HTMLElement;
    protected events: IEvents

    constructor(container:HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

       this._closeButton = document.querySelector('.modal__close');
        this._modal = document.querySelector('.modal__content');

       
        this._closeButton.addEventListener('click', this.close.bind(this));
        /*this.container.addEventListener('click', this.close.bind(this));*/
        
        
        this._modal.addEventListener('click', (event) => event.stopPropagation());
    }

    set modal(value: HTMLElement) {
      this._modal.replaceChildren(value);
    }
        
        open() {
          this.container.classList.add('modal_active');
          this.events.emit('modal:close');
        }
        
        close() {
            this.container.classList.remove('modal_active');
            this._modal = null;
            this.events.emit('modal:close');
        }

        render(data: T): HTMLElement {
          super.render(data);
          this.open();
          return this.container;
        }
    }

