import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: false,
    dots: false,
    nav: false,
    margin: 15
  }

  constructor() { }

  ngOnInit(): void {
  }

}
