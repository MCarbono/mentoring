/*import { IDateProvider } from "../IDateProvider";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
    convertToUTC(date: Date): Date {
        throw new Error("Method not implemented.");
    }
    compareInMinutes(start_date: Date, end_date: Date): number {
        throw new Error("Method not implemented.");
    }
    limitToAcceptMentoring(start_date: Date, hours: number): Date {
        throw new Error("Method not implemented.");
    }
    addDays(days: number): Date {
        throw new Error("Method not implemented.");
    }
    addHours(hours: number): Date {
        throw new Error("Method not implemented.");
    }
    convertTimestampToDate(date: Date): Date {
        throw new Error("Method not implemented.");
    }
    convertTimestampToHoursMinutes(date: Date): Date {
        throw new Error("Method not implemented.");
    }
    
    dateNow(): Date {
        return dayjs().toDate()
    }

    compareIfBefore(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isBefore(end_date);
    }
}

export { DayjsDateProvider }*/