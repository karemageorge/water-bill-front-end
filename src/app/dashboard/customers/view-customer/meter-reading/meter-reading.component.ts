import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-meter-reading',
  templateUrl: './meter-reading.component.html',
  styleUrls: ['./meter-reading.component.css']
})
export class MeterReadingComponent implements OnInit {

  @Input() customeID : any 

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  dtSource : any[] = [
    {Date: "30/02/2020", Period: "May", Invoice:"B234455556", PreviousReading:"677", CurrentReading:"877", Status:"ACTIVE", Units:"6", MtrType:"MONTHLY",ReadingType:"ESTIMATE", ExceptionType:"METER REMOVED", Remarks:"DISCONNECT ACCOUNT"},
    {Date: "30/02/2020", Period: "May", Invoice:"B234455556", PreviousReading:"677", CurrentReading:"877", Status:"ACTIVE", Units:"6", MtrType:"MONTHLY",ReadingType:"ESTIMATE", ExceptionType:"METER REMOVED", Remarks:"DISCONNECT ACCOUNT"},
    {Date: "30/02/2020", Period: "May", Invoice:"B234455556", PreviousReading:"677", CurrentReading:"877", Status:"ACTIVE", Units:"6", MtrType:"MONTHLY",ReadingType:"ESTIMATE", ExceptionType:"METER REMOVED", Remarks:"DISCONNECT ACCOUNT"},
    {Date: "30/02/2020", Period: "May", Invoice:"B234455556", PreviousReading:"677", CurrentReading:"877", Status:"ACTIVE", Units:"6", MtrType:"MONTHLY",ReadingType:"ESTIMATE", ExceptionType:"METER REMOVED", Remarks:"DISCONNECT ACCOUNT"},
    {Date: "30/02/2020", Period: "May", Invoice:"B234455556", PreviousReading:"677", CurrentReading:"877", Status:"ACTIVE", Units:"6", MtrType:"MONTHLY",ReadingType:"ESTIMATE", ExceptionType:"METER REMOVED", Remarks:"DISCONNECT ACCOUNT"},
  ]
  displayedColumns : string[] = ["Date","Period","Invoice","PreviousReading","CurrentReading","Status","Units","MtrType","ReadingType","ExceptionType","Remarks"]

  id : any

  dataSource : any
  constructor(private router : Router, private route : ActivatedRoute, private http : HttpClient) { }

  ngOnInit(): void {
    
  }
  ngAfterViewInit() {
    console.log("the account id on meter reading is -----", this.customeID)

    this.http.post(environment.base_url+'/account/fetchMeterReadingByUserId.action?account_id='+this.customeID, {} ,{
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

  logData(row: any){
    console.log(row)
    this.router.navigate(['/admin/customers/viewcustomer'], row)
  }
  applyFilter(filterValue: any){

    this.dataSource.filter = filterValue.target.value.trim().toLowerCase()

  }



}
