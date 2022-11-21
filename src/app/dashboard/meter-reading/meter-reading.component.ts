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
  selecteditem : any
  searchbyoptions : any[] = ["customerName","cAccNumber"]

  displayedColumns : string[] = ["meterimage","accountnumber","customer","zone","previousreading","currentreading","unitstobill","amountbilled","readingtype","meterreader","invocode"] //,"mtrno","status","route","averageunits"

  searchby: any[] = ["cAccNumber","cAccountName"]
  schemes : any[] = []

  dataSource : any
  routes : any[] = []
  zones: any[] = []
  scId : any
  znId: any
  rtId : any
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

            this.http.post(environment.base_url+'/msg/fetchScheme.action?scId=&query=', {} ,{
              headers : new HttpHeaders({
                  'content-type': 'application/x-www-form-urlencoded'
              })
          } ).subscribe(
                (resData: any) => {
                    console.log(resData.data.result)
                    this.schemes = resData.data.result
                })

                
            this.dataSource = new MatTableDataSource(resData.data.result);
            this.rowitems = resData.data.total
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          // }
        } 
        )
  }
  ngAfterViewInit() {
   
}

  logData(row: any){
    console.log(row)
    // this.router.navigate(['/admin/customers/viewcustomer'], row)
  }
  applyFilter(filterValue: any){

    this.dataSource.filter = filterValue.target.value.trim().toLowerCase()

  }


  onSearch(search : NgModel){
    console.log(search.viewModel)
    
    
    const url = environment.base_url+'/account/fetchMeterReadingByUserId.action?criteria='+this.selecteditem+'&txtSearch='+search.viewModel+'&zn_id=&rt_id=&display_cancelled_records=display_cancelled_records'

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
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
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

  onSelect(select: any){
    this.selecteditem = select.viewModel
  }


  onScheme(scheme : NgModel){
    
    console.log(scheme.viewModel)

    this.scId =  scheme.viewModel

    this.http.post(environment.base_url+'/account/fetchAllZones.action?scId='+this.scId, {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
            console.log(resData.data.result)
            this.zones = resData.data.result
        })
    // http://188.166.29.198:8080/DEMO/account/fetchAllZones.action?scId=13
    

    
    this.http.post(environment.base_url+'/account/fetchMeterReadingByUserId.action?scId='+this.scId, {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
          this.dataSource = new MatTableDataSource(resData.data.result);
          this.rowitems = resData.data.total
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(resData.data.result)
        })
    
    
  }


  onZone(zone: NgModel){
    console.log(zone.viewModel)
    this.znId = zone.viewModel
  
    this.http.post(environment.base_url+'/account/fetchRoutes.action?zn_id='+this.znId+'&criteria=&txtSearch=', {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
      } ).subscribe(
        (resData: any) => {
            console.log(resData.data.result)
            this.routes = resData.data.result
        })
  
    // http://188.166.29.198:8080/DEMO/account/fetchRoutes.action
    this.http.post(environment.base_url+'/account/fetchMeterReadingByUserId.action?criteria=&txtSearch=&zn_id='+this.znId+'&rt_id=&display_cancelled_records=display_cancelled_records', {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
      } ).subscribe(
        (resData: any) => {
          console.log(resData.data.result)
          this.dataSource = new MatTableDataSource(resData.data.result);
          this.rowitems = resData.data.total
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })

      }
  
  onRoute(route:NgModel){
  
        
        // http://188.166.29.198:8080/DEMO/account/fetchAllZones.action?scId=13
        
        this.rtId = route.viewModel
    this.http.post(environment.base_url+'/account/fetchMeterReadingByUserId.action?criteria=&txtSearch=&zn_id='+this.znId+'&rt_id='+this.rtId+'&display_cancelled_records=display_cancelled_records', {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
      } ).subscribe(
        (resData: any) => {
          console.log(resData.data.result)
          this.dataSource = new MatTableDataSource(resData.data.result);
          this.rowitems = resData.data.total
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
  
      }

}
