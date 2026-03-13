import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-brand-card',
  imports: [MatCardModule, MatButtonModule,MatIconModule, RouterLink],
  templateUrl: './brand-card.html',
  styleUrl: './brand-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandCard {
  @Input() brandName: string = '';
  @Input({required: true}) brandId!: number;
}
