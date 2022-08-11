import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-card-living',
  templateUrl: './card-living.component.html',
  styleUrls: ['./card-living.component.scss']
})
export class CardLivingComponent implements OnInit {
  
  @Input() product;
  divShow: boolean = false;

  constructor(
    public global: GlobalService
  ) { }

  ngOnInit(): void {
 /*    this.product.sizes.array.forEach(element => {
      element.price = parseFloat(element.price);
      element.discount? parseFloat(element.price) : null
      return element
    }); */

  }

}
