import { User } from '../typeorm/entities/User';
import { UsersRepository } from "../typeorm/repositories/UsersRepository";


interface IUser {
    user: User,
    street: string,
    number: number,
    district: string,
    city: string,
    state: string,
}

class RegAddrUsersServices {

    public execute({ user, street, number, district, city, state }: IUser): User {

        const usersRepository = new UsersRepository();

        const regAdd = usersRepository.addrupdate({ user, street, number, district, city, state });
        
        return regAdd;
    }
}

export default RegAddrUsersServices;