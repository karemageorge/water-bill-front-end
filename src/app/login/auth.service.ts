import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { catchError, tap } from "rxjs/Operators";
import { environment } from "src/environments/environment";
// import { User } from "./user.model";


export interface AuthResponseData {
    email : string;
    password: string;
    name?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    // user = new Subject<User>()

    constructor(private http : HttpClient){}

    signup(name: string, email: string, password: string){
        return this.http.post<AuthResponseData>(environment.base_url+'/j_spring_security_check',{
            name: name,
            email: email,
            password: password
        })
    }

    login(email: string, password: string){


        return this.http.post<AuthResponseData>(environment.base_url+'/j_spring_security_check',{
            j_username: email,
            j_password: password,
            requestTransportType: "json",
        },{
            headers : new HttpHeaders({
                'content-type': 'application/x-www-form-urlencoded'
            })
        } )
        // $.ajax({
        //     type: "POST",
        //     url: environment.base_url+'/j_spring_security_check',
        //     params: {
        //         j_username: 'jspName',
        //         j_password: 'SMART_GATE_ID'
        //     },
        //     success: function(data)
        //     {
        //       return data; // show response from the php script.
        //     }
        // });


        
    }
    // login(email: string, password: string){
    //     return this.http.post<AuthResponseData>(environment.base_url+'/j_spring_security_check','?j_username=SPA&j_password=d1v1nemercy&requestTransportType=json')
    // }

    // private handleAuthentication(email : string,id: string,token : string){
    //     const user = new User(email, id, token)
    //     this.user.next(user)  

    // }

    getToken(){
        return localStorage.getItem('userdata')
    }
} 