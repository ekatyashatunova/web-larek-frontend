import { Component } from "./base/Component";
import { IEvents } from "./base/events";

/*interface IModal {
  modal: HTMLElement;
}*/

//Класс представления модального окна
export class Modal<T> extends Component<T> {
    protected _closeButton: HTMLButtonElement;
    protected _modal: HTMLElement;
   
    protected events: IEvents

    constructor(container:HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        const _closeButton = this.container.querySelector('.modal__close');
        this._modal = this.container.querySelector('.modal__content');
        

        _closeButton.addEventListener('click', this.close.bind(this));
        this.container.addEventListener("mousedown", (evt) => {
          if (evt.target === evt.currentTarget) {
            this.close();
          }
          this.handleEscUp = this.handleEscUp.bind(this);
        });
      
        
        /*this._modal.addEventListener('click', (event) => event.stopPropagation());*/
    }

    set modal(value: HTMLElement) {
      this._modal.replaceChildren(value);
    }
        
        open() {
          this.container.classList.add('modal_active');
          document.addEventListener("keyup", this.handleEscUp);
          this.events.emit('modal:close');
        }
        
        close() {
            this.container.classList.remove('modal_active');
            document.removeEventListener("keyup", this.handleEscUp);
            this._modal = null;
            this.events.emit('modal:close');
        }

        handleEscUp (evt: KeyboardEvent) {
          if (evt.key === "Escape") {
            this.close();
          }
        };

        render(data: T): HTMLElement {
          super.render(data);
          this.open();
          return this.container;
        }
    }
  

