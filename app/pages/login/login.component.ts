import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FirebaseService} from "../../shared/firebase/firebase.service";
import {User} from "../../shared/user/user";


@Component({
  selector: 'my-app',
  templateUrl: "pages/login/login.html"
})
export class  LoginComponent implements OnInit{

  user: User;
  constructor(private _router:Router, private _firebase:FirebaseService) {
     this.user = new User();
  }

  ngOnInit(){
    this.user.email="nagaraja.s@neudesic.com";
    this.user.password="include";
  }

  clear(){
    this.user.email="";
    this.user.password="";
  }

  login(){
    this._firebase.login(this.user).then((success) =>{
      this._router.navigate(["/terminal",{ clearHistory: true }]);
    }, (erro)=>{
      alert(erro);
    });
  }

  register(){
     this._router.navigate(["/register"])
  }

}