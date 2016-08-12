import {User} from "./user/user";

export class AppConfig{
    private static _user:User;
    
    static get user():User{
        return this._user;
    } 
    static set user(user:User){
         this._user = user;
    }
    
}