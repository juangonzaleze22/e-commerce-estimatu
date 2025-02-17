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

  productDiscount;
  productNews;
  categories;

  responsiveItems;
  tabs = 1;

/*   categories = [
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
  ] */

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

    this.getProductsDiscount();
    this.getAllProductsNews();
    this.getCategories();
  } 

  selectTabs(id, event){
  event.preventDefault();
    this.tabs = id;
  }

  getProductsDiscount(){ 

    let data = { 
      limit: 8
    }

    this.global.postService('products/getProductDiscount', data).subscribe(response => { 
      if(response['status'] === 'success'){
        this.productDiscount = response['data'];
      }
    })

  }

  getAllProductsNews(){ 

    let data = { 
      limit: 8
    }

    this.global.postService('products/getAllProductsNews', data).subscribe(response => { 
      if(response['status'] === 'success'){
        this.productNews = response['data'];
      }
    })

  }

  getCategories(){ 

    let data = { 
    }

    this.global.postService('categories/', data).subscribe(response => { 
      if(response['status'] === 'success'){
        this.categories = response['data']
       /* this.categories = resultCategories */
      }
    })

  }


  getPriceDiscount(sizes){
    let selectPrice;
    sizes.some(size => { 
      if (size.discount){
        selectPrice = size;
        return size
      }
    })
    return selectPrice
  }
}
