import {Observable} from "data/observable";

export class Container extends Observable {
   
   constructor(public cntrNumber:string
            ,public isJobCompleted:boolean) {         
        
        super();
    }
}