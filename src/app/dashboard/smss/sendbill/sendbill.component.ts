import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sendbill',
  templateUrl: './sendbill.component.html',
  styleUrls: ['./sendbill.component.css']
})
export class SendbillComponent implements OnInit {

  channels = ["SMS","EMAIL"]
  sendtypes = ["SCHEME","ZONE","ROUTE","ALL"]

  senders = ["SYSTEM USERS","CUSTOMERS"]
  usertypes = ["ALL","USER","SUPERVISOR","DEPARTMENT","GROUP"]
  taskassignments = ["SCHEME","ZONE","ROUTE","ACCOUNT","ALL CUSTOMERS/USERS","MULTIPLE-ACCOUNTS","MULTIPLE-ACCOUNTS","MULTIPLE-REGIONS","COMMITTMENTS"]
  campaigntypes = ["SMS","EMAIL","SMS & EMAIL"]
  schemes : any[]
  zones : any[]
  scId: any;
  zonedisable = false;
  znId: any;
  routes: any[];
  routedisable = false;
  routesSelected: any;
  isLoading = false;
  message = "" 
  periods: any[];
  selectroute = false
  selectzone = false
  selectscheme = false

  constructor( private http : HttpClient, private router : Router) { }

  ngOnInit(): void {
    this.http.post(environment.base_url+'/msg/fetchScheme.action?scId=&query=', {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
            console.log(resData.data.result)
            this.schemes = resData.data.result
        })

    this.http.post(environment.base_url+'/account/fetchPeriods.action', {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
            console.log(resData.data.result)
            this.periods = resData.data.result
        })
  }

  onSubmit(form: NgForm){
    console.log(form.value)

    const url = environment.base_url+'/msg/savemsgQueue.action?msgId_id=&code_id=&msgUsrId_id=&msgCreatedDate_id=&msgStatus_id=&msgDeliveredDate_id=&msgSubMobileNo_id=&msgmsg_id='

    this.http.post(url, {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
            console.log(resData.data.result)
            // if (resData.success == false){
            //   this.router.navigate(['/login.action'])
            // }
            // else {
            this.message = resData.messages.message
        // }
      })
    form.reset()
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
            this.zones = resData.data.result
        })
    // http://188.166.29.198:8080/DEMO/account/fetchAllZones.action?scId=13

    this.zonedisable = true
    
  }

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
            this.routes = resData.data.result
        })
  
    // http://188.166.29.198:8080/DEMO/account/fetchRoutes.action
    this.routedisable = true
      }

      onRoute(route: any){
  
        
        // http://188.166.29.198:8080/DEMO/account/fetchAllZones.action?scId=13
        
        console.log(route)
        this.routesSelected = route

  
  
      }

      onTask(task : any){
        const Task = task.viewModel
        switch (Task.toUpperCase()) {
          case "SCHEME":
            this.selectscheme = true
            break;
          case "ZONE":
            this.selectzone = true
            break;
          case "ROUTE":
            this.selectroute = true
            break;
          default:
            console.log("doesnt exist")
    
        }
      }

}
