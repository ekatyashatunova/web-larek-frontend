import { Form } from './Form';
import { IEvents } from '../base/events';
import {TUserContacts} from '../../types';


//Класс представления форма с контактами (телефон, эл.почта)
export class ContactsForm extends Form<TUserContacts> {
    protected phone: HTMLInputElement;
    protected email: HTMLInputElement;
    /*protected buttonSubmit: HTMLButtonElement;*/
    
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this.phone = this.container.querySelector('input[name=phone]');
        this.email = this.container.querySelector('input[name=email]');
        /*this.buttonSubmit = this.container.querySelector('button') as HTMLButtonElement;

        this.buttonSubmit.addEventListener('click', () => {
            this.events.emit('contactsForm:open');*/
    };
        


   
   set _phone(value: string) {
    (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
}

set _email(value: string) {
    (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
}

}