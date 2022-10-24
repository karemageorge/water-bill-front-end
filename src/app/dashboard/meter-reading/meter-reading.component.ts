import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgForm, NgModel } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ImagePreviewComponent } from './image-preview/image-preview.component';

@Component({
  selector: 'app-meter-reading',
  templateUrl: './meter-reading.component.html',
  styleUrls: ['./meter-reading.component.css']
})
export class MeterReadingComponent implements OnInit {

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  rowitems: any
  searchbyoptions : any[] = ["customerName","cAccNumber"]

  displayedColumns : string[] = ["meterimage","accountnumber","customer","zone","previousreading","currentreading","unitstobill","readingtype","meterreader"] //,"mtrno","status","route","averageunits"

  

  dataSource : any
  constructor(private dialog: MatDialog,private router : Router, private http : HttpClient) { }

  ngOnInit(): void {

    this.http.post(environment.base_url+'/account/fetchMeterReadingByUserId.action?criteria=&txtSearch=&zn_id=&rt_id=&mtrType=&display_cancelled_records=display_cancelled_records', {} ,{
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
            this.rowitems = resData.data.total
            // this.dataSource.paginator = this.paginator;
            // this.dataSource.sort = this.sort;
          // }
        } 
        )
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
}

  logData(row: any){
    console.log(row)
    // this.router.navigate(['/admin/customers/viewcustomer'], row)
  }
  applyFilter(filterValue: any){

    this.dataSource.filter = filterValue.target.value.trim().toLowerCase()

  }


  onSearch(search : NgModel){
    console.log(search.value)
    
    const name = search.value
    const url = environment.base_url+'/account/fetchMeterReadingByUserId.action?criteria=cAccNumber&txtSearch='+name+'&zn_id=&rt_id=&mtrType=&display_cancelled_records=display_cancelled_records'

    console.log(url)

    this.http.post(url, {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
            console.log(resData.data.result)
            // this.isLoading = true
            this.dataSource = new MatTableDataSource(resData.data.result);
            // this.dataSource.paginator = this.paginator;
            // this.dataSource.sort = this.sort;
        } )
  search.reset()
  }

  openModal(imageSrc: any) {
    console.log("Image source is -------",imageSrc)
    const bsModalRef = this.dialog.open(ImagePreviewComponent, {
      data : {imageSrc : imageSrc},
      height: '400px',
      width: '400px',
    })
  }
}
