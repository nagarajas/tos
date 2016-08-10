import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../shared/user/user";


@Component({
  selector: 'my-app',
  templateUrl: "pages/login/login.html"
})
export class  LoginComponent implements OnInit{

  user: User;
  constructor(private _roter:Router) {
     this.user = new User();
  }

  ngOnInit(){
    
  }

  clear(){
    this.user.email="";
    this.user.password="";
  }

  login(){
    
  }

  register(){
     
  }

}