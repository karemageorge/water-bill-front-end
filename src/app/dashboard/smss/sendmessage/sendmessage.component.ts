import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sendmessage',
  templateUrl: './sendmessage.component.html',
  styleUrls: ['./sendmessage.component.css']
})
export class SendmessageComponent implements OnInit {

  isLoading = false
  mess = ""

  constructor(private http : HttpClient, private router : Router) { }

  ngOnInit(): void {
  }

  onSubmit(form : NgForm){

    console.log("form values are: ", form.value)
    const url = environment.base_url+'/msg/savemsgQueue.action?msgId_id=&code_id=&msgUsrId_id=&msgCreatedDate_id=&msgStatus_id=&msgDeliveredDate_id=&msgSubMobileNo_id='+form.value.phonenumber+'&msgmsg_id='+form.value.message

    this.http.post(url, {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
          console.log(resData)
          alert(resData.messages.message)
          this.mess = resData.messages.message
      })
      form.reset()
  }

}
