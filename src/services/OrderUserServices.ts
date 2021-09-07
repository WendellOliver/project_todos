import { User } from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";

const usersRepository = new UsersRepository();
class OrderUserService{

    public execute(organize:string): User[] {

        const users = usersRepository.findAll();

        var usersAux: any[] = [];

    if(organize === "desc"){
        usersAux = users.sort(function (a, b) {
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

        return users;

    }
}



    export default OrderUserService;