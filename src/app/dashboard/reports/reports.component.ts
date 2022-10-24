import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  dtSource : any

  
  displayedColumns : string[] = ["Name","Category","SubCategory"]

  constructor(private router : Router, private dialog : MatDialog, private http: HttpClient ) { }

  ngOnInit(): void {

    this.http.post(environment.base_url+'/myReports/fetchAllReports.action', {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
          if (resData.success == false){
            this.router.navigate(['/login.action'])
          }
          else {
            console.log(resData.data.result);
            this.dtSource = new MatTableDataSource(resData.data.result);
            this.dtSource.paginator = this.paginator
            this.dtSource.sort = this.sort
          }
        } 
        // (error: any) => {
        //     console.log(error)
        //     this.error = "Unable to Login please try again"
        //     this.isLoading = false
        // }
        )
  }
  ngAfterViewInit() {
    // this.dtSource.paginator = this.paginator
    // this.dtSource.sort = this.sort
}

  logData(row: any){
    console.log(row)
  }
  applyFilter(filterValue: any){

    this.dtSource.filter = filterValue.target.value.trim().toLowerCase()

  }

  onCreate() {
    this.router.navigate(['/admin/customers/createcustomer'])

  }

  onclick(){
    
  }


}
