import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  listCars;

  subscription: Subscription;


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
        items: 6
      }
    },
    nav: false
  }

  constructor(
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.subscription = this.carService.array$.subscribe(data => {
      this.listCars = data;
      console.log(this.listCars)
    })
  }


  pricePerUnit(sizes, idSelectedPrice) {
    const price = sizes.filter(size => size.id == idSelectedPrice)
    return price[0];
  }

  getTotalPrice() {
    return this.listCars.reduce((sum, i) => {
      return sum + (i.selectedSize.price * i.quantity)
    }, 0)
  }

  removeItemCar(index) {
    this.listCars.splice(index, 1);
    this.getTotalPrice();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
