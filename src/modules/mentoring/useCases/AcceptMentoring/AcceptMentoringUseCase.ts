import { IMentoringRepository } from '@modules/mentoring/repositories/IMentoringRepository'
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider'
import { inject, injectable} from 'tsyringe'

@injectable()
class AcceptMentoringUseCase {
    constructor(
        @inject("MentoringRepository")
        private mentoringRepository: IMentoringRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ){}

    async execute(mentoring_id: string): Promise<void>{
        const mentoring = await this.mentoringRepository.findMentoringById(
            mentoring_id
        )
        mentoring.accepted = true

        await this.mentoringRepository.create(mentoring)
    }
}

export { AcceptMentoringUseCase }