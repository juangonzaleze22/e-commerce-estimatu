import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(
    private global: GlobalService,
    private router: Router
  ) { }

  getAllWishList() {
    return this.global.getService('wishList');
  }

  addProductWishList(id) {

    let data = {
      idProduct: id
    }
    return this.global.postService('wishList/addProduct', data);

  }
}
