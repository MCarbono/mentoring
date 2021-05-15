import { IDateProvider } from "../../IDateProvider";

class DateProviderInMemory implements IDateProvider {
    convertToUTC(date: Date): string {
        throw new Error("Method not implemented.");
    }
    limitToAcceptMentoring(start_date: Date, hours: number): Date {
        throw new Error("Method not implemented.");
    }
    dateNow(): Date {
        const date = new Date()
        return new Date();
    }
    compareIfBefore(start_date: Date, end_date: Date): boolean {
       return start_date < end_date

    }
    
    compareInMinutes(start_date: Date, end_date: Date): number {
        const minutes_start_date = start_date.getMinutes();
        const minutes_end_date = end_date.getMinutes();
        return minutes_end_date - minutes_start_date;
    }
    addDays(days: number): Date {
        throw new Error("Method not implemented.");
    }
    addHours(hours: number): Date {
        throw new Error("Method not implemented.");
    }
    convertTimestampToDate(date: Date): string {
        throw new Error("Method not implemented.");
    }
    convertTimestampToHoursMinutes(date: Date): string {
        throw new Error("Method not implemented.");
    }
}

export { DateProviderInMemory }