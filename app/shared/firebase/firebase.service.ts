import { Injectable } from '@angular/core';
import firebase = require("nativescript-plugin-firebase");
import {User} from '../../shared/user/user';
import {AppConfig} from '../../shared/app.config';
import {BaseService} from "../../shared/base.service";

@Injectable()
export class FirebaseService extends BaseService{

    constructor() {
        super();      
    }
    
    init(initOptions:firebase.InitOptions){
        return new Promise((resolve, reject) => {
            firebase
                .init(initOptions)
                .catch(this._handleError);
        });
    }

     login(user:User){
        return new Promise((resolve, reject) => {
            firebase
                .login({
                    type:firebase.LoginType.PASSWORD,
                    email: user.email,
                    password: user.password
                }).then((done)=>{
                    this._persistUserInfo(user.email);  
                    resolve(done);  
                }, this._handleError);    
        });
    }

    register(user:User){
        return new Promise((resolve, reject) => {
            firebase
                .createUser({
                    email: user.email,
                    password: user.password
                })
                .then((success)=> {
                    this._createUser(user)
                    .then(
                        (done)=> resolve(done)
                        ,(error)=> reject(error))    
                }
                ,this._handleError);
        });
    }

    private _createUser(user:User){
        return new Promise((resolve,reject) =>{
             firebase.push("/users",
             {
                 "displayName": user.displayName,
                 "email":user.email
             }).catch(this._handleError);  
        });
    }

    private _persistUserInfo(email:string){
        var path = "/users";
        var that = this;
        var onRecieveEvent = function(result) {
            // note that the query returns 1 match at a time,
            // in the order specified in the query
            console.log("Query result: " + JSON.stringify(result));
            if (result.error) {
                return that._handleError(result.error);
            } else {
                console.log(JSON.stringify(result.value));
                AppConfig.user = new User();
                AppConfig.user.displayName = result.value.displayName;
                AppConfig.user.email = result.value.email;
            }
        };
        firebase.query(
            onRecieveEvent,
            path,
            {
                // order by user.email
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: 'email'
                },
                // filter by email
                // (this range relates to the orderBy clause)
                range: {
                    type: firebase.QueryRangeType.EQUAL_TO,
                    value: email
                },
                // only the first  matches
                limit: {
                    type: firebase.QueryLimitType.FIRST,
                    value: 1
                }
            }
        ).catch(this._handleError);
    }   
}