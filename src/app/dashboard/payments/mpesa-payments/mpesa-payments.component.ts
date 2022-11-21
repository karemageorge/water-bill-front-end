import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mpesa-payments',
  templateUrl: './mpesa-payments.component.html',
  styleUrls: ['./mpesa-payments.component.css']
})
export class MpesaPaymentsComponent implements OnInit {

  file : any
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getfile(event : any){
    this.file = event.target.files[0]
    console.log('file ---', this.file)

  }
  submitfile(){
    let formData = new FormData()
    formData.set("file", this.file)

    console.log(formData)
    this.http.post(environment.base_url+'/payment/uploadMpesaPaymentAltNEW.action', formData).subscribe(
        (resData: any) => {
          console.log(resData);
          
        } 
        // (error: any) => {
        //     console.log(error)
        //     this.error = "Unable to Login please try again"
        //     this.isLoading = false
        // }
        )
  }

}
