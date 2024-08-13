import './scss/styles.scss';
import {EventEmitter, IEvents} from '../src/components/base/events';
import {UserData} from './components/UserData';
import {BasketData} from './components/BasketData';
import {Catalog} from './components/Catalog';

const events: IEvents = new EventEmitter();
const userData = new UserData(events);
const basketData = new BasketData(events);
const catalog = new Catalog();