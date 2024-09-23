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

const cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
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

/*const testCard = [
    {
        "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
        "description": "Если планируете решать задачи в тренажёре, берите два.",
        "image": "/5_Dots.svg",
        "title": "+1 час в сутках",
        "category": "софт-скил",
        "price": 750
    },
    {
        "id": "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
        "description": "Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.",
        "image": "/Shell.svg",
        "title": "HEX-леденец",
        "category": "другое",
        "price": 1450
    },
    {
        "id": "412bcf81-7e75-4e70-bdb9-d3c73c9803b7",
        "description": "Откройте эти куки, чтобы узнать, какой фреймворк вы должны изучить дальше.",
        "image": "/Soft_Flower.svg",
        "title": "Фреймворк куки судьбы",
        "category": "дополнительное",
        "price": 2500
    },
]*/

 /*const testSection = document.querySelector('.gallery')*/
 const catalogCards = new Page(document.querySelector('.gallery'), events);

 //Загрузка данных товаров карточек
events.on('productsCard:loaded', () => {
	const cardsArray = catalog.getProducts().map((product) => {
		const cardInstant = new ProductCard(cloneTemplate(cardTemplate), events);
		return cardInstant.render(product);
	});

	catalogCards.render({cardsCatalog:cardsArray})
})

//Клик по карточке товара
events.on('product:open', ((data: {card: ProductCard}) => {
    const { card } = data;

    const productModal = catalog.getProduct(card.id);   
    const cardPreview = new ProductCard(cloneTemplate(cardPreviewTemplate), events);

    modal.render({content: cardPreview.render(productModal)});
    
}))

//Клик по кнопке корзина на главной странице
   events.on('basket:open', () => {
    basket.products = basketData.getAllProducts().map((product) => {
        const cardBasket = new ProductCard(cloneTemplate(basketTemplate), events);
       return cardBasket.render(product) ;
      
    })
    const basketTotalPrice = basketData.getTotalPrice();
    basket._basketPrice = basketTotalPrice;
 
    modal.render({content: basket.render()});
   
      
    })

//Клик по кнопке "В корзину"
/*events.on('product:add', ((data:{card: ProductCard}) => {
    const { card } = data;
    const cardInBasket = basketData.checkBasket(card.id);
    const cardAdd = new ProductCard(cloneTemplate(basketCardTemplate), events);
    cardAdd._checkBasket = cardInBasket;
    modal.render({content: cardAdd.render(cardAdd)}); //рендерим карточку с измененным текстом кнопки
}))*/



//Клик по кнопке "В корзину"
events.on('product:add', (product: ProductCard) => {
   basketData.addProduct(product);
   const productInBasket = basketData.checkBasket(product.id);
   console.log(basketData.checkBasket(product.id))
    const cardAdd = new ProductCard(cloneTemplate(basketCardTemplate), events);
    cardAdd.updateButtonBasket = productInBasket;
    modal.render({content: product.render(cardAdd)});

    modal.close();
    page.counterBasket = basketData.getProductsCounter();

})


//Клик по кнопке "Оформить"


//Удалить товар из корзины
/*events.on('product:delete', (product: ProductCard) => {
    
    const deleteProduct = catalog.getProduct(product.id);
    basketData.deleteProduct(deleteProduct);

})*/


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