import {Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import {Router} from "@angular/router";
import {FirebaseService} from "../../shared/firebase/firebase.service";
import {User} from "../../shared/user/user";

@Component({
  selector: 'my-app',
  templateUrl: "pages/register/register.html"
})
export class RegisterComponent{

  user:User;
  @ViewChild("email") email:ElementRef;
  @ViewChild("password") password: ElementRef;

  constructor(private _router:Router, private _firebase:FirebaseService) {
     this.user = new User();  
  }

  clear(){
    this.user.email="";
    this.user.password="";
    this.user.displayName ="";
  }
 
  login(){
      this._router.navigate(["/"]);
  }

  register(){
     this._firebase.register(this.user).then((success)=>{
          this.clear();
          alert("Yay!! you can login now.");
        }
        ,(error)=> {
          alert(error);
        });
  }
}