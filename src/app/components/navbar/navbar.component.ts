import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GlobalService } from 'src/app/services/global.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { CarService } from 'src/app/services/car.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(10px)' }),
            animate('.30s ease-out',
              style({ opacity: 1, transform: 'translateY(0)' }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1, transform: 'translateY(0)' }),
            animate('.30s ease-in',
              style({ opacity: 0, transform: 'translateY(10px)' }))
          ]
        )
      ]
    )
  ]
})
export class NavbarComponent implements OnInit {

  categories;
  listCard: Array<object> = [];
  suscription: Subscription;
  suscriptionLogged: Subscription;

  isOpen = false;

  dataUser

  arrows = {
    left: "<img class='img-fluid' src='../assets/images/icon/bx-chevron-left.svg'>",
    right: "<img class='img-fluid' src='../assets/images/icon/bx-chevron-right.svg'>"
  }
  isLogged: boolean;
  dropItem;

  customOptions: OwlOptions = {
    loop: true,
    dots: false,
    pullDrag: false,
    navText: [this.arrows.left, this.arrows.right],
    nav: true,
    margin: 10,
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
      },
      1200: {
        items: 7
      }
    },
  }

  produtcs;

  constructor(
    public global: GlobalService,
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories()
    this.getProductsByName();
    this.suscription = this.carService.array$.subscribe(res => {
      this.listCard = res
    });
    this.suscriptionLogged = this.global.isLoggedIn$.subscribe(res => {
      this.isLogged = res;
      
      this.dataUser = this.global.getUser()
      console.log(this.dataUser)
    });
    this.dataUser = this.global.getUser()


  }

  getCategories() {

    let admin = {
      client: true
    }


    this.global.postService('categories/', admin).subscribe(response => {
      if (response['status'] === 'success') {

        this.categories = response['data'].filter(item => {
          return item.userId == this.global.IdAmin
        }).map(item => {

          let data = {
            client: true,
            idCategory: item._id
          }

          this.global.postService('subcategories/getAllSubCategoryByCategory', data).subscribe(subcategories => {
            if (subcategories['status'] === 'success') {
              item.subcategories = subcategories['data']
            }
          });
          return item
        })
      }
    })
  }

  createDropdown(event, item) {
    this.dropItem = {}
    const { pageX, pageY } = event;
    this.dropItem = {
      position: {
        pageX,
        pageY
      },
      item
    }

  }

  removeItemCar(index) {
    this.listCard.splice(index, 1);
  }

  closeDropdown() {
    this.dropItem = {}
  }

  selectEvent(event) {
    const { _id, titulo } = event
    this.router.navigate(['/product-detail', _id])
  }

  getProductsByName() {
    this.global.getService('products/getCategoryForSearch').subscribe(resp => {
      console.log("response autocomplete data", resp);
      if (resp['status'] === 'success') {
        this.produtcs = resp['data']
      }
    })
  }

}
