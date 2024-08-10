export interface IProductItem {
    id: string,
    image: string,
    category: string,
    title: string,
    description: string,
    price: number | null
}

export interface IProductList {
    items: IProductItem[],
    total: number
}

export interface ICatalog {
    addProduct(card: IProductItem): void,
    getProduct(cardId: string): IProductItem
}

export interface IUser {
    payment: string,
    email: string,
    addres: string,
    phone: number
}

export interface IBasketData {
    addProduct(items: IProductItem): void;
    deleteProduct(items: IProductItem): void;
    checkBasketValidation(id: string): boolean;
    getTotalPrice(): number;
    getProductsCounter(): number;
    clearBasket(): void;
}

export interface IUserData {
    getUserData(): IUser; 
    setUserData(userData: IUser): void;
    checkValidationOrder(data: Record<keyof TUserOrder, string>): boolean;
}

export type TUserOrder = Pick<IUser, 'payment' | 'addres'>;
export type TUserContacts = Pick<IUser, 'email' | 'phone'>;
export type TBasketOrder = Pick<IProductItem, 'title' | 'price' | 'id'>

