import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  pageTitle="Upcoming Batches";
  constructor() { }
  upcoming_batches:string[];
  ngOnInit() {
    this.upcoming_batches=["Music August Batch","Summer Drawing Batch","Maths Summer Fall"]
  }

}
