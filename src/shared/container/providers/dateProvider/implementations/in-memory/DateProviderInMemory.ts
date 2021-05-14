import { IDateProvider } from "../../IDateProvider";

class DateProviderInMemory implements IDateProvider {
    dateNow(): Date {
        const date = new Date()
        return new Date();
    }
    compareIfBefore(start_date: Date, end_date: Date): boolean {
       console.log(start_date < end_date)
       return start_date < end_date

    }
    convertToUTC(date: Date): string {
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
    convertTimestampToDate(date: Date): string {
        throw new Error("Method not implemented.");
    }
    convertTimestampToHoursMinutes(date: Date): string {
        throw new Error("Method not implemented.");
    }
}

export { DateProviderInMemory }