import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-favorite-pokemons',
  standalone: true,  
  imports: [RouterOutlet, RouterLink],
  template: `
    <ul>
      <li><a routerLink="/favorite-pokemons/pikachu" [state]={ id: 25 }>Pikachu</a></li>
      <li><a routerLink="/favorite-pokemons/39" [state]={ id: 39 }>Jigglypuff</a></li>
      <li><a routerLink="/favorite-pokemons/52" [state]={ id: 52 }>Meowth</a></li>
    </ul>
    <p>Display my favorite Pokemons</p>
    <router-outlet></router-outlet>
  `,
  styles: [`
    :host {
      display: block;
    }

    ul, p {
      padding: 0.5rem;
    }

    ul {
      display: flex;
    }

    p {
      font-size: 1.5rem;
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
