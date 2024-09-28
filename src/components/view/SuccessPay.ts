import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';
interface ISuccessPay {
	total: number;
}

//Класс представления успешной покупки
export class SuccessPay extends Component<ISuccessPay> {
	protected buttonSuccessClose: HTMLButtonElement;
	protected _total: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this.buttonSuccessClose = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			container
		);
		this._total = ensureElement<HTMLElement>(
			'.order-success__description',
			container
		);

		this.buttonSuccessClose.addEventListener('click', () => {
			this.events.emit('order:success');
		});
	}

	set total(total: number) {
		this._total.textContent = 'Cписано ' + total.toString() + ' синапсов';
	}
}
