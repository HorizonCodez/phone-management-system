import { Component, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-view-listing',
  templateUrl: './view-listing.component.html',
  styleUrls: ['./view-listing.component.scss'],
})
export class ViewListingComponent implements OnInit {
  images: GalleryItem[] = [];
  item: any;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
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

  ngOnInit(): void {
    this.images = [
      new ImageItem({
        src: 'data:image/jpeg;base64,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',
        thumb:
          'data:image/jpeg;base64,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',
      }),
      new ImageItem({
        src: 'data:image/jpeg;base64,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',
        thumb:
          'data:image/jpeg;base64,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',
      }),
    ];
  }
}
