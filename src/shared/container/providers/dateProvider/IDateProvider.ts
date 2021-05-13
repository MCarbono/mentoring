

interface IDateProvider {
    dateNow(): Date
    compareIfBefore(start_date: Date, end_date: Date): boolean;
    convertToUTC(date: Date): string;
    compareInMinutes(start_date: Date, end_date: Date): number;
    limitToAcceptMentoring(start_date: Date, hours: number): Date;
    addDays(days: number): Date;
    addHours(hours: number): Date;
    convertTimestampToDate(date: Date): string;
    convertTimestampToHoursMinutes(date: Date): string;
}

export { IDateProvider }