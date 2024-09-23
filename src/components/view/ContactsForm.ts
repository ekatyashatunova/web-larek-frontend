import { Form } from './Form';
import { IEvents } from '../base/events';
import {TUserContacts} from '../../types';


//Класс представления форма с контактами (телефон, эл.почта)
export class ContactsForm extends Form<TUserContacts> {
   constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
   }

  /* set email(value: string) {
    document.querySelector('[name="email"]').value = value;
}

set phone(value: string) {
    (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
}
   */ 

}