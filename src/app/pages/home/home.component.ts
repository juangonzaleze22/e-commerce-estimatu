import { Component, OnInit,HostListener } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GlobalService } from 'src/app/services/global.service';
import { format, parseISO, addDays  } from 'date-fns'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products;

  responsiveItems;
  tabs = 1;

  categories = [
    {
      title: "Living Room",
      image: "assets/images/home/categories/category-1.png",
    },
    {
      title: "Living Room",
      image: "assets/images/home/categories/category-2.png",
    },
    {
      title: "Living Room",
      image: "assets/images/home/categories/category-3.png",
    },
    {
      title: "Living Room",
      image: "assets/images/home/categories/category-4.png",
    }
  ]

  /* instagram */

  customOptions: OwlOptions = {
    loop: true,
    dots: false,
    navSpeed: 700,
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
        items:8
      }
    },
    nav: false
  }


  constructor(
    private global: GlobalService
  ) { }

  ngOnInit(): void {
    const width = window.innerWidth; 
     if (width < 580) {
      this.responsiveItems = 2;
    } else if (width < 992) {
      this.responsiveItems = 3;
    }else if (  1200 < width ) {
      this.responsiveItems = 4;
    } 

    this.getAllProdutcs();
  } 

  selectTabs(id, event){
  event.preventDefault();
    this.tabs = id;
  }

  getAllProdutcs(){ 

    this.global.postService('products/', {}).subscribe(response => { 
      if(response['status'] === 'success'){
        this.products = response['data'];
      }
    })

  }
}
