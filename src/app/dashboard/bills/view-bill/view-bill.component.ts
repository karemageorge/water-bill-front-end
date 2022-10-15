import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.css']
})
export class ViewBillComponent implements OnInit {

  row: any
  constructor(private router : Router) { 
    this.row = this.router.getCurrentNavigation()?.extras
    console.log(this.row)
  }

  ngOnInit(): void {
    
  }
  
  doAction(action : string){
    console.log(action)
  }
}
