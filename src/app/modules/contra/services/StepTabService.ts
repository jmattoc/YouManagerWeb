import { Injectable } from '@angular/core';

@Injectable()
export class StepTabService {

    StepTab : number = 0;
   
    constructor() {
    }
    NextTab(tab:number) {
        this.StepTab =tab ;       
    }
    
}