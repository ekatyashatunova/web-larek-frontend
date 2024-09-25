import { IProductItem } from './types/index';

import './scss/styles.scss';
import {EventEmitter, IEvents} from '../src/components/base/events';
import {UserData} from './components/model/UserData';
import {BasketData} from './components/model/BasketData';
import {Catalog} from './components/model/Catalog';
import { IApi } from './types';
import { Api} from './components/base/api';
import {API_URL,settings} from './utils/constants';
import {AppApi} from './components/base/AppApi';
import {ProductCard} from './components/view/ProductCard';
import {Page} from './components/view/Page';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Basket } from './components/view/Basket';
import { Modal } from './components/view/Modal';
import { Form } from './components/view/Form';

const events = new EventEmitter();
const userData = new UserData(events);

/*const testUserData = {
    "payment": "credit",
    "email": "test@test.ru",
    "phone": "+71234567890",
    "address": "Spb Vosstania 1"
}

userData.setUserOrder(testUserData);
console.log(userData.getUserOrder());
/*console.log(userData.checkValidationOrder(testUserData))*/

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi)

const basketData = new BasketData(events);
basketData.products = [];

const catalog = new Catalog(events);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketCardTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const paymentFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successPayTemplate = ensureElement<HTMLTemplateElement>('#success')


const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const page = new Page(document.body, events);

          
     
events.onAll((event) => {
    console.log(event.eventName, event.data)
})

const promise = api.getProducts();
promise.then((data) => {
    catalog.setProduct(data.items);
    events.emit('productsCard:loaded');
})
.catch((err) => {
    console.error(err)
 })

 /*const testSection = document.querySelector('.gallery')*/
 const catalogCards = new Page(document.querySelector('.gallery'), events);

 //Загрузка данных товаров карточек
events.on('productsCard:loaded', () => {
	const cardsArray = catalog.getProducts().map((product) => {
		const cardInstant = new ProductCard(cloneTemplate(cardCatalogTemplate), events);
		return cardInstant.render(product);
	});

	catalogCards.render({cardsCatalog:cardsArray})
})

//Клик по карточке товара
events.on('product:open', ((data: {card: ProductCard}) => {
    const { card } = data;

    const productModal = catalog.getProduct(card.id);   
    const cardPreview = new ProductCard(cloneTemplate(cardPreviewTemplate), events);
    const productInBasket = basketData.checkBasket(card.id);
    cardPreview.updateButtonBasket = productInBasket;
    modal.render({content: cardPreview.render(productModal)});
    
}))

//Клик по кнопке корзина на главной странице
   events.on('basket:open', () => {
    const productOrdered = basketData.getAllProducts().map((product, index) => {
        const cardBasket = new ProductCard(cloneTemplate(basketCardTemplate), events);
        cardBasket.index = index + 1;
        return cardBasket.render(product)
    })
    
    basket.products =  productOrdered;
    basket.total = basketData.getTotalPrice();
   
    modal.render({content: basket.render()})
    
    })

//Клик по кнопке "В корзину"
events.on('product:add', (data: {card: ProductCard}) => {
    const { card } = data;
    const cardAdd = catalog.getProduct(card.id);
     basketData.addProduct(cardAdd);
     console.log(basketData.getAllProducts(), {})
})

events.on('basket:changed', () => {
    page.counterBasket = basketData.getProductsCounter();
    modal.close();
})

//Удалить товар из корзины
/*events.on('product:delete', (card: ProductCard) => {
const { product } = data;
const cardDelete = catalog.getProduct(card.id);
basketData.deleteProduct(card);
})

events.on('basket:delete', () => {
    const productOrdered = basketData.getAllProducts().map((product, index) => {
        const cardBasket = new ProductCard(cloneTemplate(basketCardTemplate), events);
        cardBasket.index = index - 1;
        return cardBasket.render(product)
})

basket.products =  productOrdered;
modal.render({content: basket.render()})
})*/



//Клик по кнопке "Оформить"
events.on('form:open', () => {
    const form = new Form(cloneTemplate(paymentFormTemplate), events);
    modal.render({content: form.render() });
})

//Клип по кнопке "Далее" в форме с данными покупателя


//Клик по кнопке "Оплатить" в форме с данными покупателя




// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
    page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
    page.locked = false;
});