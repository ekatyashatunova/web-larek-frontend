import {
	IUser,
	TUserOrder,
	TUserContacts,
	FormErrors,
} from '../../types/index';
import { IEvents } from '../base/events';

//Модель данных покупателя
export class UserData {
	protected payment: string;
	protected email: string;
	protected address: string;
	protected phone: string;
	protected events: IEvents;
	formErrors: FormErrors = {};

	constructor(events: IEvents) {
		this.events = events;
	}

	getUserOrder(): IUser {
		return {
			payment: this.payment,
			email: this.email,
			address: this.address,
			phone: this.phone,
		};
	}

	setPaymentForm(field: keyof TUserOrder, value: string) {
		this[field] = value;
		this.validationPaymentForm();
	}

	validationPaymentForm() {
		const errors: typeof this.formErrors = {};

		if (!this.address) {
			errors.address = 'Введите адрес';
		}

		if (!this.payment) {
			errors.payment = 'Выберите способ оплаты';
		}

		this.events.emit('formPaymentErrors:change', errors);
	}

	setContactsForm(field: keyof TUserContacts, value: string) {
		this[field] = value;
		this.validationContactsForm();
	}

	validationContactsForm() {
		const errors: typeof this.formErrors = {};
		if (!this.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.phone) {
			errors.phone = 'Необходимо указать телефон';
		}

		this.events.emit('formErrors:change', errors);
	}

	clearUserData() {
		(this.payment = ''),
			(this.email = ''),
			(this.address = ''),
			(this.phone = '');
	}

	getErrors(): FormErrors {
		return this.formErrors;
	}
}
