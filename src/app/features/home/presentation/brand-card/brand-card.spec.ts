import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandCard } from './brand-card';
import { provideZonelessChangeDetection } from '@angular/core';

describe('BrandCard', () => {
  let component: BrandCard;
  let fixture: ComponentFixture<BrandCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandCard],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
