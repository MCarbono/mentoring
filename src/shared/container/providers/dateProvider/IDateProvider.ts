

interface IDateProvider {
    dateNow(): Date
    compareIfBefore(start_date: Date, end_date: Date): boolean;
    convertToUTC(date: Date): Date;
    compareInMinutes(start_date: Date, end_date: Date): number;
    limitToAcceptMentoring(start_date: Date, hours: number): Date;
    addDays(days: number): Date;
    addHours(hours: number): Date;
}

export { IDateProvider }