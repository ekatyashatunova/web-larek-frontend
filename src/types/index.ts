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
    setProduct(items: IProductItem[]): void,
    getProduct(): IProductItem[]
}

export interface IUser {
    payment: string,
    email: string,
    addres: string,
    phone: number
}

export interface IBasketData {
    getAllProducts(): IProductItem[],
    addProduct(product: IProductItem): void;
    deleteProduct(product: IProductItem): void;
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

