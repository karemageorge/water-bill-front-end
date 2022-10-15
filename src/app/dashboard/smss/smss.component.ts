import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-smss',
  templateUrl: './smss.component.html',
  styleUrls: ['./smss.component.css']
})
export class SmssComponent implements OnInit {

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  displayedColumns : string[] = ["Mobile","Message","Status","Date Created","Delivery Date"]

  

  dataSource : any

  constructor(private http: HttpClient, private router : Router) { }

  ngOnInit(): void {

    this.http.post(environment.base_url+'/msg/fetchMsgQueue.action', {} ,{
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

  // onSubmit(form : NgForm){
  //   console.log(form.value)
  //   this.http.post(environment.base_url+'/pastors/sendsms', form.value).subscribe(
  //     responseData => {
  //       console.log(responseData)
  //       this.message = responseData
  //       form.reset()
  //     })
  // }

  applyFilter(filterValue: any){

    this.dataSource.filter = filterValue.target.value.trim().toLowerCase()

  }
}
