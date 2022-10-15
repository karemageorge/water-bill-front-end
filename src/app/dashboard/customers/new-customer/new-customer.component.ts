import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { FormValues } from '../formvalue.model';


@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  accounts = ["NEW-ACCOUNT","METER-SEPARATION","L.I.C"]
  chargesList = ["Bill Sewer Only","Sewer","Meter Rent","Refuse","Conservancy"]

  customertypes : any[]
  statuss : any[] = ["PENDING-PAYMENT","ACTIVE","DISCONNECTED","TERMINATED","INACTIVE","NEW"]
  MeterStatuss : any[] = ["METERED","UNMETERED"]
  isLoading= false;
  zones: any;
  zonedisable: boolean;
  routes: any;
  routedisable: boolean;
  routesSelected: any;
  schemes : any[]
  othercharges : any[] = ["Sewer","Meter Rent","Refuse"]
  metersizes : any[] = ["0.5","0.75","1","1.5","2","2.5","3","4","6","7","8"]
  message = ""
  cutCode: any;
  scId: any
  znId : any
  billstatus=""
  sewerstatus=""
  refusestatus=""
  conservancystatus=""


  constructor(private http : HttpClient) { }

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

    
    this.http.post(environment.base_url+'/account/fetchCustomerType.action', {} ,{
          headers : new HttpHeaders({
              'content-type': 'application/x-www-form-urlencoded'
          })
      } ).subscribe(
            (resData: any) => {
                console.log(resData.data.result)
                
                this.customertypes = resData.data.result
            })

    
    
  }

  onSubmit(f : NgForm){
      this.isLoading = true
      console.log(f.value)
      const form: FormValues = f.value

      if (f.value.othercharges.includes('Bill Sewer Only')){
        this.billstatus = 'on'
      }
      if (f.value.othercharges.includes('Sewer')){
        this.sewerstatus = 'on'
      }
      if (f.value.othercharges.includes('Refuse')){
        this.refusestatus = 'on'
      }
      if (f.value.othercharges.includes('Conservancy')){
        this.conservancystatus = 'on'
      }

      const url = environment.base_url+'/account/saveCustomer.action?customerId_id=&v_code_version=07-2021-07-15-9681&custSurvey_id=&customerName_id='+form.name+'&alternateAccount_id=&customerType_id='+form.customertype+'&customerSubType_id=&customer_lat=&customer_long=&customer_mob_phone_id='+form.phonenumber+'&customer_landlord_email=&customerStatus_id='+form.status+'&custMeterStatus_id='+form.MeterStatus+'&acDormantStatus_id=&customer_zn_id_id='+this.znId+'&customer_rt_id_id='+this.routesSelected+'&subzone_id=&custNszId_id=&custStreet_id='+form.physicaladdress+'&custLandNo_id=&custBuildingName_id=&customer_email_id=&custPostalAddress_id=&custPostalCode_id=&custCity_id=&custNationalId_id='+form.passportnumber+'&custFormSerialNo_id=&c_mtr_size_id='+form.metersize+'&kra_pin_id='+form.krapin+'&deposit_id='+form.Deposit+'&landlord_mobile=&connection_fee_id='+form.Connectionfee+'&customer_landlord_name=&meter_sale_id=&customer_pipeline_code=&labour_id='+form.Labour+'&connection_code=&c_mtr_no_id=&c_opening_reason_name='+form.openingreason+'&sewer_id='+this.sewerstatus+'&meter_rent_id=on'
      // const url = environment.base_url+`/account/saveCustomer.action?customerId_id=&v_code_version=07-2021-07-15-9681
      // &custSurvey_id=&customerName_id=`+this.name+`&alternateAccount_id=&landlordName=&landlordTelephone=%2B254708003481
      // &landlordEmail=georgekarema%40gmail.com&customerType_id=3&customerSubType_id=&customer_lat=&customer_long=
      // &customer_mob_phone_id=%2B254708003481&customerStatus_id=ACTIVE&custMeterStatus_id=METERED&customer_zn_id_id=78&customer_rt_id_id=175
      // &subzone_id=&custNszId_id=&custStreet_id=3278&custLandNo_id=`+this.landno+`&custBuildingName_id=&customer_email_id=&custPostalAddress_id=&custPostalCode_id=
      // &custCity_id=&custNationalId_id=30579084&custFormSerialNo_id=&c_mtr_size_id=`+this.metersize+`&kra_pin_id=`+this.krapin+`&customersurv_balance_bf=&customersurvFittingsFee_id=
      // &parent_id_account=&deposit_id=`+this.Deposit+`&c_opening_reason_name=NEW-ACCOUNT&connection_fee_id=&c_conservancy_id=&meter_sale_id=&labour_id=&application_fee_id=
      // &c_mtr_no_id=&pipeId=&invoId_id=&invoAmount_id=&cAccId_id=&cCustId_id=&defaultAccNumber_id=&c_sewer_only_id=on&sewer_id=on&meter_rent_id=on`

      console.log('url is ----------------------------'+url)

      this.http.post(url, {} ,{
        headers : new HttpHeaders({
            'content-type': 'application/x-www-form-urlencoded'
        })
    } ).subscribe(
          (resData: any) => {
              console.log(resData)
              console.log("resdata message response is ---- ",resData.messages?.message)
              this.message = resData.messages.message
              console.log("this message is ", this.message)
              this.isLoading = false
          } )
    f.reset()
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

}
