import { Mentoring } from "../infra/typeorm/entities/Mentoring"


class ILoadMentoringByMentor {
    listMentoring: Mentoring[]
    pendentsMentoring: object[]
}

export { ILoadMentoringByMentor }