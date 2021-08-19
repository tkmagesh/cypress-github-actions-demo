import { Injectable } from '@angular/core';
import { TimeService } from './time.service';

@Injectable({
    providedIn: 'root'
})
export class Greeter{

    constructor(){

    }
    greet(userName : string) : string {
        return `Hi ${userName}, Have a good day!`
    }
}