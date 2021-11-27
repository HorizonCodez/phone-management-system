import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopOrdersPageComponent } from './shop-orders-page.component';

describe('ShopOrdersPageComponent', () => {
  let component: ShopOrdersPageComponent;
  let fixture: ComponentFixture<ShopOrdersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopOrdersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopOrdersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
