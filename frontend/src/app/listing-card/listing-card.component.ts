import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.scss'],
})
export class ListingCardComponent implements OnInit {
  @Input()
  id?: number;

  @Input()
  title?: string;

  @Input()
  price?: number;

  @Input()
  imgSrc?: string;

  @Input()
  shopName?: string;

  constructor() {}

  ngOnInit(): void {}
}
