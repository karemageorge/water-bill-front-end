import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-customer-enquery',
  templateUrl: './customer-enquery.component.html',
  styleUrls: ['./customer-enquery.component.css']
})
export class CustomerEnqueryComponent implements OnInit {

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  
  displayedColumns : string[] = ["Zone","Account_Number","Old_Acc","Account_Name","Account_Balance","Mobile_Number","Scheme","Zone","Route","Account_Status","National_Id","Deposit","Serial_Number"]

  dtSource : any[] = [
    {customerName : "george"},
    {customerName : "mark"},
    {customerName : "kiumbe"}
  ]

  
  dataSource : any
  


  constructor(private router : Router, private dialog : MatDialog, private http: HttpClient ) { }

  
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

  onSearch(search : NgModel){
    console.log(search.value)
    const name = search.value
    const url = environment.base_url+'/account/fetchCustomers.action?criteria=customerName&txtSearch='+name+'&znId=&scId='

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


}
