import { User } from "../entities/User"
import fs from "fs"

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
        
        fs.writeFile("db.json", JSON.stringify(this.users), function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        });

        return user;
    
    }

    search(cpf: string): User | undefined {

        let users: User[] = [];
        const data = fs.readFileSync('db.json',
            { encoding: 'utf8', flag: 'r' });


        users = JSON.parse(data);

        return users.find((user: any) => {
            return user.cpf === cpf
        });
    }
}


export { UsersRepository };