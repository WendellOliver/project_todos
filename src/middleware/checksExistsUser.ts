import { Request, Response, NextFunction } from "express";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";

export default function checksExistsUser(
    request: Request, response: Response, next: NextFunction):void{
        const { cpf } = request.headers;

        try {

            const findUsersRepository = new UsersRepository();

            if (!cpf){
                throw new Error("unfilled cpf");
            }

            const user = findUsersRepository.search(String(cpf));

            if (!user){
                throw new Error("User not found");
            }

            request.user = {
                user
            }


        return next();
        } catch {
            throw new Error ("Bad request");
        }

}