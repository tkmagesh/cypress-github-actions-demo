export class TimeService implements ITimeService {
    getCurrent() : Date {
        return new Date()
    }
}

export interface ITimeService{
    getCurrent(): Date;
}