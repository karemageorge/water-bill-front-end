import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  enablelist = ["YES","NO"]
  roles = ["ADMIN","USER"]

  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(f : NgForm){
    console.log(f.value)
  }

}
