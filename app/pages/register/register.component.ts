import {Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../shared/user/user";

@Component({
  selector: 'my-app',
  templateUrl: "pages/register/register.html"
})
export class RegisterComponent{

  user:User;
  @ViewChild("email") email:ElementRef;
  @ViewChild("password") password: ElementRef;

  constructor(private _roter:Router) {
     this.user = new User();  
  }

  clear(){
    this.user.email="";
    this.user.password="";
  }
 
  login(){
      this._roter.navigate(["/"]);
  }

  register(){
     console.log(JSON.stringify(this.user));
  }
}