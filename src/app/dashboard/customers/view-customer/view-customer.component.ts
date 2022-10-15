
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
    
  }
  
  doAction(action : string){
    console.log(action)
  }
  printBill(){

  }
  sendBill(){
    //188.166.29.198:8080/DEMO/myReports/sendOneSMSBill.action?accountId=44450&accountName=MARK%20KK&cAccNumber=210150038&periodId=68&cEmailAcc=
    //188.166.29.198:8080/DEMO/myReports/sendEmailBill.action?accountId=44450&accountName=MARK%20KK&cAccNumber=210150038&periodId=68&cEmailAcc=
  }
  printStatement(){
    
  }
  emailStatement(){
    //188.166.29.198:8080/DEMO/myReports/sendEmailStatement.action?accountId=9&accountName=DOMINIC%20CHEGE%20GACHEHA&cAccNumber=11110010&cEmailAcc=no_email%40gmail.com
  }

}
