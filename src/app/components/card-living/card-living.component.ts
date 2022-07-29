import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-living',
  templateUrl: './card-living.component.html',
  styleUrls: ['./card-living.component.scss']
})
export class CardLivingComponent implements OnInit {
  
  @Input() product;
  divShow: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log(this.product)
  }

}
