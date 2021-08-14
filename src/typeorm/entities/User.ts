import { v4 as uuidV4 } from "uuid";

class User{
    id?: string;
    name?: string;
    email?: string;
    cpf?: string;
    birthDate?: Date;
    address?: {
        street: string,
        number: number,
        district: string,
        state: string,
        city: string,
    }
    todos?:[]
    constructor(){
        if (!this.id){
            this.id = uuidV4();
        }
    }
}

export {User}