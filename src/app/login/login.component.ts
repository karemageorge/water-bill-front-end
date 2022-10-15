import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import { AuthService, AuthResponseData } from "./auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  loading = false
  isLoginMode = true

  isLoading = false

  error : string = ""

  constructor(private http: HttpClient, private authservice: AuthService, private router: Router){

  }

  onSwitchMode(){
      this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm ){

    this.isLoading = true
    const email = form.value.email
    const password = form.value.password

    const url = environment.base_url+'/j_spring_security_check?j_username='+email+'&j_password='+password+'&requestTransportType=json'
    console.log(url)

    // this.router.navigate(['/admin'])
        console.log(form.value)
        this.http.post<AuthResponseData>(url, {} ,{
        headers : new HttpHeaders({
            'content-type': 'application/x-www-form-urlencoded'
        })
    } ).subscribe(
            (resData: any) => {
            if (resData.messages.mainMessage == "Please make sure you have entered the correct email and password"){
                this.error = "Please make sure you have entered the correct email and password"
                this.isLoading = false
            }
            else {
                console.log(resData)
                this.isLoading = false
                this.router.navigate(['/admin'])
            }
                
            })
      
      form.reset()
    }

}
