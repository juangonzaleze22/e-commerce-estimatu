import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import {trigger, transition, style, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('1s ease-out',
              style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('.25s ease-in',
              style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})

export class ProductsListComponent implements OnInit {

  products = [];
  loading: boolean = false;

  page: number = 1;
  limit: number = 9;
  category;

  constructor(
    public global: GlobalService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.snapshot.paramMap.get('categoria')

    this.route.params.subscribe(params => {
      params? this.category = params.categoria : null
      this.page = 1;
      this.products = []
      this.getAllProdutcs();
    })
  }

  getAllProdutcs(){
    this.loading = true;
    const data = { 
      page: this.page,
      limit: this.limit,
      category: this.category
    }

    this.global.postService("products/", data, 1).subscribe(response => {
      this.loading = false;
      if (response['status'] === 'success') {


        if (this.products.length === 0) {
          this.products = response['data']
        }else{ 
          let currentData = this.products;
          const newData = response['data'];
          this.products = currentData.concat(newData);
        }
        
        console.log("dataaa", this.products)
      }
    }, err => {
      console.log(err)
      /* this.toastr.show("Error", err) */
    })

  }

  onScrollDown() {
    console.log('scrolled down!!');
    this.page++
    this.getAllProdutcs();
  }


}
