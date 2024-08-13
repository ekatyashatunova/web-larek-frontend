import {IUser, IUserData, TUserOrder, TUserContacts} from '../types/index';
import {IEvents} from './base/events';


export class UserData implements IUserData {
    protected payment: string;
    protected email: string;
    protected addres: string;
    protected phone: number ;
    protected events: IEvents 

    constructor(events: IEvents) {
        this.events = events;
    }

    getUserData(): IUser {
        return {payment: this.payment, email: this.email, addres: this.addres, phone: this.phone, }
    }

    setUserData(userData: IUser) {
        this.email = userData.email;
        this.addres = userData.addres;
        this.phone = userData.phone;
        this.events.emit('user:changed');
    }

    checkValidationOrder(data: Record<keyof TUserOrder, string>) {

    }

    checkValidationContacts(data: Record<keyof TUserContacts, string>) {

    }
}

