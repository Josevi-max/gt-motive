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
  
  it('should have default empty brandName', () => {
    expect(component.brandName).toBe('');
  });

  it('should accept brandName as input', () => {
    const testBrandName = 'Toyota';

    component.brandName = testBrandName;
    fixture.detectChanges();

    expect(component.brandName).toBe(testBrandName);
  });

  it('should update when brandName changes', () => {
    component.brandName = 'Honda';
    fixture.detectChanges();
    expect(component.brandName).toBe('Honda');

    component.brandName = 'Ford';
    fixture.detectChanges();
    expect(component.brandName).toBe('Ford');
  });

  it('should handle empty string as brandName', () => {
    component.brandName = '';
    fixture.detectChanges();
    expect(component.brandName).toBe('');
  });
});
