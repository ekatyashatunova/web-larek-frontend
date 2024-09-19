import { Component } from "./base/Component";
import { IEvents } from "./base/events";
import { ensureElement } from "../utils/utils";

interface IModal {
  content: HTMLElement;
}

//Класс представления модального окна
export class Modal extends Component<IModal> {
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this._content = ensureElement<HTMLElement>('.modal__content', container);
        
        this._closeButton.addEventListener('click', this.close.bind(this));
        this._content.addEventListener('click', (event) => event.stopPropagation());
        this.handleEscUp = this.handleEscUp.bind(this);
    }

    set content(value: HTMLElement) {
      this._content.replaceChildren(value);
    }
        
        open() {
          this.container.classList.add('modal_active');
          document.addEventListener("keyup", this.handleEscUp);
          this.events.emit('modal:open');
        }
        
        close() {
            this.container.classList.remove('modal_active');
            document.removeEventListener("keyup", this.handleEscUp);
            /*this.content.remove();*/
            this.content = null;
            this.events.emit('modal:close');
        }

        handleEscUp (evt: KeyboardEvent) {
          if (evt.key === "Escape") {
            this.close();
          }
        };
    
        render(data: IModal): HTMLElement {
          super.render(data);
          this.open();
          return this.container;
        }
    }
  

