import { User } from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";


interface Request{
    id: string,
    name: string,
    email: string,
    cpf: string,
    birthDate: Date,
    address?: {
        street: string,
        number: number,
        district: string,
        state: string,
        city: string,
    },
    todos:Request[]
}

const usersRepository = new UsersRepository();
class CreateUserService{
    public execute({name, email, cpf, birthDate}: Request): User {

        const user = usersRepository.create({name, email, cpf, birthDate});

        return user;
    }

}

export default CreateUserService;