import { Request, Response } from "express";
import { UsersRepository } from "./../typeorm/repositories/UsersRepository";
import { v4 as uuid } from "uuid";

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

        const createUserRepository = new UsersRepository();

        const user = createUserRepository.create({name, email, cpf, birthDate});

        
        response.status(201).json(user);
    }


    public async search(request: Request, response: Response){
        const { user } = request;

            return response.status(200).json(user);
        
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
    
    public async order(request: Request,response: Response){
        const { order } = request.headers;
        
        if(order === "desc"){
            users.sort(function (a, b) {
                var nameA = a.name.toUpperCase();
                var nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                    return 1;
                }
                if (nameA > nameB) {
                    return -1;
                }
                return 0;
                });
        }else{
            for(var i = 0; i < users.length; i++) {
                for(var j=0; j < users.length; j++) {
                    if(users[i].name.toUpperCase() < users[j].name.toUpperCase()) {
                        var temp = users[i].name;
                        users[i].name = users[j].name;
                        users[j].name = temp;
                    }
                }
            }
        }

            return response.status(200).json(users);
        
    }

    public async regAdd(request: Request, response: Response){

        const {cpf} = request.headers;

        if (cpf) {
            const findUser = users.find((user: any) => {
                return user.cpf === cpf
            });
            if (!findUser) {
                return response.status(404).json({ message:"Usuario não existe"});
            }
                const {street,number,district,state,city} = request.body;
                    findUser.address = {street, number, district, state, city};
                    return response.status(200).json(findUser);
            }
            

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

