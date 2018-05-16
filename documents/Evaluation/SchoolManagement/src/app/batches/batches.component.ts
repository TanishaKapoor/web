import { Component, OnInit } from '@angular/core';
import { BatchService } from "./batch.service";
import { IBatch } from "./batch";

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent implements OnInit {

  constructor(private service:BatchService) { }
  batchList:IBatch[]=[];

  ngOnInit() {
    this.service.getBatches()
    .subscribe((event:IBatch[])=>{
      this.batchList=event;
    })
  }

}
