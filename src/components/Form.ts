import { Component } from "./base/Component";
import { IEvents } from "./base/events";

interface IForm {
    valid: boolean;
    inputValues: Record<string, string>;
    errors: Record<string, string>;
}

//Класс представления форма с данными покупателя
export class Form<T> extends Component<IForm> {
    protected inputs: NodeListOf<HTMLInputElement>;
    protected submitButton: HTMLButtonElement;
    protected formName: string;
    protected _form: HTMLFormElement;
    protected _errors: Record<string, HTMLElement>;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.inputs = this.container.querySelectorAll<HTMLInputElement>('.form__input');
        this._form = this.container.querySelector('.form')
        this.formName = this._form.getAttribute('name');
        this.submitButton = this.container.querySelector('button[type=submit]');

        this._errors = {};
        this.inputs.forEach((input) => {
            this._errors[input.name] = this._form.querySelector('.form__errors');
        })
    
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.events.emit(`${this.formName}:submit`, this.getInputValues());
        })

        this._form.addEventListener('input', (evt: Event) => {
            const target = evt.target as HTMLInputElement;
            const field = target.name;
            const value = target.value;
            this.events.emit(`${this.formName}:input`, {field, value})
        });
    }

    protected getInputValues() {
        const valuesObject: Record<string, string> = {};
        this.inputs.forEach((element) => {
            valuesObject[element.name] = element.name;
        })
        return valuesObject
    }

    set inputValues(data: Record<string, string>) {
        this.inputs.forEach((element) => {
            element.value = data[element.name]
        })
        

}
}