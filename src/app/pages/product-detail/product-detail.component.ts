import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
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
  myFormAddProduct: FormGroup;
  loading: boolean = false;
  selectedPrice;

  customOptions: OwlOptions = {
    loop: false,
    dots: false,
    nav: false,
    margin: 15
  }

  constructor(
    public global: GlobalService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getProduct();
    this.myFormAddProduct = this.fb.group({
      size: [],
      quantity: [1],
    });
  }

  getProduct() {
    this.loading = true;
    const idProduct = this.route.snapshot.paramMap.get('idProduct');
    const idPrice = this.route.snapshot.paramMap.get('idPrice');

    let data = {
      idProduct
    }

    this.global.postService('products/getProductById',data).subscribe(response => {
      this.loading = false;
      console.log(response)
      if(response['status'] === 'success'){
        this.product = response['data'];

        const selectFilter = this.product.sizes.filter(price => price.id == idPrice );

        this.selectedPrice = selectFilter[0] || this.product.sizes[0];
        this.myFormAddProduct.controls['size'].setValue(this.selectedPrice);
      }
    })

  }

  get quantity() {
    return this.myFormAddProduct.controls['quantity'].value;
  }

  setInputNumber(){
    console.log(this.myFormAddProduct.value)
  }

  onSelectedPrice(value){
    this.selectedPrice = value
    console.log(this.selectedPrice)
  }

  onSubmit(){
    /* if (!this.myFormProducts.invalid) {
    
    } */
  }

  

  

}
