import { IDateProvider } from "../IDateProvider";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }
    compareInMinutes(start_date: Date, end_date: Date): number {
        const start_date_utc = this.convertToUTC(start_date)
        const end_date_utc = this.convertToUTC(end_date)

        return dayjs(end_date_utc).diff(start_date_utc, 'minutes');
    }
    limitToAcceptMentoring(start_date: Date, hours: number): Date {
       return dayjs(start_date).subtract(hours, 'hours').toDate();
    }
    addDays(days: number): Date {
        return dayjs().add(days, 'days').toDate();
    }
    addHours(hours: number): Date {
        return dayjs().add(hours, 'hours').toDate()
    }
    convertTimestampToDate(date: Date): string {
        return dayjs(date).format('DD/MM/YYYY')
    }
    convertTimestampToHoursMinutes(date: Date): string {
        return dayjs(date).format('HH:mm');
    }
    dateNow(): Date {
        return dayjs().toDate()
    }
    compareIfBefore(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isBefore(end_date);
    }
}

export { DayjsDateProvider }