import {IApi, IUser, IUserData, IOrderData, IResponseOrder, IProductList} from '../../types';

export class AppApi {
    private _baseApi: IApi;

    constructor(baseApi: IApi) {
        this._baseApi = baseApi;
    }

    getProducts(): Promise<IProductList> {
        return this._baseApi.get<IProductList>(`/product`).then((products: IProductList) => products)
    }

   postOrder(data: IOrderData): Promise<IResponseOrder> {
    return this._baseApi.post<IResponseOrder>(`/order`, data, `POST`).then((res:IResponseOrder ) => res)
   }

    /*setProducts(cards: IProductItem[]): Promise<IProductItem[]> {
        return this._baseApi.post<IProductItem[]>(`/product`, cards, `POST`).then((res:IProductItem[]) => res)
    }*/
}
