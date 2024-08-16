import {IApi, IUser, IUserData, IProductItem} from '../../types';

export class AppApi {
    private _baseApi: IApi;

    constructor(baseApi: IApi) {
        this._baseApi = baseApi;
    }

    getUser(): Promise<IUser> {
        return this._baseApi.get<IUser>(`/order`).then((user: IUser) => user)
    }

    getProducts(): Promise<IProductItem[]> {
        return this._baseApi.get<IProductItem[]>(`/product`).then((products: IProductItem[]) => products)
    }

    setUserInfo(data: IUserData): Promise<IUser> {
        return this._baseApi.post<IUser>(`/order`, data, `POST`).then((res: IUser) => res)

    }

    setProducts(cards: IProductItem[]): Promise<IProductItem[]> {
        return this._baseApi.post<IProductItem[]>(`/product`, cards, `POST`).then((res:IProductItem[]) => res)
    }
}