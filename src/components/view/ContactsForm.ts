import { Form } from './Form';
import { IEvents } from '../base/events';
import { TUserContacts } from '../../types';

//Класс представления форма с контактами (телефон, эл.почта)
export class ContactsForm extends Form<TUserContacts> {
	protected phoneInput: HTMLInputElement;
	protected emailInput: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this.phoneInput = this.container.querySelector('input[name=phone]');
		this.emailInput = this.container.querySelector('input[name=email]');
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}
}
