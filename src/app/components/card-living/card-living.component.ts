import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-card-living',
  templateUrl: './card-living.component.html',
  styleUrls: ['./card-living.component.scss']
})
export class CardLivingComponent implements OnInit {

  @Input() product;
  @Output() carProduct = new EventEmitter;

  divShow: boolean = false;

  constructor(
    public global: GlobalService,
  ) { }

  ngOnInit(): void {

  }

  addProduct(product: any) {
    this.carProduct.emit(product)
  }

}
