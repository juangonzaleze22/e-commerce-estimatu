import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  categories;

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

        console.log(this.categories)
      }
    })
  }

  getdataSubcategories(idCategory: string) {

    let data = {
      idCategory
    }

    this.global.postService('categories/', data).subscribe(response => {
      console.log("subcategory", response)
      /* return response; */
    })
  }

  newDate() {

  }

}
