import { TestBed } from '@angular/core/testing';

import { Calculator } from './calculator'
import { Logger } from './logger'


xdescribe("A Calculator", () => {


    beforeEach(() => {
        const fakeLogger = jasmine.createSpyObj('logger' , ['log']);
        TestBed.configureTestingModule({
            providers :[
                Calculator,
                { provide : Logger, useValue : fakeLogger }
            ]
        })
    })

    it("Should be able to add two numbers", () => {
        //Arrange
            //sut
            const calc = TestBed.inject(Calculator);

            //inputs
            const n1 : number = 100,
                n2 : number = 200;

            //expected result
            const expectedResult : number = 300;

        //Act
            //actual operation
            const actualResult = calc.add(n1, n2);


        //Assert
            //verify the outcome of the operation
            expect(actualResult).toBe(expectedResult);
       
    });

    it("Should log the message when 2 numbers are added", () => {
        //Arrange
            //sut
            const calc = TestBed.inject(Calculator);
            const fakeLogger = TestBed.inject(Logger);
            
            //inputs
            const n1 : number = 100,
                n2 : number = 200;

            //expected result
            const expectedResult : number = 300;
            const expectedLogMessage = `Adding 100 and 200 and returning 300`
        //Act
            //actual operation
            const actualResult = calc.add(n1, n2);


        //Assert
            //verify the interaction to the logger
            expect(fakeLogger.log).toHaveBeenCalledWith(expectedLogMessage);
       
    });
});