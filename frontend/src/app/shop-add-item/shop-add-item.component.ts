import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-add-item',
  templateUrl: './shop-add-item.component.html',
  styleUrls: ['./shop-add-item.component.scss'],
})
export class ShopAddItemComponent implements OnInit {
  images: string[] = [];
  private imageSrcArr: any[] = [];
  isLoading: boolean = false;

  addItemForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    availableStock: new FormControl(0, [
      Validators.required,
      Validators.min(0),
    ]),
    image: new FormControl(''),
  });

  get f() {
    return this.addItemForm.controls;
  }

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  onFileChange(event: any) {
    if (event.target.files && event?.target?.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const file = event.target.files[i];
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.push(event.target.result);
        };
        reader.readAsDataURL(file);
        this.imageSrcArr.push(file);
      }
    }
  }

  submit() {
    this.addItemForm.markAsDirty();
    if (this.addItemForm.valid) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('title', this.addItemForm.value.title);
      formData.append('description', this.addItemForm.value.description);
      formData.append('price', this.addItemForm.value.price);
      formData.append('availableStock', this.addItemForm.value.availableStock);

      this.imageSrcArr.forEach((image) => {
        formData.append('images', image);
      });

      this.http
        .post(`${environment.apiUrl}/item/create`, formData, {
          withCredentials: true,
        })
        .subscribe(
          (res: any) => {
            this.isLoading = false;
            this.router.navigate(['/view-listing/' + res.id]);
          },
          (err) => {
            this.isLoading = false;
            console.log(err);
          }
        );
    }
  }
}
