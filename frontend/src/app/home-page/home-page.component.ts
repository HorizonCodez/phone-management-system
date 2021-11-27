import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  items: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    activatedRoute.queryParamMap.subscribe((query) => {
      let url = `${environment.apiUrl}/item?`;
      if (query.has('search')) {
        url += `search=${query.get('search')}`;
      }
      http.get<any[]>(url, { withCredentials: true }).subscribe((data) => {
        this.items = data;
        console.log(data);
      });
    });
  }

  ngOnInit(): void {}
}
