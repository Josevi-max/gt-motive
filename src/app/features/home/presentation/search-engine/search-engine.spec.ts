import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEngine } from './search-engine';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('SearchEngine', () => {
  let component: SearchEngine;
  let fixture: ComponentFixture<SearchEngine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchEngine],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient()
      ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchEngine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
