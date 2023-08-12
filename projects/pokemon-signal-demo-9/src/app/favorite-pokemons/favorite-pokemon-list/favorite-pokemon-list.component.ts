import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-favorite-pokemon-list',
  standalone: true,  
  imports: [RouterOutlet, RouterLink],
  template: `
    <h2>Display my favorite Pokemons</h2>
    <ul>
      <li><a routerLink="/favorite-pokemons/pikachu" [queryParams]="{ isMainCharacter: true }">Pikachu</a></li>
      <li><a routerLink="/favorite-pokemons/jigglypuff" [queryParams]="{ isMainCharacter: false }">Jigglypuff</a></li>
      <li><a routerLink="/favorite-pokemons/seaking" [queryParams]="{ isMainCharacter: false }">Seaking</a></li>
      <li><a routerLink="/favorite-pokemons/snorlax" [queryParams]="{ isMainCharacter: false }">Snorlax</a></li>
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
export class FavoritePokemonListComponent {}
