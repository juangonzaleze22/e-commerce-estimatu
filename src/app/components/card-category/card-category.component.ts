import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-card-category',
  templateUrl: './card-category.component.html',
  styleUrls: ['./card-category.component.scss']
})
export class CardCategoryComponent implements OnInit {

  @Input() title: string;
  @Input() image: string;

  constructor(
    public global: GlobalService
  ) { }

  ngOnInit(): void {

  }

}
