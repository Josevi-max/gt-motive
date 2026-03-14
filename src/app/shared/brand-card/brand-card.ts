import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '../../core/utils/pipes/truncate-pipe';
@Component({
  selector: 'app-brand-card',
  imports: [MatCardModule, MatButtonModule,MatIconModule, RouterLink, TruncatePipe],
  templateUrl: './brand-card.html',
  styleUrl: './brand-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandCard {
  @Input() brandName: string = '';
  @Input() link: (string | number)[] = [];
}
