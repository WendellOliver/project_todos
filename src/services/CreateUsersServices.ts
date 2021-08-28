import { User } from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";


interface Request{
    name: string,
    email: string,
    cpf: string,
    birthDate: Date,
}

const usersRepository = new UsersRepository();
class CreateUserService{

    public execute({ name, email, birthDate, cpf }: Request): User {

    const user = usersRepository.create({name, email, cpf, birthDate});

    return user;

    };

}

export default CreateUserService;