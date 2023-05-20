import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: '<div>Testing</div>',
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class AppComponent {
  constructor(titleService: Title) {
    const title = 'Pokemon Signal Demo 3';
    titleService.setTitle(title);
  }
}
