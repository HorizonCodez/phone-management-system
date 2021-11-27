import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-shop-items-page',
  templateUrl: './shop-items-page.component.html',
  styleUrls: ['./shop-items-page.component.scss'],
})
export class ShopItemsPageComponent implements OnInit {
  items: any[] = [];

  constructor(private http: HttpClient) {
    http
      .get<any[]>(`${environment.apiUrl}/item/shop/my-items`, {
        withCredentials: true,
      })
      .subscribe((data) => {
        this.items = data;
        console.log(data);
      });
  }

  ngOnInit(): void {}
}
