import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GlobalService } from 'src/app/services/global.service';
import { trigger, transition, style, animate } from '@angular/animations';

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

  isOpen = false;

  arrows = {
    left: "<img class='img-fluid' src='../assets/images/icon/bx-chevron-left.svg'>",
    right: "<img class='img-fluid' src='../assets/images/icon/bx-chevron-right.svg'>"
  }

  dropItem;

  customOptions: OwlOptions = {
    loop: true,
    dots: false,
    pullDrag: false,
    navText: [this.arrows.left, this.arrows.right],
    nav: true,
    margin:10,
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

  constructor(
    public global: GlobalService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCategories()


  }

  getCategories() {

    console.log(this.global.IdAmin)

    let admin = {
      client: true
    }


    this.global.postService('categories/', admin).subscribe(response => {
      if (response['status'] === 'success') {

        this.categories = response['data']/* .filter(item => {
          return item.userId == this.global.IdAmin
        }) */.map(item => {

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

  closeDropdown() {
    this.dropItem = {}
  }

}
