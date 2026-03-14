import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Spinner } from './shared/spinner/spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header, Spinner],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('gt-motive');
}
