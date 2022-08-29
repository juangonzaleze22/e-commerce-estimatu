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
  copyProduct;
  myFormAddProduct: FormGroup;
  loading: boolean = false;


  selectedPrice;
  customPrice;
  customSizeValue;

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
      size: this.fb.array,
      quantity: [1, [Validators.min(0)]],
      height: [ ,[Validators.min(0)]],
      width: [ ,[Validators.max(1000)]],
    });


    this.myFormAddProduct.valueChanges.subscribe(selectedValue => {

      const { height, width } = selectedValue;

      this.customSizeValue = {
        width, height
       }
      const products = Object.assign({}, this.copyProduct)

      this.customPrice = height && width ? (parseFloat(height) * parseFloat(width)) * this.global.priceInchesWallpaper : null;
      this.customPrice = this.customPrice * selectedValue.quantity;

      this.product.sizes = products.sizes.map(prod => {
        prod.price * selectedValue.quantity
        return { ...prod, price: prod.price * selectedValue.quantity }
      })
    });

    console.log(this.customSizeValue)

  }


  getProduct() {
    this.loading = true;
    const idProduct = this.route.snapshot.paramMap.get('idProduct');
    const idPrice = this.route.snapshot.paramMap.get('idPrice');

    let data = {
      idProduct
    }

    this.global.postService('products/getProductById', data).subscribe(response => {
      this.loading = false;
      console.log(response)
      if (response['status'] === 'success') {
        this.product = response['data'];
        this.copyProduct = Object.assign({}, this.product);

        const selectFilter = this.product.sizes.filter(price => price.id == idPrice);

        this.selectedPrice = selectFilter[0] || this.product.sizes[0];

      }
    })

  }

  get quantity() {
    return this.myFormAddProduct.controls['quantity'].value;
  }


  onSelectedPrice(value) {
    this.selectedPrice = value
  }

  onSubmit() {
    /* if (!this.myFormProducts.invalid) {
    
    } */
  }

  selecteChangePrice(){ 
    this.selectedPrice = this.product.sizes.find(prod => { 
      return prod.id == this.selectedPrice.id
    })
  }

  InchesToFoot(value) { 
    let result = (0.083333333 * value) / 1;
    result.toFixed(2)
    return Number(result.toFixed(2));
  }

}
