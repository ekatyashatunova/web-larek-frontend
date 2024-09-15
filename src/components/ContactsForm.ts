import { IEvents } from './base/events';
import {TUserContacts} from '../types';
import { Component } from './base/Component';

//Класс представления форма с контактами (телефон, эл.почта)
export class ContactsForm extends Component<TUserContacts> {
    protected _email: HTMLElement;
    protected _phone: HTMLElement;
    protected events: IEvents

}