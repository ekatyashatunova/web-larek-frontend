import './scss/styles.scss';
import {EventEmitter, IEvents} from '../src/components/base/events';
import {UserData} from './components/UserData';
/*import {BasketData} from './components/BasketData';
import {Catalog} from './components/Catalog';*/

const events: IEvents = new EventEmitter();
const userData = new UserData(events);

const testUserData = {
    "payment": "cash",
    "email": "test@test.ru",
    "phone": "+71234567890",
    "address": "Spb Vosstania 1"
}

userData.setUserData(testUserData);
console.log(userData.getUserData());


/*const basketData = new BasketData(events);
const catalog = new Catalog(events);*/

const testCatalog = 
{
    "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
    "description": "Если планируете решать задачи в тренажёре, берите два.",
    "image": "/5_Dots.svg",
    "title": "+1 час в сутках",
    "category": "софт-скил",
    "price": 750
}


 

