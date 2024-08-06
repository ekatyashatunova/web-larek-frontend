# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Данные и типы данных, используемые в приложении

Карточка товара

```

export interface IProductItem {
    id: string,
    image: string,
    category: string,
    title: string,
    description: string,
    price: number
}
```

Интерфейс для каталога товаров

```

export interface IProductList {
    items: IProductItem[],
    preview: string | null
}
```

Данные пользователя

```

export interface IUser {
    payment: string,
    email: string,
    addres: string,
    phone: number
}
```

Данные пользователя в форме с адресом и способом оплаты

```

export type TUserOrder = Pick<IUser, 'payment' | 'addres'>
```

Данные пользователя в форме с почтой и телефоном

```

export type TUserContacts = Pick<IUser, 'email' | 'phone'>
```

Корзина с товарами

```

export type TBasketOrder = Pick<IProductItem, 'title' | 'price' | 'id'>
```

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP:
- слой представления, отвечает за отображение данных на странице,
- слой данных, отвечает за хранение и изменение данных,
- презентер, отвечает за связь представления и данных.

### Базовый код

#### Класс API
Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес 
сервера и опциональный объект с заголовками запросов.
Методы:
- `get` - выполняет GET запросна переданный в параметрах ендпоинт и возвращает промис с
объектом, которым ответил сервер
- `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и 
отправляет эти данные на ендпоинт, переданный как параметр при вызове метода. По умолчанию
выполняется `POST` запрос,но метод запроса может быть переопределен заданием третьего параметра при вызове.

#### Класс EventEmitter
Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе.
Класс используется в презентере для обработки событий и в слоях приложения для генерации события.
Основыне методы, реализуемые классом описаны интерфейсом `IEvents`:
- `on` - подписка на событие
- `emit` - инициализация события
- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие

### Слой данных

#### Класс BasketData
Класс отвечает за логику и хранение данных товаров в корзине.\
Конструктор принимает инстант брокера событий.\
В классе есть следующие поля:
- title: string - название товара
- price: number - стоимость товара
- id: string -  id товара
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных.

В классе есть следующие методы:
- addProduct(items: IProductItem): void; - добавить товар в корзину.
- deleteProduct(items: IProductItem): void; - удалить товар из корзины.
- getAllProducts(items: IProductItem[]): void; - получить массив товаров.
- checkBasketValidation(id: string): boolean; 
- getTotalPrice(): number; - получить общую стоимость товаров.
- getProductsCounter(): number; - получить общее количество товаров в корзине.
- clearBasket(): void; - очистить корзину.
- а также сеттеры и геттеры для получения и сохранения данных.

#### Класс UserData
Класс отвечает за хранение и логику работы с данными покупателя.\
Конструктор класса принимает инстант брокера событий\
В классе есть следующие поля:
- payment: string - способ оплаты
- email: string - электронная почта покупателя
- addres: string - адрес доставки покупателя
- phone: number - номер телефона покупателя
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных.

В классе есть следующие методы:
- getUserOrder(): TUserOrder - возвращает данные покупателя
- setUserOrder(userData: IUser): void - сохраняет данные покупателя
- а также сеттеры и геттеры для сохранения и получения данных из полей класса

### Классы представления
Все классы представления отвечают за отображение внутри контейнера (DOM-элементов) передаваемых в них данных.

#### Класс ProductCard
Отвечает за отображение карточки товара, задавая в карточке данные изображения, названия, описания, категории, стоимости и id товара.
Класс используется для отображения карточек товаров на главной странице приложения. В конструктор класса передается DOM элемент темплейта, что позволяет при необходимости формировать карточки разных вариантов верстки. В классе устанавливаются слушатели на все интерактивные элементы.
Поля класса содержат элементы разметки элементов карточки товара.

Методы:
- setData(productData: IProductItem): void - 
- 




#### Класс UserInfo
Отвечает за блок сайта с информацией о покупателе.

Методы:
- setValid(isValid: boolean): void - изменяет активность кнопки 'Далее'

### Слой коммуникации

#### Класс AppApi
Принимает в конструктор экземпляр класса Api и предоставляет методы реализации с бэкендом сервиса.

## Взаимодействие компонентов
Код, описывающий взаимодействие представления и данных между собой находится в файле `index.ts`, выполняющем роль презентера.
Взаимодействие осуществляется за счёт событий генерируемых с помощью брокера событий, описанных в `index.ts`.
В `index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.

*Список всех событий, которые могут генерироваться в системе:*\
*События изменения данных (генерируются классами моделями данных)
- `user:changed` - изменение данных покупателя

*События, возникающие при взаимодействии пользователя с интерфейсом (генерируются классами, отвечающими за представление)*
- `card:open` - открытие модального окна карточки товара
- `card__button:open` - открытие модального окна корзины товаров
- `basket:open` - открытие модального окна корзины товаров
- `basket__item-delete:delete` - удалить товар из корзины
- `basket__list:add` - добавить товар в корзину
- `basket__button:open` - при нажатии на кнопку 'Оформить' открывается форма с данными пользователя
- `order__buttons:select` - выбрать способ оплаты
- `address:input` - изменение данных в форме с данными пользователя
- `order:validation` - событие, сообщающее о необходимости валидации формы с данными пользователя
- `order:submit` - событие, генерируемое при нажатии кнопки 'Далее'
- `email:input` - изменение данных в форме с данными пользователя
- `phone:input` - изменение данных в форме с данными пользователя
- `contacts:validation` - событие, сообщающее о необходимости валидации формы с данными пользователя
- `contacts:submit` - событие, генерируемое при нажатии кнопки 'Оплатить'
- `order-success__close:button` - событие, генерируемое при нажатии кнопки 'За новыми покупками'



