import './scss/styles.scss';
import { EventEmitter } from '../src/components/base/events';
import { UserData } from './components/model/UserData';
import { BasketData } from './components/model/BasketData';
import { Catalog } from './components/model/Catalog';
import { IApi } from './types';
import { Api } from './components/base/api';
import { API_URL, settings } from './utils/constants';
import { AppApi } from './components/base/AppApi';
import { ProductCard } from './components/view/ProductCard';
import { Page } from './components/view/Page';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Basket } from './components/view/Basket';
import { Modal } from './components/view/Modal';
import { PaymentForm } from './components/view/PaymentForm';
import { TUserOrder } from './types/index';
import { TUserContacts } from './types/index';
import { ContactsForm } from './components/view/ContactsForm';
import { SuccessPay } from './components/view/SuccessPay';

const events = new EventEmitter();
const userData = new UserData(events);

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

const basketData = new BasketData(events);

const catalog = new Catalog(events);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketCardTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const paymentFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successPayTemplate = ensureElement<HTMLTemplateElement>('#success');

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const page = new Page(document.body, events);
const paymentForm = new PaymentForm(cloneTemplate(paymentFormTemplate), events);
const contactsForm = new ContactsForm(
	cloneTemplate(contactsFormTemplate),
	events
);
const success = new SuccessPay(cloneTemplate(successPayTemplate), events);

events.onAll((event) => {
	console.log(event.eventName, event.data);
});

const promise = api.getProducts();
promise
	.then((data) => {
		catalog.setProduct(data.items);
	})
	.catch((err) => {
		console.error(err);
	});

const catalogCards = new Page(document.querySelector('.gallery'), events);

//Загрузка данных товаров карточек
events.on('productsCard:loaded', () => {
	const cardsArray = catalog.getProducts().map((product) => {
		const cardInstant = new ProductCard(
			cloneTemplate(cardCatalogTemplate),
			events
		);
		return cardInstant.render(product);
	});

	catalogCards.render({ cardsCatalog: cardsArray });
});

//Клик по карточке товара
events.on('product:open', (data: { card: ProductCard }) => {
	const { card } = data;

	const productOpen = catalog.getProduct(card.id);
	const cardPreview = new ProductCard(
		cloneTemplate(cardPreviewTemplate),
		events
	);

	let isButtonActive = true;

	if (basketData.checkBasket(card.id)) {
		isButtonActive = false;
	}

	if (productOpen.price <= 0) {
		isButtonActive = false;
	}

	modal.render({
		content: cardPreview.render({ ...productOpen, isButtonActive }),
	});
});

//Клик по кнопке корзина на главной странице
events.on('basket:open', () => {
	const productOrdered = basketData.getAllProducts().map((product, index) => {
		const cardBasket = new ProductCard(
			cloneTemplate(basketCardTemplate),
			events
		);
		cardBasket.index = index + 1;
		return cardBasket.render(product);
	});

	basket.products = productOrdered;
	basket.total = basketData.getTotalPrice();

	modal.render({ content: basket.render() });
});

//Клик по кнопке "В корзину"
events.on('product:add', (data: { card: ProductCard }) => {
	const { card } = data;
	const cardAdd = catalog.getProduct(card.id);
	basketData.addProduct(cardAdd);
});

events.on('basket:add', () => {
	page.counterBasket = basketData.getProductsCounter();
	modal.close();
});

//Удалить товар из корзины
events.on('product:delete', (data: { card: ProductCard }) => {
	const { card } = data;
	const cardDelete = catalog.getProduct(card.id);
	basketData.deleteProduct(cardDelete);
});

events.on('basket:delete', () => {
	const productOrdered = basketData.getAllProducts().map((product, index) => {
		const cardBasket = new ProductCard(
			cloneTemplate(basketCardTemplate),
			events
		);
		cardBasket.index = index + 1;
		return cardBasket.render(product);
	});

	basket.products = productOrdered;
	basket.total = basketData.getTotalPrice();
	page.counterBasket = basketData.getProductsCounter();
	modal.render({ content: basket.render() });
});

//Клик по кнопке "Оформить"
events.on('form:open', () => {
	modal.render({
		content: paymentForm.render({
			address: '',
			payment: '',
			valid: false,
			errors: [],
		}),
	});
});

// Изменилось одно из полей
events.on(
	/^order\..*:change/,
	(data: { field: keyof TUserOrder; value: string }) => {
		userData.setPaymentForm(data.field, data.value);
	}
);

// Изменилось состояние валидации формы
events.on('formPaymentErrors:change', (errors: Partial<TUserOrder>) => {
	const { payment, address } = errors;
	paymentForm.valid = !payment && !address;
	paymentForm.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');
	paymentForm.render({ payment: userData.getUserOrder().payment });
});

//Клип по кнопке "Далее" в форме с данными покупателя
events.on('order:submit', () => {
	modal.render({
		content: contactsForm.render({
			phone: '',
			email: '',
			valid: false,
			errors: [],
		}),
	});
});

// Изменилось одно из полей
events.on(
	/^contacts\..*:change/,
	(data: { field: keyof TUserContacts; value: string }) => {
		userData.setContactsForm(data.field, data.value);
	}
);

// Изменилось состояние валидации формы
events.on('formErrors:change', (errors: Partial<TUserContacts>) => {
	const { phone, email } = errors;
	contactsForm.valid = !phone && !email;
	contactsForm.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});

//Клик по кнопке "Оплатить" в форме с данными покупателя
events.on('contacts:submit', () => {
	const orderSuccess = {
		...userData.getUserOrder(),
		items: basketData.getProductIds(),
		total: basketData.getTotalPrice(),
	};

	api
		.postOrder(orderSuccess)
		.then((result) => {
			basketData.clearBasket();
			userData.clearUserData();
			page.counterBasket = basketData.getProductsCounter();

			success.total = result.total;
			modal.render({
				content: success.render(),
			});
		})
		.catch((err) => {
			console.error(err);
		});
});

//Клик по кнопке За новыми покупками
events.on('order:success', () => {
	modal.close();
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
});
