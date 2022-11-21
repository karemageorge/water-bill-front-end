import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, NgForm, NgModel } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormValues } from '../formvalue.model';
import { customer } from '../customer.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  dataSource : any
  message = ""
  next = false

  isLoading = false
  cAccId : any

  accounts = ["NEW-ACCOUNT","METER-SEPARATION","L.I.C"]

  customerData : customer

  firstLast : string
  displayedColumns : string[] = ["id","name","kraPin","CustType","Scheme","Zone","Route","cAccountStatus","cMobileNumber","cMtrNo","cAccBal","bal_previous_meter_reading"]
  customername : any = ""

  constructor(private dialog : MatDialog,private http: HttpClient, private _formBuilder: FormBuilder, private router : Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.cAccId = this.route.snapshot.paramMap.get('id')
    console.log(this.cAccId)

    const url = environment.base_url+'/account/fetchCustomersAccounts.action?customerId='+this.cAccId+'&includePendingPaymentAccounts_id=true&includeClosedAccounts_id=true'

    console.log(url)

    this.http.post(url, {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
            console.log(resData.data.result)
            this.customerData = resData.data.result[0]
            // this.isLoading = true
            
        } )
  }



  onSubmit(f : NgForm){
    // this.isLoading = true
    console.log(f.value)
    this.isLoading = true
    const form: FormValues = f.value
    const url = environment.base_url+'/account/saveCustomer.action?customerId_id='+this.customerData.customerId+'&v_code_version=07-2021-07-15-9681&custSurvey_id=&customerName_id='+this.customerData.customerName+'&alternateAccount_id=&landlordName=&landlordTelephone=&landlordEmail=&customerSubType_id=&customer_lat=&customer_long=&customer_mob_phone_id='+this.customerData.customerMobPhone+'&customerStatus_id='+this.customerData.customerStatus+'&custMeterStatus_id='+this.customerData.custMeterStatus+'&customer_zn_id_id='+this.customerData.customerZnId+'&customer_rt_id_id='+this.customerData.vRtId+'&subzone_id=&custNszId_id=&custStreet_id='+f.value.physicaladdress+'&custLandNo_id=&custBuildingName_id=&customer_email_id=&custPostalAddress_id=&custPostalCode_id=&custCity_id=&custNationalId_id='+f.value.passportnumber+'&custFormSerialNo_id='+this.customerData.custFormSerialNo+'&c_mtr_size_id='+this.customerData.custMtrSize+'&kra_pin_id='+f.value.krapin+'&customersurv_balance_bf=&customersurvFittingsFee_id=&parent_id_account=&deposit_id='+f.value.Deposit+'&c_opening_reason_name='+f.value.account+'&connection_fee_id=&c_conservancy_id=&meter_sale_id=&labour_id=&application_fee_id=&c_mtr_no_id=&pipeId=&invoId_id=&invoAmount_id=&cAccId_id=&cCustId_id=&defaultAccNumber_id='

    console.log('url is ----------------------------'+url)

    this.http.post(url, {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
            console.log(resData)
            // if (resData.success == false){
            //   this.isLoading = false
            //   this.router.navigate(['/login.action'])
            // }
            // else {
            this.isLoading = false
            console.log("resdata message response is ---- ",resData.messages?.message)
            this.message = resData.messages.message
            console.log("this message is ", this.message)
            
            }
            // this.isLoading = false
        // } 
        )
  f.reset()
}




}
