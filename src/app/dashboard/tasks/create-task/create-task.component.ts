import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel, Validators } from '@angular/forms';
import {FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  meterreading : any

  form = new FormGroup({
    tskType : new FormControl('', Validators.required),
    customertype : new FormControl('', Validators.required),
    startdate : new FormControl('', Validators.required),
    enddate : new FormControl('', Validators.required),
    taskAssignedTo : new FormControl('', Validators.required),
    tskAssignPer : new FormControl('', Validators.required),
    meterReadingType: new FormControl('', Validators.required),
  })

  constructor() { 
    
  }


  // get username(){
  //   return 
  // }
  ngOnInit(): void {

  }

  onSubmit(form : NgForm){
    console.log(form.value)
  }

  onSelect(option : NgModel){
    console.log(option)
    if (option.value == "MeterReading"){
      this.meterreading = option.value
    }
  }

}
