import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-meter-requests',
  templateUrl: './add-meter-requests.component.html',
  styleUrls: ['./add-meter-requests.component.css']
})
export class AddMeterRequestsComponent implements OnInit {
  message = ""
  domesticm = "DOMESTIC WATER"
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form2: NgForm){

  }

  onAdd(form: NgForm){

  }
}
