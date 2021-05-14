import { IMentorsAvailabilityRepository } from "@modules/users/repositories/IMentorsAvailabilityRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
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
        @inject("MentorsAvailabilitiesRepository")
        private mentorsAvailabilitiesRepository: IMentorsAvailabilityRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ){}

    async execute({ id, start_date, end_date}: IRequest): Promise<void>{
        const mentoringSession = 30;
        //Verificar se os arrays não possuem horarios/datas repetidas/datas faltantes
        //Estudar esse link = javascript Set
        //https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Set
        //https://pt.stackoverflow.com/questions/118654/como-verificar-elementos-duplicados-em-array
        
        const start_date_filtered = new Set(start_date);
        const end_date_filtered = new Set(end_date);
        
       
        /*if(start_date_filtered.size !== end_date_filtered.size){
            throw new AppError("One or more dates are equal or missing one date register.")
        }*/

        for(let i = 0; i < start_date.length; i++){
            //Verificar se a data inicial é maior que a data que o usuario está cadastrando
            if((this.dateProvider.compareIfBefore(start_date[i], this.dateProvider.dateNow()))){
                throw new AppError("One initial mentoring date is before today")
            }
        
            //Verificar se a data final é maior que a data inicial que o usuario está cadastrando
            if(!(this.dateProvider.compareIfBefore(start_date[i], end_date[i]))){
                throw new AppError("One final mentoring date is before the initial date")
            }
            
            //Verificar se a data inicial tem pelo menos 30 mim de antecedencia da data final
            if(this.dateProvider.compareInMinutes(start_date[i], end_date[i]) > mentoringSession){
                throw new AppError("The mentoring session needs to be at least 30 minutes duration. One of yours mentoring does not have it.")
            }
        }

        for(let i = 0; i < start_date.length; i++){
            await this.mentorsAvailabilitiesRepository.create({
                start_date: start_date[i],
                end_date: end_date[i],
                mentor_id: id
            })
        }

        
    }
}

export { CreateMentorAvailabilitiesUseCase }