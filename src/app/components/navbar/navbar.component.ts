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

  getCategories(){
    this.global.postService('categories/', {}).subscribe(response => { 
      if(response['status'] === 'success'){
        this.categories = response['data'];
      }
    })
  }

}
