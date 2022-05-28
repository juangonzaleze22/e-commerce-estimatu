import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-category',
  templateUrl: './card-category.component.html',
  styleUrls: ['./card-category.component.scss']
})
export class CardCategoryComponent implements OnInit {

  @Input() title: string;
  @Input() image: string;

  constructor() { }

  ngOnInit(): void {
  }

}
