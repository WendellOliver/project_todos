import { User } from '../typeorm/entities/User';
import { UsersRepository } from "../typeorm/repositories/UsersRepository";

interface iusersTodo {
    user:User
    idtodos?: string,
    title: string,
    deadline: string,
    done: boolean,
    created_at?: any,
}

class RegTodosService {

    execute({ user, title, deadline, done }:iusersTodo):User {

        const usersRepository = new UsersRepository()

        const regAddr = usersRepository.todoupdate({ user, title, deadline, done });

        return user
        
    }
    
}

export default RegTodosService