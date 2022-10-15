import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  dtSource : any[] = []
  displayedColumns : string[] = ["Actions","Invoice","Date","DueDate","Customer","CreatedBy","Amount","InvoiceBalance"]
  dataSource : any
  constructor(private router : Router, private Dialog : MatDialog, private http : HttpClient) { }

  ngOnInit(): void {

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
  }
  ngAfterViewInit() {
}

  logData(row: any){
    console.log(row)
    this.router.navigate(['/admin/bills/view-bill'], row)
  }
  applyFilter(filterValue: any){

    this.dataSource.filter = filterValue.target.value.trim().toLowerCase()

  }

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
}
