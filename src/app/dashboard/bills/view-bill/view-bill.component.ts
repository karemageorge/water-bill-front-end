import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.css']
})
export class ViewBillComponent implements OnInit {

  row: any

  
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  displaycolumns : string[]= ["Description","Return Status", "Qty","Price","Amount"]

  dtSource : any
  dataSource : any

  
  constructor(private router : Router, private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: {invoid: any, invocode: any}) { 
    this.row = this.router.getCurrentNavigation()?.extras
    console.log(this.row)
  }

  ngOnInit(): void {

    console.log("Invoice ID is -------",this.data.invoid)
    this.http.post(environment.base_url+'/account/fetchInvoiceDetail.action?criteria=&txtSearch=&invoId='+this.data.invoid, {} ,{
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
            this.dtSource = new MatTableDataSource(resData.data.result);
            this.dtSource.paginator = this.paginator;
            this.dtSource.sort = this.sort;
          }
        // } 
        // (error: any) => {
        //     console.log(error)
        //     this.error = "Unable to Login please try again"
        //     this.isLoading = false
        // }
        )
  }
  
  doAction(action : string){
    console.log(action)
  }
  delete( item : any){

  }
  view(row : any){

  }
}
