import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import CreateUserService from "../services/CreateUsersServices";
import AgeFindUsersService from  "../services/AgeFindUserServices";
import OrderUserService from "../services/OrderUserServices";
import RegAddrUsersServices from "../services/RegAddrUsersServices";

interface itodo{
    id: string,
    title: string,
    deadline: string,
    done: boolean,
    created_at: Date,
}

interface iusers{
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
    todos:itodo[]
}

const users: iusers[] = [];

export default class UsersController{

    public async create( request: Request, response: Response){

        const {name, email, cpf, birthDate} = request.body;

        const createUsersService = new CreateUserService();

        const user = createUsersService.execute({name, email, cpf, birthDate});   
        
        response.status(201).json(user);
    }

    public async search(request: Request, response: Response){
        const { user } = request;

        if (!user) {
            throw new Error('User not found!');
        }

        return response.status(200).json(user);
        
    }

    public async find(request: Request,response: Response){

        const ageFindUsersService = new AgeFindUsersService();
        const mage = ageFindUsersService.execute();

        return response.status(200).json(mage);

    }
    
    public async order(request: Request,response: Response){
        const { order } = request.headers;
        
        const orderUserService = new OrderUserService();
        const user = orderUserService.execute(String(order));

            return response.status(200).json(user);
        
    }

    public async regAdd(request: Request, response: Response){

        const { user } = request.user;

        const { street, number, district, city, state } = request.body;

        const RegAddrUsersService = new RegAddrUsersServices()

        const userAux = RegAddrUsersService.execute({ user, street, number, district, city, state });

        return response.status(200).json(userAux)

            

        }

    public async todo(request: Request, response: Response){

        const {cpf} = request.headers;

        if (cpf){

            const user = users.find((user:any)=>{
                return user.cpf===cpf
            });

            if (!user){
                return response.status(404).json({message:"Usuario não existe"});
            }

            const {title, deadline} = request.body

            const todo = {
                id: uuid(),
                title,
                deadline,
                done:false,
                created_at:new Date()
            }

            user.todos.push(todo);
            response.status(201).json(user);
        }

        return response.status(404).json({message:"Erro"})
    }
}

