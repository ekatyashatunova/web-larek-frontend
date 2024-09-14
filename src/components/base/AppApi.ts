import {IApi, IUser, IUserData, IProductItem, IOrderData, IResponseOrder} from '../../types';

export class AppApi {
    private _baseApi: IApi;

    constructor(baseApi: IApi) {
        this._baseApi = baseApi;
    }

    getProducts(): Promise<IProductItem[]> {
        return this._baseApi.get<IProductItem[]>(`/product`).then((products: IProductItem[]) => products)
    }

   postOrder(data: IOrderData): Promise<IResponseOrder> {
    return this._baseApi.post<IResponseOrder>(`/order`, data, `POST`).then((res:IResponseOrder ) => res)
   }

   /* setUserInfo(data: IUserData): Promise<IUser> {
        return this._baseApi.post<IUser>(`/order`, data, `POST`).then((res: IUser) => res)

    }

    setProducts(cards: IProductItem[]): Promise<IProductItem[]> {
        return this._baseApi.post<IProductItem[]>(`/product`, cards, `POST`).then((res:IProductItem[]) => res)
    }*/
}
