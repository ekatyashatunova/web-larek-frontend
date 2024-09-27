import {IUser, IUserData, TUserOrder, TUserContacts, FormErrors} from '../../types/index';
import {IEvents} from '../base/events';

//Модель данных покупателя
export class UserData implements IUserData {
    protected _payment: string;
    protected _email: string;
    protected _address: string;
    protected _phone: string ;
    protected events: IEvents 
    formErrors: FormErrors = {};

    constructor(events: IEvents) {
        this.events = events;
    }

    setUserOrder(userData: IUser) {
        this._payment = userData.payment,
        this._email = userData.email,
        this._phone = userData.phone,
        this._payment = userData.payment
    }

    getUserOrder(): IUser {
        return {payment: this._payment, email: this._email, address: this._address, phone: this._phone}
    }

/*set payment(payment:string) {
    this._payment = payment
}

set address(address:string) {
    this._address = address
}

set email(email:string) {
    this._email = email
}

set phone(phone:string) {
    this._phone = phone
}*/

    setPaymentForm(field: keyof TUserOrder, value: string) {
        this[field] = value;
        this.validationPaymentForm();
    }

    validationPaymentForm() {
        const errors: typeof this.formErrors = {};

		if (!this.address) {
			errors.address = 'Введите адрес';
		}

        if(!this.payment) {
            errors.payment = 'Выберите способ оплаты';
         }
        
         this.events.emit('formErrors:change', this.formErrors);
         return Object.keys(errors).length === 0;
    }

    setContactsForm(field: keyof TUserContacts, value: string) {
        this[field] = value;
        this.validationContactsForm();
    }

    validationContactsForm() {
        const errors: typeof this.formErrors = {};
        if (!this.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
    
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }

    clearUserData() {
        this.payment = '',
        this.email = '',
        this.address = '',
        this.phone = ''
    } 

    getErrors(): FormErrors {
        return this.formErrors
    }

    }



    
   


    

    
    



