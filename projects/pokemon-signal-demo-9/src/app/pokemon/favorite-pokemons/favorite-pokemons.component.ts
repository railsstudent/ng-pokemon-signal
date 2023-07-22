import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-favorite-pokemons',
  standalone: true,  
  imports: [RouterOutlet, RouterLink],
  template: `
    <ul>
      <li><a routerLink="/favorite-pokemons/25">Pokemon</a></li>
      <li><a routerLink="/favorite-pokemons/39">Jigglypuff</a></li>
      <li><a routerLink="/favorite-pokemons/52">Meowth</a></li>
    </ul>
    <router-outlet></router-outlet>
  `,
  styles: [`
    :host {
      display: block;
    }

    ul {
      display: flex;
      padding: 0.5rem;
    }

    li {
      font-size: 1rem;
      margin-right: 0.25rem;
      list-style-type: none;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritePokemonsComponent {

}
