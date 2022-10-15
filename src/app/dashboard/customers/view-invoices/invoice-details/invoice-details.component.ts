import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {

  @Input() invoiceID : any
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  displayedColumns : string[] = ["Description","Return_Status","Quantity","Price","Amount"]

  

  dataSource : any

  constructor(private router : Router, private http: HttpClient) { }

  ngOnInit(): void {
    
    //188.166.29.198:8080/DEMO/account/fetchInvoiceDetail.action?criteria=&txtSearch=&invoId=104660
  }
  ngAfterViewInit() {

    console.log("the invoice id is -----", this.invoiceID)


    this.http.post(environment.base_url+'/account/fetchInvoiceDetail.action?criteria=&txtSearch=&invoId='+this.invoiceID+'&includePendingPaymentAccounts_id=true&includeClosedAccounts_id=true', {} ,{
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

}
