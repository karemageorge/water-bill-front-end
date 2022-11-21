import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';

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
  ]
  displayedColumns : string[] = ["BalanceAmount","Frequency","InstallmentAmount"]

  Frequencies : any[] = ["MONTHLY","WEEKLY","DAILY"]
  Commitment_reasons: any[] = ["MATERIAL LOAN","BILL"]
  EnabledStatuss : any[]= ["Yes","No"]
  RecurrentTypes : any[]=["COMMITMENT","OTHERS"]
  message = ""

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

  onSubmit(form2: NgForm){
    const url = environment.base_url+'/rev/saveCommitments.action?crbId_id=&crbCode_id=&crbFrequency_id=MONTHLY&cm_type=LOAN&invoId_id=&cAccId_id=13015&invoAmount_id=&no_of_months_id=1&paymentDay=5&crb_c_acc_id=13015&crbEnabled_id=YES&crbType_id=COMMITMENT&cmWefDate_id=03%2F11%2F2022&cmWet_id=03%2F12%2F2022&cmInstallAmt_id=200&cmBalanceAmt_id=200&cmCAccId_id=13015'
  }


}
