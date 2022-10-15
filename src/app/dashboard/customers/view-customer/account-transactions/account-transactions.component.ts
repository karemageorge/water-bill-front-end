import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account-transactions',
  templateUrl: './account-transactions.component.html',
  styleUrls: ['./account-transactions.component.css']
})
export class AccountTransactionsComponent implements OnInit {
  @Input() customeID : any 
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  dtSource : any[] = [
    {TransactionCode: "TRN00022117", CreatedDate: "30/02/2020", Particulars:"WaterBill-B235684309", Amount:"10000", Type:"Invoice-debit", BalanceBefore:"8755", BalanceAfter:"17510"},
    {TransactionCode: "TRN00022117", CreatedDate: "30/02/2020", Particulars:"WaterBill-B235684309", Amount:"10000", Type:"Invoice-debit", BalanceBefore:"8755", BalanceAfter:"17510"},
    {TransactionCode: "TRN00022117", CreatedDate: "30/02/2020", Particulars:"WaterBill-B235684309", Amount:"10000", Type:"Invoice-debit", BalanceBefore:"8755", BalanceAfter:"17510"},
    {TransactionCode: "TRN00022117", CreatedDate: "30/02/2020", Particulars:"WaterBill-B235684309", Amount:"10000", Type:"Invoice-debit", BalanceBefore:"8755", BalanceAfter:"17510"},
    {TransactionCode: "TRN00022117", CreatedDate: "30/02/2020", Particulars:"WaterBill-B235684309", Amount:"10000", Type:"Invoice-debit", BalanceBefore:"8755", BalanceAfter:"17510"},
  ]
  displayedColumns : string[] = ["TransactionCode","CreatedDate","Particulars","Amount","Type","BalanceBefore","BalanceAfter"]

  

  dataSource : any
  constructor(private router : Router, private http: HttpClient) { }

  ngOnInit(): void {
  //   console.log(this.customeID)


  //   this.http.post(environment.base_url+'/adj/fetchAccountTransaction.action?criteria=&txtSearch=&trnCAccId='+this.customeID, {} ,{
  //     headers : new HttpHeaders({
  //         'content-type': 'application/x-www-form-urlencoded'
  //     })
  // } ).subscribe(
  //       (resData: any) => {
  //           console.log(resData.data.result)
  //           this.dataSource = new MatTableDataSource(resData.data.result);
  //           this.dataSource.paginator = this.paginator;
  //           this.dataSource.sort = this.sort;
  //       } 
  //       )
  }
  ngAfterViewInit() {

    console.log(this.customeID)


    this.http.post(environment.base_url+'/adj/fetchAccountTransaction.action?criteria=&txtSearch=&trnCAccId='+this.customeID, {} ,{
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
