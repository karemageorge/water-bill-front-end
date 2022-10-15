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
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.css']
})
export class CreatePaymentComponent implements OnInit {

  isLinear = false;

  cAccId = ""
  customerId = ""

  invoice = false

  invoiceamt = ""

  paymodes = ["MPESA","CHEQUE","FAMILYBANK","POSTA","POSTBANK","KCBBANK","EQUITYBANK","EQUITY BANK COLLECTION","EQUITY BANK COLLECTION","COOPERATIVE BANK","CAPITAL-SACCO","DIRECT-CREDIT","CASH","EFT","JAMBO-PAY"]

  disable = true;
  zonedisable = false
  routesSelected : any
  statuss : any[] = ["ACTIVE","PENDING","CANCELLED"]
  rmethods  : any[] = ["ACTUAL","ESTIMATE","AVERAGE"]
  btypes : any[] = ["MONTHLY","FINAL"]
  accStatuss : any[] = ["PENDING-PAYMENT","ACTIVE","DISCONNECTED","TERMINATED","INACTIVE","NEW"]

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
  Last = ""
  defaultAccNumber = ""
  invoId = ""

  routes : any[]=["mark","george","stphen","kiumbe","mark","george","stphen","kiumbe","mark","george","stphen","kiumbe"]


  now = new Date();


  
  invoiceAmount : any
  // dtSource? : taskItem[]
  dataSource : any
  displayColumns : string[] = ["Invoice","Date","DueDate","Customer","CreatedBy","Amount","InvoiceBalance"]
  dtSource : any
  // = [
  //   {Invoice: "1", Date: "30/04/2020", DueDate:"30/05/2020", Customer:"george karema nguhu", CreatedBy:"Mumias", Amount:"1000", InvoiceBalance:"3000"},
  // ]
  displayedColumns : string[] = ["Zone","Account_Number","Old_Acc","Account_Name","Account_Balance","Mobile_Number","Scheme","Zone","Route","Account_Status","National_Id","Deposit","Serial_Number"]

  

  
  constructor(private router : Router, private dialog : MatDialog, private http : HttpClient, private _formBuilder: FormBuilder, private datePipe : DatePipe ) { }

  ngOnInit(): void {
    this.http.post(environment.base_url+'/account/fetchCustomersAccounts.action?criteria=&txtSearch=&agingChkbox=&znId=&scId=&includePendingPaymentAccounts_id=true&limit=100', {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
          if (resData.success == false){
            this.router.navigate(['/login.action'])
          }
          else {
            console.log(resData.data.result)
            this.dataSource = new MatTableDataSource(resData.data.result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        } 
        )
  }
//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator
//     this.dataSource.sort = this.sort
// }

  onScheme(scheme : any){
    
    console.log(scheme.viewModel)

    const scId =  scheme.viewModel

    this.http.post(environment.base_url+'/account/fetchAllZones.action?scId='+scId, {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
            console.log(resData.data.result)
            this.isLoading = true
            this.zones = resData.data.result
        })
    // http://188.166.29.198:8080/DEMO/account/fetchAllZones.action?scId=13

    this.zonedisable = true
    
  }



  logData(row: any){
    console.log(row.usrId)
    
    this.firstLast = row.usrFirstName+' '+row.usrLastName
    console.log(this.firstLast)
    this.usrID = row.usrId
  
    // this.router.navigate(['/admin/bills/view-bill'], row)
  }
  // applyFilter(filterValue: any){

  //   this.dataSource.filter = filterValue.target.value.trim().toLowerCase()

  // }

  onClick(){
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

onZone(zone: any){
  console.log(zone.viewModel)
  const znId = zone.viewModel

  this.http.post(environment.base_url+'/account/fetchRoutes.action?zn_id='+znId+'&criteria=&txtSearch=', {} ,{
    headers : new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded'
    })
} ).subscribe(
      (resData: any) => {
          console.log(resData.data.result)
          this.isLoading = true
          this.routes = resData.data.result
      })

  // http://188.166.29.198:8080/DEMO/account/fetchRoutes.action
  this.routedisable = true
    }

onRoute(route: any){

      
      // http://188.166.29.198:8080/DEMO/account/fetchAllZones.action?scId=13
      
      console.log(route)
      this.routesSelected = route


    }

onSubmit(form : NgForm){

  console.log(form.value)

  const sdate = String(this.datePipe.transform(form.value.date, 'dd/MM/yyyy'));
  const url = environment.base_url+`/payment/saveReceipt.action?rcptId_id=&v_code_version=01-2019-11-01-3962&rcptCode_id=&cAccId_id=`+this.cAccId+`&cCustId_id=`+this.customerId+`&defaultAccNumber_id=`+this.defaultAccNumber+`&rcptDate_id=`+sdate+`&rcptAmount_id=`+form.value.amount+`&rcptAmtTendered=&changeAmt=&rcptPdId_id=&rcptPaymentMode_id=`+form.value.paymentmode+`&rcptReference_id=`+form.value.reference+`&bkbranchcode=&rcpt_remarks_id=&rcptBankName_id=&rcptChqDrawer_id=&invoId_id=`+this.invoId+`&invoAmount_id=`+this.Last

  console.log('url is ----------------------------'+url)

  this.http.post(url, {} ,{
    headers : new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded'
    })
} ).subscribe(
      (resData: any) => {
          this.message = resData.messages.message
          
      } )

      form.reset()
}

submitCust(row : any){


  this.firstLast = row.customerName

  this.cAccId = row?.cAccId
  this.customerId = row?.customerId
  this.defaultAccNumber = row?.defaultAccNumber
  this.http.post(environment.base_url+'/account/fetchInvoice.action?cAccId='+row.cAccId+'&criteria=&txtSearch=', {} ,{
    headers : new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded'
    })
} ).subscribe(
      (resData: any) => {
        if (resData.success == false){
          this.router.navigate(['/login.action'])
        }
        else {
          console.log(resData.data.result)
          this.dtSource = new MatTableDataSource(resData.data.result);
          this.dtSource.paginator = this.paginator;
          this.dtSource.sort = this.sort;
        }
      } 
      )

    this.invoice = true
}

onInvoice(rowm : any){

  console.log(rowm.invoAmount)
  this.Last = rowm.invoAmount
  this.invoId = rowm.invoId
  console.log("the amount is ----",this.Last)
}

}
