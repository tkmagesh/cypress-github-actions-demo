import { Injectable } from "@angular/core";
import { Logger } from "./logger";

@Injectable({
    providedIn: "root"
})
export class Calculator{

    constructor (private logger : Logger) {
    }
    
    add(n1 : number, n2 : number) : number {
        const result = n1 + n2;
        this.logger.log(`Adding ${n1} and ${n2} and returning ${result}`)
        return result;
    }

    subtract(n1 : number, n2 : number) : number {
        const result = n1 - n2
        this.logger.log(`Subtract ${n1} and ${n2} and returning ${result}`)
        return result;
    }
}