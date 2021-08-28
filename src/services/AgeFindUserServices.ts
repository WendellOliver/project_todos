import { User } from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";

const usersRepository = new UsersRepository();
class AgeFindUsersService {

    public execute(): User[] {

        const users = usersRepository.findAll();

        const data = new Date();
        const sdia = String(data.getDate()).padStart(2, '0');
        const smes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const dia = parseInt(sdia);
        const mes = parseInt(smes);
        const dataAtual = dia + '/' + mes + '/' + ano;
        const usersAux: User[] = []

        users.forEach(user => {
            const userDate = user.birthDate.toString();
            const Dia = userDate.substring(8, 10);
            const Mes = userDate.substring(5, 7);
            const Ano = userDate.substring(0, 4);
            const userDia = parseInt(Dia);
            const userMes = parseInt(Mes);
            const userAno = parseInt(Ano);
            var qano = ano - userAno;

            if (mes < userMes || mes == userMes && dia < userDia) {
                qano--;
            }

            if (qano >= 18) {
                usersAux.push(user);
            }
        });

        return usersAux;

    }

}

export default AgeFindUsersService;