import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<div>testing</div>`,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {
  title = 'Pokemon Signal Demo 2';
  constructor(titleService: Title) {
    const title = 'Pokemon Signal Demo 2';
    titleService.setTitle(title);
  }
}
