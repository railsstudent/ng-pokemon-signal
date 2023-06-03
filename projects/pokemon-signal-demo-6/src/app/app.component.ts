import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `<div>test</div>`,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class AppComponent {
  constructor(titleService: Title) {
    titleService.setTitle('Pokemon Signal Demo 6');
  }
}
