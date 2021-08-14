import { User } from "../entities/User"

interface itodoDTO {
    id: string,
    title: string,
    deadline: string,
    done: boolean,
    created_at: Date,
}

interface iusersDTO {
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
    todos?: itodoDTO[]
}

class UsersRepository {
    private users: User[];
    constructor() {
        this.users = [];
    }

    create({ name, email, cpf, birthDate }: iusersDTO): User {

        const user = new User()

        Object.assign(user, {
            name,
            email,
            cpf,
            birthDate,
            todos: []
        });

        this.users.push(user);
        return user;
    }

    search(cpf: string): User | undefined {

        return this.users.find((user: any) => {
            return user.cpf === cpf
        });
    }
}

export { UsersRepository };