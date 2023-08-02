import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-favorite-pokemons',
  standalone: true,  
  imports: [RouterOutlet, RouterLink],
  template: `
    <h2>Display my favorite Pokemons</h2>
    <ul>
      <li><a routerLink="/favorite-pokemons/pikachu">Pikachu</a></li>
      <li><a routerLink="/favorite-pokemons/jigglypuff">Jigglypuff</a></li>
      <li><a routerLink="/favorite-pokemons/meowth">Meowth</a></li>
      <li><a routerLink="/favorite-pokemons/snorlax">Snorlax</a></li>
    </ul>
    <router-outlet></router-outlet>
  `,
  styles: [`
    :host {
      display: block;
    }

    ul, h2 {
      padding: 0.5rem;
    }

    ul {
      display: flex;
    }

    li {
      font-size: 1rem;
      margin-right: 0.75rem;
      list-style-type: none;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritePokemonsComponent {}
