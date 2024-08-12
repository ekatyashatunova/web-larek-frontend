import './scss/styles.scss';
import {EventEmitter} from '../src/components/base/events';
import {UserData} from './components/base/UserData';
import {IEvents} from './components/base/events';

const events: IEvents = new EventEmitter();
const userData = new UserData(events);