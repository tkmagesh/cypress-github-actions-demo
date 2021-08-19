import { TestBed } from '@angular/core/testing'
import { Greeter } from './greeter.service'
import { TimeService } from './time.service'

/* 
export class FakeTimeServiceForMorning {
    getCurrent(){
        return new Date(2021, 7, 16, 9, 0,0)
    }
}

export class FakeTimeServiceForAfternoon {
    getCurrent(){
        return new Date(2021, 7, 16, 15, 0,0)
    }
} */

/* class FakeTimeService{
    constructor(private fakeDate : Date){
    }

    getCurrent() : Date{
        return this.fakeDate;
    }
} */

xdescribe("The Greeter", () => {
    it("Should gree the user with 'good morning' when greeted before noon", () => {
        //arrange
        //const fakeTimeService = new FakeTimeServiceForMorning()
        //const fakeTimeService = new FakeTimeService(new Date(2021, 7, 16, 9, 0,0))
        const dateWithMorningTime = new Date(2021, 7, 16, 9, 0,0)
        //const fakeTimeService = jasmine.createSpyObj("fakeTimeService", { getCurrent : dateWithMorningTime})
        
        const fakeGetCurrent = jasmine.createSpy("getCurrent")
        fakeGetCurrent.and.returnValue(dateWithMorningTime)
        const fakeTimeService = { getCurrent : fakeGetCurrent }
        
        const greeter = new Greeter(fakeTimeService)
        const userName = 'Magesh'
        const expectedResult = 'Hi Magesh, Have a good morning!'
        //act

        const actualResult = greeter.greet(userName)

        //assert
        expect(actualResult).toBe(expectedResult)
    })

    it("Should gree the user with 'good day' when greeted after noon", () => {
        //arrange
        //const fakeTimeService = new FakeTimeServiceForAfternoon()
        //const fakeTimeService = new FakeTimeService(new Date(2021, 7, 16, 15, 0,0))
        const fakeTimeService = jasmine.createSpyObj("fakeTimeService", { getCurrent : new Date(2021, 7, 16, 15, 0,0)})
        const greeter = new Greeter(fakeTimeService)
        const userName = 'Magesh'
        const expectedResult = 'Hi Magesh, Have a good day!'
        //act

        const actualResult = greeter.greet(userName)

        //assert
        expect(actualResult).toBe(expectedResult)
    })
})

xdescribe("The New Greeter", () => {
    let fakeTimeService : any;
    
    beforeEach(() => {
        fakeTimeService = jasmine.createSpyObj("TimeService", ['getCurrent'])
        TestBed.configureTestingModule({
            providers: [
                Greeter,
                {provide : TimeService, useValue : fakeTimeService}
            ]
        });
    });

    it("Should greet the user with 'good morning' when greeted before noon", () => {
        //arrange
        //const fakeTimeService : any = TestBed.inject(TimeService)
        const dateWithMorningTime = new Date(2021, 7, 16, 9, 0,0)    
        fakeTimeService.getCurrent.and.returnValue(dateWithMorningTime)
        

        const greeter = TestBed.inject(Greeter)
        const userName = 'Magesh'
        const expectedResult = 'Hi Magesh, Have a good morning!'
        //act

        const actualResult = greeter.greet(userName)

        //assert
        expect(actualResult).toBe(expectedResult)
    })

    it("Should greet the user with 'good day' when greeted after noon", () => {
        //arrange
        const fakeTimeService : any = TestBed.inject(TimeService)
        const dateWithAfternoonTime = new Date(2021, 7, 16, 15, 0,0)    
        fakeTimeService.getCurrent.and.returnValue(dateWithAfternoonTime)
        

        const greeter = TestBed.inject(Greeter)
        const userName = 'Magesh'
        const expectedResult = 'Hi Magesh, Have a good day!'
        //act

        const actualResult = greeter.greet(userName)

        //assert
        expect(actualResult).toBe(expectedResult)
    })

})