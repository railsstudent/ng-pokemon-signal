import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PokemonComponent } from './pokemon/pokemon/pokemon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokemonComponent],
  template: `<app-pokemon></app-pokemon>`,
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
