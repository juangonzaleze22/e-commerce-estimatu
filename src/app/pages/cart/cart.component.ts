import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  
  customOptions: OwlOptions = {
    loop: true,
    dots: false,
    margin: 15,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 5
      },
      940: {
        items:6
      }
    },
    nav: false
  }

  constructor() { }

  ngOnInit(): void {
  }

}
