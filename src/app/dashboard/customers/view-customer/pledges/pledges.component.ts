import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pledges',
  templateUrl: './pledges.component.html',
  styleUrls: ['./pledges.component.css']
})
export class PledgesComponent implements OnInit {

  @Input() customeID : any 
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  dtSource : any[] = [
    {id: "1", name: "george karema nguhu", kraPin:"A002824017L", CustType:"Domestic", Scheme:"Mumias", Zone:"Twn", Route:"3"},
    {id: "2", name: "mark", kraPin:"A002824017L", CustType:"Domestic", Scheme:"Mumias", Zone:"Twn", Route:"3"},
    {id: "3", name: "kevin", kraPin:"A002824017L", CustType:"Domestic", Scheme:"Mumias", Zone:"Twn", Route:"3"},
    {id: "4", name: "victor", kraPin:"A002824017L", CustType:"Domestic", Scheme:"Mumias", Zone:"Twn", Route:"3"},
    {id: "5", name: "stephen", kraPin:"A002824017L", CustType:"Domestic", Scheme:"Mumias", Zone:"Twn", Route:"3"},
    {id: "6", name: "george", kraPin:"A002824017L", CustType:"Domestic", Scheme:"Mumias", Zone:"Twn", Route:"3"},
    {id: "7", name: "mark", kraPin:"A002824017L", CustType:"Domestic", Scheme:"Mumias", Zone:"Twn", Route:"3"},
    {id: "8", name: "kevin", kraPin:"A002824017L", CustType:"Domestic", Scheme:"Mumias", Zone:"Twn", Route:"3"},
    {id: "9", name: "victor", kraPin:"A002824017L", CustType:"Domestic", Scheme:"Mumias", Zone:"Twn", Route:"3"},
    {id: "10", name: "stephen", kraPin:"A002824017L", CustType:"Domestic", Scheme:"Mumias", Zone:"Twn", Route:"3"},
    {id: "11", name: "george", kraPin:"A002824017L", CustType:"Domestic", Scheme:"Mumias", Zone:"Twn", Route:"3"},
    {id: "12", name: "mark", kraPin:"A002824017L", CustType:"Domestic", Scheme:"Mumias", Zone:"Twn", Route:"3"},
    {id: "13", name: "kevin", kraPin:"A002824017L", CustType:"Domestic", Scheme:"Mumias", Zone:"Twn", Route:"3"},
    {id: "14", name: "victor", kraPin:"A002824017L", CustType:"Domestic", Scheme:"Mumias", Zone:"Twn", Route:"3"},
    {id: "15", name: "stephen", kraPin:"A002824017L", CustType:"Domestic", Scheme:"Mumias", Zone:"Twn", Route:"3"},
  ]
  displayedColumns : string[] = ["id","name","kraPin","CustType","Scheme","Zone","Route"]

  

  dataSource : any
  constructor(private router : Router, private http : HttpClient) { }

  ngOnInit(): void {
    console.log(this.customeID)
    this.http.post(environment.base_url+'/rev/fetchCommitments.action?criteria=&txtSearch=&trnCAccId=39639&cmCAccId='+this.customeID, {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
            console.log(resData.data.result)
            this.dataSource = new MatTableDataSource(resData.data.result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        } 
        )
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator
    // this.dataSource.sort = this.sort
}

  logData(row: any){
    console.log(row)
    this.router.navigate(['/admin/customers/viewcustomer'], row)
  }
  applyFilter(filterValue: any){

    this.dataSource.filter = filterValue.target.value.trim().toLowerCase()

  }



}
