import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product;
  loading: boolean = false;

  customOptions: OwlOptions = {
    loop: false,
    dots: false,
    nav: false,
    margin: 15
  }

  constructor(
    public global: GlobalService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.loading = true;
    const idProduct = this.route.snapshot.paramMap.get('idProduct');

    let data = {
      idProduct
    }

    this.global.postService('products/getProductById',data).subscribe(response => {
      this.loading = false;
      console.log(response)
      if(response['status'] === 'success'){
        this.product = response['data'];
      }
    })
  }

}
