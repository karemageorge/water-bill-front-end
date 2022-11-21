import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';


import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router, RouterLinkWithHref } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgForm, NgModel } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-reading',
  templateUrl: './create-reading.component.html',
  styleUrls: ['./create-reading.component.css']
})
export class CreateReadingComponent implements OnInit {

  isLinear = false;

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

  routes : any[]=["mark","george","stphen","kiumbe","mark","george","stphen","kiumbe","mark","george","stphen","kiumbe"]


  now = new Date();
  customerdetails : any
  units: any
  selectedfile = null
  formData : any

  currentmeterreading = ""
  previousmeterreading = ""
  mtrUnits : any
  custdetails : any
  

  // dtSource? : taskItem[]
  dataSource : any
  // = [
  //   {Invoice: "1", Date: "30/04/2020", DueDate:"30/05/2020", Customer:"george karema nguhu", CreatedBy:"Mumias", Amount:"1000", InvoiceBalance:"3000"},
  // ]
  displayedColumns : string[] = ["Account_Number","Account_Name","Account_Balance","Mobile_Number","Curr_Mtr_Reading","Prv_Mtr_Reading","Account_Status","Scheme","Zone","Route"] // ,"National_Id","Deposit","Serial_Number"

  

  
  constructor(private router : Router, private dialog : MatDialog, private http : HttpClient, private _formBuilder: FormBuilder, private datePipe : DatePipe ) { }

  ngOnInit(): void {
    this.http.post(environment.base_url+'/account/fetchCustomersAccounts.action?criteria=&txtSearch=&agingChkbox=&znId=&scId=&includePendingPaymentAccounts_id=true&limit=20', {} ,{
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
            this.isLoading = true
            this.dataSource = new MatTableDataSource(resData.data.result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
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



  // applyFilter(filterValue: any){

  //   this.dataSource.filter = filterValue.target.value.trim().toLowerCase()

  // }

  onClick(row: any){
    console.log(row)
    this.firstLast = row.customerName
    this.customerdetails = row
    this.previousmeterreading = row?.balCurrentMeterReading
    // http://188.166.29.198:8080/DEMO/account/fetchCustomersAccounts.action
    }

  onSearch(search : NgModel){
      console.log(search.value)
      const name = search.value
      const url = environment.base_url+'/account/fetchCustomersAccounts.action?criteria=cAccNumber&txtSearch='+name+'&includePendingPaymentAccounts_id=true&includeClosedAccounts_id=true'

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
  // this.formData.append('mtrId_id','')
  // this.formData.append('v_code_version','02-2020-03-02-3963')
  // this.formData.append('cAccId_id',this.customerdetails.cAccId)
  // this.formData.append('cCustId_id',this.customerdetails.cCustId)
  // this.formData.append('mtrStatus_id',form.value.readingstatus)
  // this.formData.append('mtrReadingType_id',form.value.readingmethod)
  // this.formData.append('mtrType_id', form.value.billingtype)
  // this.formData.append('mtrPreviousReading',this.previousmeterreading)
  // this.formData.append('mtr_ExcepRemark',form.value.remarks)
  // this.formData.append('mtrUnits',this.mtrUnits)
  // this.formData.append('mtrCurrentReading',this.currentmeterreading)

  const url = environment.base_url+'/account/postMeterReading.action?mtrId_id=&v_code_version=02-2020-03-02-3963&cAccId_id='+this.customerdetails.cAccId+'&cCustId_id='+this.customerdetails.cCustId+'&mtrStatus_id='+form.value.readingstatus+'&mtrReadingType_id='+form.value.readingmethod+'&mtrType_id='+form.value.billingtype+'&tskAssigned_to=&estimatedUnits=&mtrPreviousReading='+this.previousmeterreading+'&mtrCurrentReading='+this.currentmeterreading+'&mtrUnits='+this.mtrUnits+'&accStatusCode=&mtrExcepReason=&mtr_ExcepRemark='+form.value.remarks // +'&file='//+this.formData

  console.log('url is ----------------------------'+url)

  this.http.post(url, {} ,{
    headers : new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded'
    })
} ).subscribe(
      (resData: any) => {
        alert(resData.message)
          // if (resData.messages.message == "RECORD SAVED SUCCESSFULLY"){
            
          //   this.message = "Task was successfully created"
          //   alert(this.message)
          // }
          // else {
          //   this.message = "unable to create task. Please try again"
          //   alert(this.message)
          // }
          
      },
      (error : any)=>{
        alert("An error occured. unable to proceed please contact admin")
      } )
}

calcunits(mtrCurrentReading : any){

  this.currentmeterreading = mtrCurrentReading.value
  console.log("current meter reading is -----",mtrCurrentReading.value)
  console.log("the new current meter reading is -----",mtrCurrentReading.value)
  console.log("previous meter reading is", Number(this.previousmeterreading))
  console.log(typeof Number(this.previousmeterreading))
  console.log(typeof Number(this.currentmeterreading))
  this.mtrUnits = Number(this.currentmeterreading)-Number(this.previousmeterreading)
  console.log("meter units is -----", this.mtrUnits)
  console.log(typeof this.mtrUnits)
}

onFileSelected(event: any){
  let file = event.target.files[0]
  this.formData = new FormData()
  this.formData.append("file", file)
}
}
