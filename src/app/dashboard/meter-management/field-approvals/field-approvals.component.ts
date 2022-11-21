import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-field-approvals',
  templateUrl: './field-approvals.component.html',
  styleUrls: ['./field-approvals.component.css']
})
export class FieldApprovalsComponent implements OnInit {

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  selecteditem : any
  displayedColumns : string[] = ["Requested_Date","Request_Type","System_Status","Account_Name","Account_Number","Scheme","Zone","Route","Req_Reason","Req_By"]
  schemes : any[] = []
  dtSource : any[] = [
    {customerName : "george"},
    {customerName : "mark"},
    {customerName : "kiumbe"}
  ]

  
  dataSource : any
  searchby: any[] = ["cAccNumber","cAccountName"]
  routes : any[] = []
  zones: any[] = []
  scId : any
  znId: any
  rtId : any


  constructor(private router : Router, private dialog : MatDialog, private http: HttpClient ) { }

  
  ngOnInit(): void {
    this.http.post(environment.base_url+'/meter/fetchMeterRequisitions.action?criteria=&txtSearch=', {} ,{
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

            this.http.post(environment.base_url+'/msg/fetchScheme.action?scId=&query=', {} ,{
              headers : new HttpHeaders({
                  'content-type': 'application/x-www-form-urlencoded'
              })
          } ).subscribe(
                (resData: any) => {
                    console.log(resData.data.result)
                    this.schemes = resData.data.result
                })
                
            this.dataSource = new MatTableDataSource(resData.data.result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        } 
        )

        
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator
    // this.dataSource.sort = this.sort
}

  logData(row: any){
    console.log(row)
    this.router.navigate(['/admin/customers/viewcustomer/account-transactions'], row)
  }
  applyFilter(filterValue: any){

    this.dataSource.filter = filterValue.target.value.trim().toLowerCase()

  }

  onCreate() {
    // const dialogConfig = new MatDialogConfig()
    // // dialogConfig.disableClose = true
    // dialogConfig.autoFocus = true
    // dialogConfig.height = '600px'
    // this.dialog.open(CreateCustomerComponent, dialogConfig)
    this.router.navigate(['/admin/customers/createcustomer'])

  }
  onSelect(select: any){
    this.selecteditem = select.viewModel
  }

  onSearch(search : any){
    console.log(search.viewModel)
    
    const url = environment.base_url+'/account/fetchCustomersAccounts.action?criteria='+this.selecteditem+'&txtSearch='+search.viewModel+'&znId=&scId='

    console.log(url)

    this.http.post(url, {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
            console.log(resData.data.result)
            // this.isLoading = true
            this.dataSource = new MatTableDataSource(resData.data.result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        } )
  search.reset()
  }

  onApprove(){
    this.router.navigate(['/admin/customers/approvecustomer'])
  }
  onCreateNew(){
    
  }


  onScheme(scheme : NgModel){
    
    console.log(scheme.viewModel)

    this.scId =  scheme.viewModel

    this.http.post(environment.base_url+'/account/fetchAllZones.action?scId='+this.scId, {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
            console.log(resData.data.result)
            this.zones = resData.data.result
        })
    // http://188.166.29.198:8080/DEMO/account/fetchAllZones.action?scId=13
    

    
    this.http.post(environment.base_url+'/account/fetchCustomers.action?scId='+this.scId, {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
          this.dataSource = new MatTableDataSource(resData.data.result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
    
    
  }


  onZone(zone: NgModel){
    console.log(zone.viewModel)
    this.znId = zone.viewModel
  
    this.http.post(environment.base_url+'/account/fetchRoutes.action?zn_id='+this.znId+'&criteria=&txtSearch=', {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
      } ).subscribe(
        (resData: any) => {
            console.log(resData.data.result)
            this.routes = resData.data.result
        })
  
    // http://188.166.29.198:8080/DEMO/account/fetchRoutes.action
    this.http.post(environment.base_url+'/account/fetchCustomers.action?znId='+this.znId+'&criteria=&txtSearch=', {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
      } ).subscribe(
        (resData: any) => {
          this.dataSource = new MatTableDataSource(resData.data.result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })

      }
  
  onRoute(route:NgModel){
  
        
        // http://188.166.29.198:8080/DEMO/account/fetchAllZones.action?scId=13
        
        this.rtId = route.viewModel
    this.http.post(environment.base_url+'/account/fetchCustomers.action?rtId='+this.rtId+'&criteria=&txtSearch=', {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
      } ).subscribe(
        (resData: any) => {
          this.dataSource = new MatTableDataSource(resData.data.result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
        

  
  
      }

  onSort(route : NgModel){

    this.rtId = route.viewModel
    this.http.post(environment.base_url+'/account/fetchCustomers.action?rtId='+this.znId+'&criteria=&txtSearch=', {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
      } ).subscribe(
        (resData: any) => {
          this.dataSource = new MatTableDataSource(resData.data.result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
  }




}
