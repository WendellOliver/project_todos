import { Request, Response } from "express";
import { v4 as uuid } from "uuid";

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
    todos?:{
        id: string,
        title: string,
        deadline: string,
        done: boolean,
        created_at: Date,
    }
}

const users = <any>[];

export default class UsersController{
    public async create( request: Request, response: Response){
        const {name, email, cpf, birthdate} = request.body;

        const userFindall = users.find((user: any)=>{
            return user.name===name,
            user.email===email, 
            user.cpf===cpf,
            user.birthdate===birthdate
        });

        if(userFindall){
            return response.status(200).json(userFindall);
        }

        const userFinded = users.find((user: any)=>{
            return user.cpf===cpf
           });

           if(userFinded){
            return response.status(200).json(userFinded);
           }

        const user = {
            id: uuid(),
            name,
            email,
            cpf,
            birthdate,
            address: {},
            todos: []
        }

        users.push(user);
        response.status(201).json(users);
    }


    public async search(request: Request, response: Response){
        const {cpf} = request.headers;

        if(cpf){
            const user = users.find((user: any)=>{
                return user.cpf===cpf
               });
       
                return response.status(200).json(user);
        }

            return response.status(200).json(users);
        
    }

    public async find(request: Request,response: Response){
        var data = new Date();
        
        var data = new Date();
        var dia = String(data.getDate()).padStart(2, '0');
        var mes = String(data.getMonth() + 1).padStart(2, '0');
        var ano = data.getFullYear();
        var dataAtual = dia + '/' + mes + '/' + ano;
            
        return response.status(200).json(dataAtual);
        
    }
    
}



