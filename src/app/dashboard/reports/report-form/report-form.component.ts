import { UpperCasePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';


interface formfields {
  paramLabel: string,

}

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})



export class ReportFormComponent implements OnInit {

  id : any
  period = false
  region = false
  zone = false
  rt = false
  format = false
  user = false
  startdate = false
  enddate = false
  tasktype = false
  periods : any[]
  regions : any[]
  zones : any[]
  routes : any[]
  formats  = ["PDF","CSV"]
  users : any[]
  tasktypes : any[]
  rtid : any
  periodid : any
  regionid : any
  schemeid : any
  zoneid : any
  userid : any
  taskid : any
  formatid : any
  startdateid : any
  enddateid : any

  



  // formfield : formfields[]

  constructor(private router : Router, private route : ActivatedRoute, private dialog : MatDialog, private http: HttpClient ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id')
    console.log("this dot id is "+this.id)

    this.http.post(environment.base_url+'/myReports/fetchLovData.action?reportId='+this.id, {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
            const formfields = resData.data.result
            for (let formfield of formfields){

              switch (formfield.paramLabel.toUpperCase()) {
                case "PERIOD":
                    this.period = true
                    this.periodid = formfield.paramId
                    console.log("period id is ------------",formfield.paramId)
                    this.http.post(environment.base_url+'/myReports/fetchLovGridData.action?criteria=&txtSearch=&paramId='+formfield.paramId+'&query=', {} ,{
                        headers : new HttpHeaders({
                            'content-type': 'application/x-www-form-urlencoded'
                        })
                    } ).subscribe(
                        (resData : any ) => {
                            this.periods = resData.data.result
                        }
    
                    )
                    // http://188.166.29.198:8080/DEMO/myReports/fetchLovGridData.action?criteria=&txtSearch=&paramId=2049&query=
                    break;
                case "REGION":
                    this.region = true
                    this.regionid = formfield.paramId
                    console.log("region id is ------------",formfield.paramId)
                    this.http.post(environment.base_url+'/myReports/fetchLovGridData.action?criteria=&txtSearch=&paramId='+formfield.paramId+'&query=', {} ,{
                        headers : new HttpHeaders({
                            'content-type': 'application/x-www-form-urlencoded'
                        })
                    } ).subscribe(
                        (resData : any ) => {
                            this.regions = resData.data.result
                        }
                    )
                    // criteria=&txtSearch=&paramId=2050&query=
                    break;
                case "SCHEME":
                    this.schemeid = true
                    this.schemeid = formfield.paramId
                    console.log("scheme id is ------------",formfield.paramId)
                    this.http.post(environment.base_url+'/myReports/fetchLovGridData.action?criteria=&txtSearch=&paramId='+formfield.paramId+'&query=', {} ,{
                        headers : new HttpHeaders({
                            'content-type': 'application/x-www-form-urlencoded'
                        })
                    } ).subscribe(
                        (resData : any ) => {
                            this.regions = resData.data.result
                        }
                    )
                    // criteria=&txtSearch=&paramId=2050&query=
                    break;

                case "ZONE":
                    this.zone = true
                    this.zoneid = formfield.paramId
                    console.log("zone id is ------------",formfield.paramId)
                    this.http.post(environment.base_url+'/myReports/fetchLovGridData.action?criteria=&txtSearch=&paramId='+formfield.paramId+'&query=', {} ,{
                        headers : new HttpHeaders({
                            'content-type': 'application/x-www-form-urlencoded'
                        })
                    } ).subscribe(
                        (resData : any ) => {
                            this.zones = resData.data.result
                        }
                    )
                    break;
                case "ROUTE":
                    this.rt = true
                    this.rtid = formfield.paramId
                    console.log("route id is ------------",formfield.paramId)
                    this.http.post(environment.base_url+'/myReports/fetchLovGridData.action?criteria=&txtSearch=&paramId='+formfield.paramId+'&query=', {} ,{
                        headers : new HttpHeaders({
                            'content-type': 'application/x-www-form-urlencoded'
                        })
                    } ).subscribe(
                        (resData : any ) => {
                            this.routes = resData.data.result
                        }
                    )
                    break;
                case "FORMAT":
                    this.format = true
                    this.formatid = formfield.paramId
                    console.log("formart id is ------------",formfield.paramId)

                    
                    // this.http.post(environment.base_url+'/myReports/fetchLovGridData.action?criteria=&txtSearch=&paramId='+formfield.paramId+'&query=', {} ,{
                    //     headers : new HttpHeaders({
                    //         'content-type': 'application/x-www-form-urlencoded'
                    //     })
                    // } ).subscribe(
                    //     (resData : any ) => {
                    //         this.formats = resData.data.result
                    //     }
                    // )
                    break;
                case "USER":
                    this.user = true
                    this.userid = formfield.paramId
                    console.log("user id is ------------",formfield.paramId)
                    this.http.post(environment.base_url+'/myReports/fetchLovGridData.action?criteria=&txtSearch=&paramId='+formfield.paramId+'&query=', {} ,{
                        headers : new HttpHeaders({
                            'content-type': 'application/x-www-form-urlencoded'
                        })
                    } ).subscribe(
                        (resData : any ) => {
                            this.users = resData.data.result
                        }
                    )
                    break;
                case "START DATE":
                    this.startdate = true
                    this.startdateid = formfield.paramId
                    break;
                case "END DATE":
                    this.enddate = true
                    this.enddateid = formfield.paramId
                    break;

                case "TASK TYPE":
                    this.tasktype = true
                    this.taskid = formfield.paramId

                    console.log("task id is ------------",formfield.paramId)

                    this.http.post(environment.base_url+'/myReports/fetchLovGridData.action?criteria=&txtSearch=&paramId='+formfield.paramId+'4&query=', {} ,{
                        headers : new HttpHeaders({
                            'content-type': 'application/x-www-form-urlencoded'
                        })
                    } ).subscribe(
                        (resData : any ) => {
                            this.tasktypes = resData.data.result
                            console.log("task types are ----", this.tasktypes)
                        }
                    )
                    break;
                default:
                    console.log("No such field exists");
                    break;
            }
            }
        } 
        )
  }

  onSubmit(form : NgForm){
        var param = ""
        if (form.value.route){
            param = param + 'rpt_paramId_'+this.rtid+'='+form.value.route
            console.log("route is",param)
        }
        if (form.value.period){
            param = param + '&rpt_paramId_'+this.periodid+'='+form.value.period
            console.log("period is",param)
        }
        if(form.value.region){
            param = param + '&rpt_paramId_'+this.regionid+'='+form.value.region
            console.log("region is",param)
        }
        if(form.value.scheme){
            param = param+'&rpt_paramId_'+this.schemeid+'='+form.value.scheme
            console.log("scheme is",param)
        }
        if (form.value.zone){
            param = param + '&rpt_paramId_'+this.zoneid+'='+form.value.zone
            console.log("zone is",param)
        }
        if(form.value.user){
            param = param+'&rpt_paramId_'+this.userid+'=&'+form.value.user
            console.log("user is",param)
        }
        if (form.value.tasktype){
            param = param+'&rpt_paramId_'+this.taskid+'='+form.value.tasktype
            console.log("task type is",param)
        }
        if (form.value.startdate){
            param = param+'&rpt_paramId_'+this.startdateid+'='+form.value.startdate
            console.log("Start Date is",param)
        }
        if (form.value.enddate){
            param = param+'&rpt_paramId_'+this.enddateid+'='+form.value.enddate
            console.log("End Date is",param)
        }
        


        const reporturl = param
        console.log(form.value)
        const url = environment.base_url+'/myReports/generateReport.action?'+reporturl+'&rpt_paramId_'+this.format+'='+form.value.format+'&rptId='+this.id.replace("report_","")+'&rptIdHolder1='+this.id+'&SIGN=SPA'
        console.log("url is ---------", url)
        this.http.post(url, {} ,{
            headers : new HttpHeaders({
                'content-type': 'application/x-www-form-urlencoded'
            })
        } ).subscribe(
              (resData: any) => {
                  console.log(resData)
              } )
        form.reset()
  }

}
