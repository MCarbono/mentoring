import { IDateProvider } from "../IDateProvider";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc);


class DayjsDateProvider implements IDateProvider {
    
    dateNow(): Date {
        return dayjs().toDate()
    }

    compareIfBefore(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isBefore(end_date);
    }

    convertToUTC(date: Date): Date {
        return dayjs(date).utc().local().format()
    }
    
    compareInMinutes(start_date: Date, end_date: Date): number {
        const start_date_utc = this.convertToUTC(start_date)
        const end_date_utc = this.convertToUTC(end_date)

        return dayjs(start_date_utc).diff(end_date_utc, "minute")
    }

    limitToAcceptMentoring(start_date: Date, hours: number): Date {
        const star_date_utc = this.convertToUTC(start_date)
        const limitDate = dayjs(star_date_utc).subtract(hours, 'hours').toDate()
        return limitDate
    }
}

export { DayjsDateProvider }