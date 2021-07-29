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

const users: iusers[] = [];

export default class UsersController{
    public async create( request: Request, response: Response){
        const {name, email, cpf, birthDate} = request.body;

        const userFindall = users.find((user: any)=>{
            return user.name===name,
            user.email===email, 
            user.cpf===cpf,
            user.birthDate===birthDate
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
            birthDate,
            
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
        const data = new Date();
        const sdia = String(data.getDate()).padStart(2, '0');
        const smes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const dia = parseInt(sdia);
        const mes = parseInt(smes);
        const dataAtual = dia + '/' + mes + '/' + ano;
        const usersAux : iusers[] = [] 

        users.forEach(user => {
            const userDate = user.birthDate.toString();
            const Dia = userDate.substring(8,10);
            const Mes = userDate.substring(5,7);
            const Ano = userDate.substring(0,4);
            const userDia = parseInt(Dia);
            const userMes = parseInt(Mes);
            const userAno = parseInt(Ano);
            var qano = ano - userAno;
            
                if( mes < userMes|| mes == userMes && dia < userDia){
                    qano--;
                }
                
                if(qano >= 18 ){
                    usersAux.push(user); 
                }
                
        });

        return response.status(200).json(usersAux);

    }
    
}



