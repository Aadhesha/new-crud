import { InMemoryDbService } from "angular-in-memory-web-api";
import { User } from "../user-data"

export class UserData implements InMemoryDbService {
    createDb() {
        const users: User[] = [
            { id: 1, name: 'Ammu', email: 'ammu@gmail.com', age: '14', country: 'Canada', state:'Columbo', city:'zen', zipcode: '639850' },
            { id: 2, name:'Aishu', email:'aishu@yahoo.com', age: '26', country: 'Zootopia', state: 'Kneday', city: 'Barbie', zipcode: '786870' },
            { id: 3, name:'Ramu', email:'ramu@outlook.com', age: '23', country: 'Mexico', state: 'Ludo', city: 'Oreal', zipcode: '567667' },
            { id: 4, name:'Somu', email:'somu@gmail.com', age: '32', country: 'Luxumberg', state: 'Ambli', city: 'Favino', zipcode: '876587' },

        ];
        return {users};
    }
}