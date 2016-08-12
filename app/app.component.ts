import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from '@angular/router';
import {NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS} from "nativescript-angular/router";
import {FirebaseService} from "./shared/firebase/firebase.service";

@Component({
    selector: "my-app",
    directives: [NS_ROUTER_DIRECTIVES],
    template: "<page-router-outlet></page-router-outlet>",
    providers:[FirebaseService]
})
export class AppComponent implements OnInit {
    
    constructor(private _firebase:FirebaseService) {

    }

    ngOnInit(){
        this._firebase
            .init({})
            .then((success)=> {
                    console.log(JSON.stringify(success));
            },(error)=>{
                console.log(error);    
            });
    }
    
}
