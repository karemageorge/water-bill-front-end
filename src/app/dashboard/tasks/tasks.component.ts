import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateTaskComponent } from './create-task/create-task.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { taskItem } from './task.model';
import { environment } from 'src/environments/environment';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  isLoading = false
  error : string

  // dtSource? : taskItem[]
  dataSource : any
  // = [
  //   {Invoice: "1", Date: "30/04/2020", DueDate:"30/05/2020", Customer:"george karema nguhu", CreatedBy:"Mumias", Amount:"1000", InvoiceBalance:"3000"},
  // ]
  displayedColumns : string[] = ["Actions","TaskName","AssignedTo","AssignMethod","Scheme","StartDate","DueDate","tskStatus","tskDetails","pdName","taskTotal","taskCompleted"] // "AccountName","defaultAccNumber",

  

  
  constructor(private router : Router, private dialog : MatDialog, private http : HttpClient) { }

  ngOnInit(): void {
    this.http.post<taskItem>(environment.base_url+'/account/fetchTask.action', {} ,{
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
            this.isLoading = true
            this.dataSource = new MatTableDataSource(resData.data.result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          // }
        } 
        // (error: any) => {
        //     console.log(error)
        //     this.error = "Unable to Login please try again"
        //     this.isLoading = false
        // }
        )
}
//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator
//     this.dataSource.sort = this.sort
// }

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
      this.dialog.open(CreateTaskComponent, dialogConfig)
    }

  onSearch(search : NgModel){
      console.log(search.value)
      const name = search.value
      const url = environment.base_url+'/account/fetchTask.action?criteria=assignedTo&txtSearch='+name

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

    delete(itemid: any){
      if(confirm("Are you sure to Expire Task? ")) {
        console.log("id to delete is ------ ", itemid)
      this.http.post(environment.base_url+'/payment/expireTask.action?tsk_id='+itemid, {} ,{
        headers : new HttpHeaders({
            'content-type': 'application/x-www-form-urlencoded'
        })
    } ).subscribe(
          (resData: any) => {
            // if (resData.success == false){
            //   this.router.navigate(['/login.action'])
            // }
            // else {
              
              alert(resData.messages.message)
              console.log(resData.data.result)
            }
          // } 
          // (error: any) => {
          //     console.log(error)
          //     this.error = "Unable to Login please try again"
          //     this.isLoading = false
          // }
          )


      }
    }
  }