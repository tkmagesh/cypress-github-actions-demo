import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing'
import { BugApi } from './bugApi.service'
import mockData from './mock-data'
import { Bug } from '../models/bug'

xdescribe("Bug API service", () => {
    let bugApi : BugApi;
    let httpTestingController : HttpTestingController;

    beforeEach( () => {
        TestBed.configureTestingModule({
            providers: [BugApi], 
            imports : [
                HttpClientTestingModule
            ]
        })
        bugApi = TestBed.inject(BugApi)
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });


    it("should be able to created an instance", () => {
        expect(bugApi).toBeTruthy('failed to create an instance of the service')
    });

    it("should be able to get all the bugs", () => {
        const expectedResult : Bug[] = mockData.bugs.filter(bug => !bug.isClosed)
        bugApi
            .getAll()
            .subscribe(bugs => {
               /*  expect(bugs).toBeTruthy('failed to get all bugs')
                expect(bugs.length).toEqual(2, 'failed to get all bugs')
                const bug = bugs.find(bug => bug.id === 2)
                expect(bug).toBeDefined('failed to get bug 2') */
                //expect(bug.name).toEqual('Data integrity checks failed', 'failed to get bug 1')
                expect(bugs).toEqual(expectedResult, 'failed to get all bugs')
            });

        const req = httpTestingController.expectOne('http://localhost:3000/bugs');
        expect(req.request.method).toEqual('GET');
        
        req.flush(mockData.bugs);

        
    });

    it("should be able to save a new bug", () => {
        const newBugData : Bug = {
            id : 0,
            name : 'Test bug',
            isClosed : false,
            createdAt : new Date()
        }

        bugApi
            .save(newBugData)
            .subscribe(newBug => {
                expect(newBug).toBeTruthy('failed to save new bug')
                expect(newBug.id).toBe(1, 'failed to save new bug')
            });

        const req = httpTestingController.expectOne('http://localhost:3000/bugs');
        expect(req.request.method).toBe('POST')
        //expect(req.request.body).toEqual(newBugData)
        req.flush({ ...newBugData, id : 1 });

       
    })

    it("should be able to save an existing bug", () => {
        const existingBugData : Bug = {
            id : 1,
            name : 'Test bug',
            isClosed : false,
            createdAt : new Date()
        }

        bugApi
            .save(existingBugData)
            .subscribe(updatedBug => {
                expect(updatedBug).toBeTruthy('failed to save new bug')
                expect(updatedBug.id).toBe(1, 'failed to save new bug')
            });

        const req = httpTestingController.expectOne('http://localhost:3000/bugs/1');
        expect(req.request.method).toBe('PUT')
        //expect(req.request.body).toEqual(newBugData)
        req.flush({...existingBugData});
        
       
    });

    it("should throw an error when deleting a bug that doesn't exist", () => {
        const bugToRemove : Bug = {
            id : 300,
            name : 'Dummy Bug',
            isClosed : false,
            createdAt : new Date()
        };

        bugApi
            .remove(bugToRemove)
            .subscribe(() => {
                fail("There should not have been a bug to remove")
            }, err => {
                expect(err).toBeTruthy('failed to throw an error when deleting a bug that doesn\'t exist')
                expect(err.error.type).toBe('Bug does not exist')
            });

        const req = httpTestingController.expectOne('http://localhost:3000/bugs/300');
        expect(req.request.method).toBe('DELETE');
        req.error(new ErrorEvent("Bug does not exist"))
        
    })
})