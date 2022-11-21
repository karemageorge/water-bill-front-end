import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgModel } from '@angular/forms';
import { ViewBillComponent } from './view-bill/view-bill.component';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  dtSource : any[] = []
  displayedColumns : string[] = ["Actions","Invoice","Date","DueDate","Customer","CreatedBy","Amount","InvoiceBalance"]
  dataSource : any
  constructor(private router : Router, private Dialog : MatDialog, private http : HttpClient) { }

  ngOnInit(): void {

    this.http.post(environment.base_url+'/account/fetchInvoice.action?criteria=&txtSearch=&pendinginvoices_id=', {} ,{
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
            this.dataSource = new MatTableDataSource(resData.data.result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        // } 
        // (error: any) => {
        //     console.log(error)
        //     this.error = "Unable to Login please try again"
        //     this.isLoading = false
        // }
        )
  }
  ngAfterViewInit() {
}

  logData(row: any){
    console.log(row)
    this.router.navigate(['/admin/bills/view-bill'], row)
  }
  applyFilter(filterValue: any){

    this.dataSource.filter = filterValue.target.value.trim().toLowerCase()

  }

  onClick(){

  }

  onSearch(search : NgModel){
    console.log(search.value)
    const name = search.value
    const url = environment.base_url+'/account/fetchInvoice.action?criteria=cAccNumber&txtSearch='+name+'&pendinginvoices_id='

    console.log(url)

    this.http.post(url, {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
            console.log(resData.data.result)
            this.dataSource = new MatTableDataSource(resData.data.result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        } )
  search.reset()
  }

  delete(itemid: any){
    if(confirm("Are you sure to delete Invoice? ")) {
      console.log("Invoice to delete is ------ ", itemid.invoId)
      this.http.post(environment.base_url+'/payment/cancelnvoice.action?invoId_id='+itemid.invoId+'&curRead_to=0&cancelReason=CANCEL', {} ,{
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

  view(row: any){
    console.log("invoice item is ----", row)
    this.Dialog.open(ViewBillComponent, {
      // maxWidth: '100vw',
      // maxHeight: '100vh',
      data : {invoid : row.invoId, invocode : row.invoCode},
      height: '600px',
      width: '800px',
      // panelClass: 'full-screen-modal'
    });

  }

  print(row : any){

    
    this.http.post(environment.base_url+'/myReports/directReport.action?&receiptNo='+row.invoCAccId+'&P_PERIOD='+row.invoPdId+'&reportName=CUSTOMER_WATER_BILL&PDF_FORMAT=inline&P_FORMAT=PDF', {} ,{
      // observe:'response',
      responseType:'arraybuffer'
      } ).subscribe(
        (resData: any) => {

          // let filename = resData.headers.get('Content-disposition')?.split(';')[1].split('=')[1]
          // let blob1: Blob = resData.body as Blob
          // let a = document.createElement('a')
          // a.download = filename
          // a.href = window.URL.createObjectURL(blob1)
          // window.open(a.href, '_blank');
          // a.click()
          // alert('Print Bill ready for viewing')

          // let response = this.base64ToArrayBuffer(resData);
          // let file = new Blob([response], { type: 'application/pdf' });            
          // var fileURL = URL.createObjectURL(file);
          // window.open(fileURL);




          let blob = new Blob([resData], { type: 'application/pdf' });
          console.log("blob object is ------------",blob)
          
          let pdfUrl = window.URL.createObjectURL(blob);

          var PDF_link = document.createElement('a');
          PDF_link.href = pdfUrl;
          //   TO OPEN PDF ON BROWSER IN NEW TAB
          
          window.open(pdfUrl, '_blank');
          //   TO DOWNLOAD PDF TO YOUR COMPUTER
          PDF_link.download = "Bill.pdf";
          PDF_link.click();
          console.log(resData)
          
          }
        )
        alert('Bill opened successfully!')
  }

  base64ToArrayBuffer(base64:any):ArrayBuffer {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
}
