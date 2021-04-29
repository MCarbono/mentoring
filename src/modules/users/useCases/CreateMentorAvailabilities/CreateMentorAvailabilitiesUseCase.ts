import { IMentoringAvailabilityRepository } from "@modules/users/repositories/IMentoringAvailabilityRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    id: string;
    start_date: Date[];
    end_date: Date[];
}

@injectable()
class CreateMentorAvailabilitiesUseCase {
    constructor(
        @inject("MentoringAvailabilitiesRepository")
        private mentoringAvailabilitiesRepository: IMentoringAvailabilityRepository
    ){}

    async execute({ id, start_date, end_date}: IRequest): Promise<void>{
        if(start_date.length !== end_date.length)
            throw new AppError("initial and final time does not match. Missing one or more of them");
        
        //Verificar se a data inicial é maior que a data que o usuario está cadastrando
        //Verificar se a data final é maior que a data que o usuario está cadastrando
        //Verificar se a data inicial tem pelo menos 30 mim de antecedencia da data final

        //Verificar se os arrays não possuem horarios/datas repetidas
        //Estudar esse link = javascript Set
        //https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Set
        //https://pt.stackoverflow.com/questions/118654/como-verificar-elementos-duplicados-em-array

        for(let i = 0; i <= start_date.length; i++){

        }
    }
}

export { CreateMentorAvailabilitiesUseCase }