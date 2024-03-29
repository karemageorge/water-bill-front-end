import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';


import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgForm, NgModel } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';

@Component({
  selector: 'app-exceptions',
  templateUrl: './exceptions.component.html',
  styleUrls: ['./exceptions.component.css']
})
export class ExceptionsComponent implements OnInit {

  completed = false

  isLinear = false;

  disable = true;
  zonedisable = false
  routesSelected : any
  searchby : any[] = ["cAccNumber","cAccountName"]

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  isLoading = false
  error : string
  firstLast : string
  usrID : any
  schemes : any[]  // = [{scName: "mark", scId: 13 }, ]
  zones : any[]  // = [{znId : 101, znName : "embu"}]
  routedisable = false
  message = ""
  exception_details : any

  routes : any[]=["mark","george","stphen","kiumbe","mark","george","stphen","kiumbe","mark","george","stphen","kiumbe"]

  selecteditem : any
  now = new Date();
  approvaldata : any
  znId : any
  rtId : any
  scId : any

  CustomerName =""
  custId : any

  mtrReadingTypes = ["ACTUAL","ESTIMATE","AVERAGE"]
  rowitems : any

  

  // dtSource? : taskItem[]
  dataSource : any
  currentmeterreading = ""
  previousmeterreading = ""
  mtrUnits : any
  unitstobill = ""
  // = [
  //   {Invoice: "1", Date: "30/04/2020", DueDate:"30/05/2020", Customer:"george karema nguhu", CreatedBy:"Mumias", Amount:"1000", InvoiceBalance:"3000"},
  // ]
  displayedColumns : string[] = ["customer","meterreader","mtrno","previousreading","currentreading","status","mtrCustAcc","mtrRemarks"]

  

  
  constructor(private router : Router, private dialog : MatDialog, private http : HttpClient, private _formBuilder: FormBuilder, private datePipe : DatePipe ) { }

  ngOnInit(): void {
    this.http.post(environment.base_url+'/account/fetchMeterReadingException.action?criteria=&txtSearch=&zn_id=&sc_id=&rt_id=&mtrType=&limit=100', {} ,{
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
            this.dataSource.paginator = this.paginator
            this.dataSource.sort = this.sort
            this.rowitems = resData.data.total
            
          }
        // }
        )
    

        this.http.post(environment.base_url+'/msg/fetchScheme.action?scId=&query=', {} ,{
          headers : new HttpHeaders({
              'content-type': 'application/x-www-form-urlencoded'
          })
      } ).subscribe(
            (resData: any) => {
                console.log(resData.data.result)
                this.isLoading = true
                this.schemes = resData.data.result
            })
}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  onSelect(select: any){
    this.selecteditem = select.viewModel
  }

  onScheme(scheme : any){
    
    console.log(scheme.viewModel)

    this.scId =  scheme.viewModel

    this.http.post(environment.base_url+'/account/fetchAllZones.action?scId='+this.scId, {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
            console.log(resData.data.result)
            this.isLoading = true
            this.zones = resData.data.result
        })
    // http://188.166.29.198:8080/DEMO/account/fetchAllZones.action?scId=13

    this.zonedisable = true

  //  /account/fetchMeterReadingException.action?criteria='+this.selecteditem+'&txtSearch='+name+'&zn_id=&sc_id=&rt_id=&mtrType=
    
  }

  oScheme(scheme : any){
    
    console.log(scheme.viewModel)

    this.scId =  scheme.viewModel

    this.http.post(environment.base_url+'/account/fetchAllZones.action?scId='+this.scId, {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
            console.log(resData.data.result)
            this.isLoading = true
            this.zones = resData.data.result
        })
    // http://188.166.29.198:8080/DEMO/account/fetchAllZones.action?scId=13

    this.http.post(environment.base_url+'/account/fetchMeterReadingException.action?criteria=&txtSearch=&zn_id=&sc_id='+this.scId+'&rt_id=&mtrType=', {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
          this.dataSource = new MatTableDataSource(resData.data.result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })

  //  /account/fetchMeterReadingException.action?criteria='+this.selecteditem+'&txtSearch='+name+'&zn_id=&sc_id=&rt_id=&mtrType=
    
  }

  logData(row: any){
    console.log(row.custName)
    this.exception_details = row
    this.CustomerName = row.custName
    this.currentmeterreading = row.mtrCurrentReading
    this.previousmeterreading = row.mtrPreviousReading
    this.mtrUnits = row.mtrUnits

    // this.custId = row.mtrCustId
    // const url = environment.base_url+'/account/fetchMeterReadingByUserId.action?account_id='+this.custId

    //   console.log(url)

    //   this.http.post(url, {} ,{
    //     headers : new HttpHeaders({
    //         'content-type': 'application/x-www-form-urlencoded'
    //     })
    // } ).subscribe(
    //       (resData: any) => {
    //           console.log(resData.data.result)
    //           this.isLoading = true
    //           this.approvaldata = resData.data.result[0]
    //           console.log(this.approvaldata)
    //           this.completed = true
    //       } )



   // /account/fetchMeterReadingByUserId.action?account_id=
  
    // this.router.navigate(['/admin/bills/view-bill'], row)
  }
  // applyFilter(filterValue: any){

  //   this.dataSource.filter = filterValue.target.value.trim().toLowerCase()

  // }

  onClick(){
    }

  applyFilter(filterValue: any){

    this.dataSource.filter = filterValue.target.value.trim().toLowerCase()

  }

  calcunits(mtrCurrentReading: any){
    this.currentmeterreading = mtrCurrentReading.value
    console.log("current meter reading is -----",mtrCurrentReading.value)
    console.log("the new current meter reading is -----",mtrCurrentReading.value)
    console.log("previous meter reading is", Number(this.previousmeterreading))
    console.log("math is -----------",parseInt(this.currentmeterreading)-parseInt(this.previousmeterreading))
    console.log(typeof Number(this.previousmeterreading))
    console.log(typeof Number(this.currentmeterreading))
    this.mtrUnits = Number(this.currentmeterreading)-Number(this.previousmeterreading)
    console.log("meter units is -----", this.mtrUnits)
    console.log(typeof this.mtrUnits)
    
  }

  // onSearch(search : NgModel){
  //     console.log(search.value)
  //     const name = search.value
  //     const url = environment.base_url+'/user/fetchUser.action?criteria=usrFirstName&txtSearch='+name

  //     console.log(url)

  //     this.http.post(url, {} ,{
  //       headers : new HttpHeaders({
  //           'content-type': 'application/x-www-form-urlencoded'
  //       })
  //   } ).subscribe(
  //         (resData: any) => {
  //             console.log(resData.data.result)
  //             this.isLoading = true
  //             this.dataSource = new MatTableDataSource(resData.data.result);
  //             this.dataSource.paginator = this.paginator;
  //             this.dataSource.sort = this.sort;
  //         } )
  //   search.reset()
  //   }

onZone(zone: any){
  console.log(zone.viewModel)
  this.znId = zone.viewModel

  this.http.post(environment.base_url+'/account/fetchRoutes.action?zn_id='+this.znId+'&criteria=&txtSearch=', {} ,{
    headers : new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded'
    })
} ).subscribe(
      (resData: any) => {
          console.log(resData.data.result)
          this.isLoading = true
          this.routes = resData.data.result
      })

  // http://188.166.29.198:8080/DEMO/account/fetchRoutes.action
  this.routedisable = true

  // /account/fetchMeterReadingException.action?criteria='+this.selecteditem+'&txtSearch='+name+'&zn_id=&sc_id=&rt_id=&mtrType=
    }


  oZone(zone: any){
      console.log(zone.viewModel)
      this.znId = zone.viewModel
    
      this.http.post(environment.base_url+'/account/fetchRoutes.action?zn_id='+this.znId+'&criteria=&txtSearch=', {} ,{
        headers : new HttpHeaders({
            'content-type': 'application/x-www-form-urlencoded'
        })
    } ).subscribe(
          (resData: any) => {
              console.log(resData.data.result)
              this.isLoading = true
              this.routes = resData.data.result
          })
    
      // http://188.166.29.198:8080/DEMO/account/fetchRoutes.action
      
    
      this.http.post(environment.base_url+'/account/fetchMeterReadingException.action?criteria=&txtSearch=&zn_id='+this.znId+'&sc_id=&rt_id=&mtrType=', {} ,{
        headers : new HttpHeaders({
            'content-type': 'application/x-www-form-urlencoded'
        })
    } ).subscribe(
          (resData: any) => {
            this.dataSource = new MatTableDataSource(resData.data.result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
    
      // /account/fetchMeterReadingException.action?criteria='+this.selecteditem+'&txtSearch='+name+'&zn_id=&sc_id=&rt_id=&mtrType=
        }




onRoute(route: any){
      // http://188.166.29.198:8080/DEMO/account/fetchAllZones.action?scId=13
      
      console.log(route)
      this.routesSelected = route


    }




    oRoute(route: any){

      this.rtId = route.viewModel
      this.http.post(environment.base_url+'/account/fetchMeterReadingException.action?criteria=&txtSearch=&zn_id='+this.znId+'&sc_id=&rt_id='+this.rtId+'&mtrType=', {} ,{
        headers : new HttpHeaders({
            'content-type': 'application/x-www-form-urlencoded'
        })
    } ).subscribe(
          (resData: any) => {
            this.dataSource = new MatTableDataSource(resData.data.result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
          
          // http://188.166.29.198:8080/DEMO/account/fetchAllZones.action?scId=13
          
          
    
    
        }

onSubmit(form : NgForm){

  console.log(form.value)

  this.http.post(environment.base_url+'/account/final_approvalMeterException.action?mtrId_id='+this.exception_details.mtrId+'&mRemarks_2='+form.value.mtrRemarks+'&mtrUnitsId_id='+this.mtrUnits.toString()+'&accNumber_id='+form.value.accNumber+'&mtrCurrentReading_id='+this.currentmeterreading+'&mtrType_id='+form.value.billingtype+'&mtrReadingType_id='+form.value.mtrReadingType+'&accStatusCode='+this.exception_details.cAccountStatus+'&estimatedUnits='+form.value.cEstimatedBal+'&queue_to_Inspection_id=false', {} ,{
    headers : new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded'
    })
} ).subscribe(
      (resData: any) => {
          if (resData.messages.message == "RECORD UPDATED SUCCESSFULLY"){
            this.message = "Exception successfully Approved"
            alert(this.message)
            form.reset()
            this.router.navigate(['/admin/meter-readings/exceptions'])
            this.http.post(environment.base_url+'/account/fetchMeterReadingException.action?criteria=&txtSearch=&zn_id=&sc_id=&rt_id=&mtrType=&limit=100', {} ,{
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
                    this.dataSource.paginator = this.paginator
                    this.dataSource.sort = this.sort
                    this.rowitems = resData.data.total
                    
                  }
                // }
                )


            
          }
          else {
            this.message = "unable to approve Exception"
            alert(this.message)
          }
          
      } )
}

onSearch(search : NgModel){
  console.log(search.value)
  const name = search.value
  const url = environment.base_url+'/account/fetchMeterReadingException.action?criteria='+this.selecteditem+'&txtSearch='+name+'&zn_id=&sc_id=&rt_id=&mtrType='

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
  const bsModalRef = this.dialog.open(ImagePreviewComponent, {
    data : {imageSrc : imageSrc},
    height: '400px',
    width: '400px',
  })
}




}
