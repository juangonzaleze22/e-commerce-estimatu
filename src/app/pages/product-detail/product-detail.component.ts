import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import { GlobalService } from 'src/app/services/global.service';
import { WishListService } from 'src/app/services/wish-list.service';

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
  showMore: boolean = false;


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
    private router: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder,
    private carService: CarService,
    private toastr: ToastrService,
    private wishListService: WishListService
  ) { }

  ngOnInit(): void {
    this.getProduct();
    this.myFormAddProduct = this.fb.group({
      size: this.fb.array,
      quantity: [1, [Validators.min(0)]],
      height: [, [Validators.min(0)]],
      width: [, [Validators.max(1000)]],
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

    this.router.params.subscribe(() => {
      this.getProduct();
    })
  }


  getProduct() {
    this.loading = true;

    const idProduct = this.router.snapshot.paramMap.get('idProduct');
    const idPrice = this.router.snapshot.paramMap.get('idPrice');

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

  selecteChangePrice() {
    this.selectedPrice = this.product.sizes.find(prod => {
      return prod.id == this.selectedPrice.id
    })
  }

  InchesToFoot(value) {
    let result = (0.083333333 * value) / 1;
    result.toFixed(2)
    return Number(result.toFixed(2));
  }

  addProduct() {
    let dataCarSelected = {
      ...this.product,
      selectedSize: this.selectedPrice,
      customPrice: this.customPrice,
      quantity: this.quantity
    }

    this.carService.addElementToCar(dataCarSelected);
    console.log(dataCarSelected)
    this.toastr.show("Product added to cart")
  }

  addWhiteList(id: string) {
    /*  this.WishListService.addProductWhiteList(id) */
    const isLogged = this.global.isLogged();

    if (!isLogged) {
      this.toastr.show("Please log in before adding to wish list")
      this.route.navigate(['/login']);
      return
    }

    this.wishListService.addProductWishList(id).subscribe(result => {
      console.log(result)
    })
  }

}
