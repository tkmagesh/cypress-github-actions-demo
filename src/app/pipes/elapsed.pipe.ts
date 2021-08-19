import { Inject, Pipe, PipeTransform } from '@angular/core';
//import * as moment from 'moment';

@Pipe({
    name : 'elapsed'
})
export class ElapsedPipe implements PipeTransform {
    constructor (@Inject('MOMENT') private m: any) {

    }
    transform(value: Date | string): string {
        return this.m(value).fromNow();
    }
}

//Getting the pipe instance from testbed
//TestBed.get(ElapsedPipe)