import {IUser, IUserData, TUserOrder, TUserContacts} from '../types/index';
import {IEvents} from './base/events';


export class UserData implements IUserData {
    protected payment: string;
    protected email: string;
    protected address: string;
    protected phone: string ;
    protected events: IEvents 

    constructor(events: IEvents) {
        this.events = events;
    }

    getUserData(): IUser {
        return {payment: this.payment, email: this.email, address: this.address, phone: this.phone, }
    }

    setUserData(userData: IUser) {
        this.email = userData.email;
        this.address = userData.address;
        this.phone = userData.phone;
        this.events.emit('user:changed');
    }

    checkValidationOrder(data: Record<keyof TUserOrder, string>) {
        const isValidAddress = data.address.includes('');
        if (!isValidAddress) {
            this.events.emit('inValidAddress');
            return false
        }
            return true
        }


    }



