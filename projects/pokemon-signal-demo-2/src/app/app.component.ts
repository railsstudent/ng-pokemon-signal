import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  title = 'pokemon-signal-demo-2';
}
