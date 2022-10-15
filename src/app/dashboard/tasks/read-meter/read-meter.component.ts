import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';


import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { taskItem } from '../task.model';
import { environment } from 'src/environments/environment';
import { NgForm, NgModel } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-read-meter',
  templateUrl: './read-meter.component.html',
  styleUrls: ['./read-meter.component.css']
})
export class ReadMeterComponent implements OnInit {

  isLinear = false;

  disable = true;
  zonedisable = false
  routesSelected : any

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
  displayedColumns : string[] = ["UserName","FirstName","LastName","Email","PhoneNumber"]

  

  
  constructor(private router : Router, private dialog : MatDialog, private http : HttpClient, private _formBuilder: FormBuilder, private datePipe : DatePipe ) { }

  ngOnInit(): void {
    this.http.post<taskItem>(environment.base_url+'/user/fetchUser.action?criteria=&txtSearch=', {} ,{
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

      this.http.post<taskItem>(url, {} ,{
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
  const tskType = "MeterReading"
  const readingType = "MONTHLY"
  const tskAssignedTo = this.usrID
  const startdate = String(this.datePipe.transform(this.now, 'dd/MM/yyyy')); // 👉️ 2/17/2022
  const enddate = this.datePipe.transform(form.value.enddate, 'dd/MM/yyyy'); 
  // const pid = null  // june 2022
  const schemeid = form.value.scheme
  const zoneid = form.value.zone
  const routeid =  form.value.routes

  
  console.log("start date is -----------",startdate)
  console.log(enddate)

  const url = environment.base_url+`/account/saveTask.action?tsk_id=&tsk_type=MeterReading&proceed_to_nxt_id=on&reading_type=
  MONTHLY&dcnId=&disconnection_type=&tsk_pd_id=&customerType_id=&tskdMonths_id=&tskdBalance_id=&tskAssigned_to=`+tskAssignedTo+`&tskStart_date=
  `+startdate+`&tskEnd_date=`+enddate+`&tsk_method_id=ROUTE&tskAccId_id=&tskScheme_id=`+schemeid+`&tskZone_id=`+zoneid+`&sup_rt_id=`+routeid+`&tskRoute_id=
  `+routeid+`&RouteCriteria=&RouteSrchValue=&tskAssing_all_Routes=&RouteCriteria=&RouteAlocatedSrchValue=`

  console.log('url is ----------------------------'+url)

  this.http.post(url, {} ,{
    headers : new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded'
    })
  } ).subscribe(
      (resData: any) => {
          console.log(resData.data.result)
          if (resData.messages.message == "RECORD SAVED SUCCESSFULLY"){

            this.message = "Task was successfully created"
            form.reset()
          }
          else {
            this.message = "unable to create task. Please try again"
          }
          
      },
      (error)=>{
        this.message = "an error occurred please try again"
      } )
}

}
