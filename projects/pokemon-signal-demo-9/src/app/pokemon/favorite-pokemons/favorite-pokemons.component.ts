import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-favorite-pokemons',
  standalone: true,
  template: '<p>favorite-pokemons works!</p>',
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritePokemonsComponent {

}
