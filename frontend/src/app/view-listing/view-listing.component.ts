import { Component, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-view-listing',
  templateUrl: './view-listing.component.html',
  styleUrls: ['./view-listing.component.scss'],
})
export class ViewListingComponent implements OnInit {
  images: GalleryItem[] = [];
  item: any;

  qty: number = 1;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    activatedRoute.paramMap.subscribe((params) => {
      this.http
        .get<any>(`${environment.apiUrl}/item/${params.get('id')}`)
        .subscribe((res) => {
          console.log(res);
          this.item = res;
          this.images = res.itemImages.map(
            (img: any) =>
              new ImageItem({
                src: img.image.url,
                thumb: img.image.url,
              })
          );
        });
    });
  }

  ngOnInit(): void {}

  buyNow(): void {
    this.router.navigate([`/create-order/${this.item.id}`], {
      queryParams: { qty: this.qty },
    });
  }
}
