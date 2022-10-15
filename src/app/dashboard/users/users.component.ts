import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgForm, NgModel } from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  isLoading = false
  error : string

  // dtSource? : taskItem[]
  dataSource : any
  // = [
  //   {Invoice: "1", Date: "30/04/2020", DueDate:"30/05/2020", Customer:"george karema nguhu", CreatedBy:"Mumias", Amount:"1000", InvoiceBalance:"3000"},
  // ]
  displayedColumns : string[] = ["FirstName","LastName","Email","Username","MobileNumber","CreatedAt","UpdatedAt","supervisor"]

  

  
  constructor(private router : Router, private dialog : MatDialog, private http : HttpClient) { }


  ngOnInit(): void {
    this.http.post(environment.base_url+'/user/fetchUser.action', {} ,{
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
}

  logData(row: any){
    console.log(row)
    // this.router.navigate(['/admin/bills/view-bill'], row)
  }
  // applyFilter(filterValue: any){

  //   this.dataSource.filter = filterValue.target.value.trim().toLowerCase()

  // }

  onClick(){
      const dialogConfig = new MatDialogConfig()
      // dialogConfig.disableClose = true
      dialogConfig.autoFocus = true
      // dialogConfig.height = ''
      // this.dialog.open(CreateTaskComponent, dialogConfig)
    }

    applyFilter(filterValue: any){

      this.dataSource.filter = filterValue.target.value.trim().toLowerCase()
  
    }
}
