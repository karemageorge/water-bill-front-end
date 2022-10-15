import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';


import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgForm, NgModel } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.css']
})
export class CreateBillComponent implements OnInit {

  isLinear = false;

  customerId = ""
  next : boolean

  disable = true;
  zonedisable = false
  routesSelected : any
  customername = ""

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  isLoading = false
  error : string
  firstLast : string
  usrID : any
  schemes : any[] = [
    {scName: "mark", scId: 13 }, 
  ]
  zones : any[] = [{znId : 101, znName : "embu"}]
  routedisable = false
  message = ""

  routes : any[]=["mark","george","stphen","kiumbe","mark","george","stphen","kiumbe","mark","george","stphen","kiumbe"]


  now = new Date();


  

  // dtSource? : taskItem[]
  dataSource : any
  // = [
  //   {Invoice: "1", Date: "30/04/2020", DueDate:"30/05/2020", Customer:"george karema nguhu", CreatedBy:"Mumias", Amount:"1000", InvoiceBalance:"3000"},
  // ]
  displayedColumns : string[] = ["Zone","Account_Number","Old_Acc","Account_Name","Account_Balance","Mobile_Number","Scheme","Zone","Route","Account_Status","National_Id","Deposit","Serial_Number"]

  

  
  constructor(private router : Router, private dialog : MatDialog, private http : HttpClient, private _formBuilder: FormBuilder, private datePipe : DatePipe ) { }

  ngOnInit(): void {
    this.http.post(environment.base_url+'/account/fetchCustomersAccounts.action?criteria=&txtSearch=&agingChkbox=&znId=&scId=&includePendingPaymentAccounts_id=true&limit=20', {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
            console.log(resData.data.result)
            this.isLoading = true
            this.dataSource = new MatTableDataSource(resData.data.result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
        )
    

        this.http.post(environment.base_url+'/msg/fetchScheme.action?scId=&query=', {} ,{
          headers : new HttpHeaders({
              'content-type': 'application/x-www-form-urlencoded'
          })
      } ).subscribe(
            (resData: any) => {
                console.log(resData.data.result)
                this.isLoading = true
                this.schemes = resData.data.result
            })
}
//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator
//     this.dataSource.sort = this.sort
// }



  

  onClick(row : any){
    console.log(row.customerId)
    this.customerId = row.customerId
    this.customername = row.customerName

    this.next = true

    }

  onSearch(search : NgModel){
      console.log(search.value)
      const name = search.value
      const url = environment.base_url+'/user/fetchUser.action?criteria=usrFirstName&txtSearch='+name

      console.log(url)

      this.http.post(url, {} ,{
        headers : new HttpHeaders({
            'content-type': 'application/x-www-form-urlencoded'
        })
    } ).subscribe(
          (resData: any) => {
              console.log(resData.data.result)
              this.isLoading = true
              this.dataSource = new MatTableDataSource(resData.data.result);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
          } )
    search.reset()
    }


onSubmit(form : NgForm){

  console.log(form.value)
  const date = this.datePipe.transform(form.value.date, 'dd/MM/yyyy'); 
  

  
  console.log("date is -----------",date)

  const url = environment.base_url+`/account/saveInvoice.action?invId_id=&invCode_id=&invAccId_id=`+this.customerId+`&invDate_id=`+date+`&invLpoId_id=&invCreatedDate_id=&invCreatedBy_id=&invUpdateDate_id=&invReviewedBy_id=&invReviewedDate_id=&invUpdatedBy_id=&invPaidAmt_id=&invPaidStatus_id=&invStatus_id=&invRemarks_id=&invoRef=&invCancelledBy_id=&invCancelledDate_id=&invCancelledReason_id=&invCancelledDocAttached_id=&invoContactName_id=&invoMobile_id=&invoNationalId_id=&invoLocation_id=`

  console.log('url is ----------------------------'+url)

  this.http.post(url, {} ,{
    headers : new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded'
    })
} ).subscribe(
      (resData: any) => {
        this.message = resData.messages.message
          
      } )
}


}
