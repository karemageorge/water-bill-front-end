
import { ActivatedRoute } from '@angular/router';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgModel } from '@angular/forms';

interface userDetail {
  customerName? : string,
  accountName? : string,
  custKraPin? : string,
  customerType? : string,
  scName? : string,
  cAccId? : string,
  znName? : string,
  rtName? : string,
  customerMobPhone? : string,
  defaultAccNumber? : string,
  accountId? : string,
  cEmailAcc?: string,
  customerId?: string,

}

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  userDetails : userDetail
  id : any
  accountId : any
  periods : any[]= []
  pdid : any
  row: any
  constructor(private router : Router, private route : ActivatedRoute, private dialog : MatDialog, private http: HttpClient ) { 

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    console.log(this.id)
    const extraparams = '&includePendingPaymentAccounts_id=true&includeClosedAccounts_id=true'

    this.http.post(environment.base_url+'/account/fetchCustomersAccounts.action?customerId='+this.id+extraparams, {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
            this.userDetails = resData.data.result[0]
            this.accountId = resData.data.result[0]?.cAccId
            console.log(this.userDetails)
        } 
        )
    
        this.http.post(environment.base_url+'/account/fetchPeriods.action', {} ,{
          headers : new HttpHeaders({
              'content-type': 'application/x-www-form-urlencoded'
          })
      } ).subscribe(
            (resData: any) => {
                console.log(resData.data.result)
                this.periods = resData.data.result
            })

  }
  
  doAction(action : string){
    console.log(action)
  }
  printBill(){
    // /myReports/directReport.action?receiptNo=2154&receiptNo=2154&P_PERIOD=70&reportName=CUSTOMER_WATER_BILL&PDF_FORMAT=inline&P_FORMAT=PDF
    this.http.post(environment.base_url+'/myReports/directReport.action?receiptNo='+this.userDetails.cAccId+'&receiptNo='+this.userDetails.cAccId+'&P_PERIOD='+this.pdid+'&reportName=CUSTOMER_WATER_BILL&PDF_FORMAT=inline&P_FORMAT=PDF', {
      
    } ,{
      responseType:'arraybuffer'
  } ).subscribe(
        (resData: any) => {
          let blob = new Blob([resData], { type: 'application/pdf' });
          console.log("blob object is ------------",blob)
          
          let pdfUrl = window.URL.createObjectURL(blob);

          var PDF_link = document.createElement('a');
          PDF_link.href = pdfUrl;
          //   TO OPEN PDF ON BROWSER IN NEW TAB
          
          window.open(pdfUrl, '_blank');
          //   TO DOWNLOAD PDF TO YOUR COMPUTER
          PDF_link.download = "Bill.pdf";
          PDF_link.click();
          console.log(resData)
        })
  }
  sendBill(){
    //188.166.29.198:8080/DEMO/myReports/sendOneSMSBill.action?accountId=44450&accountName=MARK%20KK&cAccNumber=210150038&periodId=68&cEmailAcc=
    //188.166.29.198:8080/DEMO/myReports/sendEmailBill.action?accountId=44450&accountName=MARK%20KK&cAccNumber=210150038&periodId=68&cEmailAcc=
  //  /myReports/sendOneSMSBill.action?accountId=1562&accountName=AGAPIO%20MWANIKI&cAccNumber=10000&periodId=70&cEmailAcc=no_email%40gmail.com
  this.http.post(environment.base_url+'/myReports/sendOneSMSBill.action?accountId='+this.userDetails.accountId+'&accountName='+this.userDetails.accountName+'&cAccNumber='+this.userDetails.defaultAccNumber+'&periodId='+this.pdid+'&cEmailAcc='+this.userDetails.cEmailAcc, {} ,{
    headers : new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded'
    })
} ).subscribe(
      (resData: any) => {
        console.log(resData)
        alert(resData.messages.message)
        
      })

  }
  printStatement(){
    // /myReports/directReport.action?startDate=01/01/1990&receiptNo=1562&P_PERIOD_START=1&P_PERIOD_END=123&endDate=15/01/2200&P_ACC_NUMBER=10000&reportName=ACCOUNT_STATEMENT&PDF_FORMAT=inline&P_FORMAT=PDF%27
    this.http.post(environment.base_url+'/myReports/directReport.action?startDate=01/01/1990&receiptNo='+this.userDetails.cAccId+'&P_PERIOD_START=1&P_PERIOD_END=123&endDate=15/01/2200&P_ACC_NUMBER='+this.userDetails.defaultAccNumber+'&reportName=ACCOUNT_STATEMENT&PDF_FORMAT=inline&P_FORMAT=PDF%27', {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
          console.log(resData)
          alert(resData.messages.message)
          
        })
  }
  emailStatement(){
    //188.166.29.198:8080/DEMO/myReports/sendEmailStatement.action?accountId=9&accountName=DOMINIC%20CHEGE%20GACHEHA&cAccNumber=11110010&cEmailAcc=no_email%40gmail.com
    this.http.post(environment.base_url+'/myReports/sendEmailStatement.action?accountId='+this.userDetails.accountId+'&accountName='+this.userDetails.accountName+'&cAccNumber='+this.userDetails.defaultAccNumber+'&periodId='+this.pdid+'&cEmailAcc='+this.userDetails.cEmailAcc, {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
          console.log(resData)
          alert(resData.messages.message)
          
        })
  }


  onPeriod(period : any){
    this.pdid = period.viewModel
  }
}
