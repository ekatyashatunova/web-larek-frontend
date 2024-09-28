import { Form } from './Form';
import { TUserOrder } from '../../types';
import { IEvents } from '../base/events';

//Класс представления формы с адресом и способом оплаты
export class PaymentForm extends Form<TUserOrder> {
	protected paymentCard: HTMLButtonElement;
	protected paymentCash: HTMLButtonElement;
	protected addressInput: HTMLInputElement;

	constructor(container: HTMLFormElement, protected events: IEvents) {
		super(container, events);

		this.paymentCash = this.container.cash as HTMLButtonElement;
		this.paymentCard = this.container.card as HTMLButtonElement;
		this.addressInput = this.container.querySelector('input[name=address]');

		this.paymentCard.addEventListener('click', () => {
			this.onInputChange('payment', 'card');
		});

		this.paymentCash.addEventListener('click', () => {
			this.onInputChange('payment', 'cash');
		});
	}

	set payment(value: string) {
		this.toggleClass(this.paymentCard, 'button_alt-active', value === 'card');
		this.toggleClass(this.paymentCash, 'button_alt-active', value === 'cash');
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}
}
