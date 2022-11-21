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
  selector: 'app-create-bill-details',
  templateUrl: './create-bill-details.component.html',
  styleUrls: ['./create-bill-details.component.css']
})
export class CreateBillDetailsComponent implements OnInit {

  
  isLinear = false;

  disable = true;
  zonedisable = false
  routesSelected : any

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  isLoading = false
  error : string
  firstLast : string
  
  message = ""
  billtypes : any[]

  dtSource : any
  displayedColumns : string[] = ["Invoice","Date","DueDate","Customer","CreatedBy","Amount","InvoiceBalance"] // "Actions",
  dataSource : any
  invoiceid : any
  displaycolumns : string[]= ["Actions","Description", "Qty","Price","Amount"] // "Return Status",

  

  
  constructor(private router : Router, private dialog : MatDialog, private http : HttpClient, private _formBuilder: FormBuilder, private datePipe : DatePipe ) { }

  ngOnInit(): void {

    // fetch ivoices to add items to
    this.http.post(environment.base_url+'/account/fetchInvoice.action?criteria=&txtSearch=&pendinginvoices_id=', {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
          // if (resData.success == false){
          //   this.router.navigate(['/login.action'])
          // }
          // else {
            console.log(resData.data.result)
            this.dataSource = new MatTableDataSource(resData.data.result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        // } 
        // (error: any) => {
        //     console.log(error)
        //     this.error = "Unable to Login please try again"
        //     this.isLoading = false
        // }
        )

        // fetch billtypes
        this.http.post(environment.base_url+'/account/fetchBillTypes.action', {} ,{
          headers : new HttpHeaders({
              'content-type': 'application/x-www-form-urlencoded'
          })
      } ).subscribe((resData : any)=>{
        console.log(resData.data.result)
        this.billtypes = resData.data.result
      })


      
}
//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator
//     this.dataSource.sort = this.sort
// }




  logData(row: any){
    console.log(row.invoCode)
    
    this.firstLast = row.invoCode
    console.log(this.firstLast)
    this.invoiceid = row.invoId

    // fetch ivoice Details
    this.http.post(environment.base_url+'/account/fetchInvoiceDetail.action?criteria=&txtSearch=&invoId='+this.invoiceid, {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
            console.log(resData.data.result)
            this.dtSource = new MatTableDataSource(resData.data.result);
            this.dtSource.paginator = this.paginator;
            this.dtSource.sort = this.sort;
          }
        )

  
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
    const url = environment.base_url+'/account/fetchInvoice.action?criteria=customerName&txtSearch='+name+'&pendinginvoices_id='

    console.log(url)

    this.http.post(url, {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
            console.log(resData.data.result)
            this.dataSource = new MatTableDataSource(resData.data.result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        } )
  search.reset()
    }


onSubmit(form : NgForm){

  console.log(form.value)
  let units = form.value.units
  let description = form.value.description
  let price = form.value.price
  let billid = form.value.billtype


  const url = environment.base_url+'/account/saveInvoiceDetail.action?invodInvId_id='+this.invoiceid+'&invodId_id=&invodQty_id='+units+'&invoBillId_id='+billid+'&invoBillName_id=&ts_test_req_id=&tsTstdId=&tstId=&ts_test_req_name=&capacity_id=&tkAssignedTo_name=&tkAssignedTo_id=&tru_name=&tru_id=&charged_by_id=&tskStart_date=&tskEnd_date=&invoRateId_id=&invodDescription_id='+description+'&rateMinimum=&rateMax=&rateValue='+price+'&rateAmountTotal=&rateType=&invodCreatedBy_id=&invodPrice_id=&invodCreatedDate_id=&invodUpdatedBy_id=&invodUpdatedDate_id='
  console.log('url is ----------------------------'+url)

  this.http.post(url, {} ,{
    headers : new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded'
    })
} ).subscribe(
      (resData: any) => {
          
          alert(resData.messages.message)


          this.http.post(environment.base_url+'/account/fetchInvoiceDetail.action?criteria=&txtSearch=&invoId='+this.invoiceid, {} ,{
            headers : new HttpHeaders({
                'content-type': 'application/x-www-form-urlencoded'
            })
        } ).subscribe(
              (resData: any) => {
                  console.log(resData.data.result)
                  this.dtSource = new MatTableDataSource(resData.data.result);
                  this.dtSource.paginator = this.paginator;
                  this.dtSource.sort = this.sort;
                }
              )



          console.log(resData.data.result)
          form.reset()    
      } )

      
}
deleteitem(row: any){

  console.log()
  if(confirm("Are you sure to delete "+row.billName+" Invoice Item ? ")) {
    console.log("Invoice to delete is ------ ", row.invodId)
    this.http.post(environment.base_url+'/account/deleteInvoiceItem.action?invodId='+row.invodId, {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
            alert(resData.messages.message)
          }
        
        )
  
}

this.http.post(environment.base_url+'/account/fetchInvoiceDetail.action?criteria=&txtSearch=&invoId='+this.invoiceid, {} ,{
  headers : new HttpHeaders({
      'content-type': 'application/x-www-form-urlencoded'
  })
} ).subscribe(
    (resData: any) => {
        console.log(resData.data.result)
        this.dtSource = new MatTableDataSource(resData.data.result);
        this.dtSource.paginator = this.paginator;
        this.dtSource.sort = this.sort;
      }
    )

    
}
finalize(){
  this.http.post(environment.base_url+'/account/finaliseInvoice.action?action=SUBMIT&invoId='+this.invoiceid, {} ,{
    headers : new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded'
    })
} ).subscribe(
      (resData: any) => {
        alert(resData.messages.message)
          
        }
      )
}

}
