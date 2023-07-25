import { Component, Input, OnChanges, inject, numberAttribute } from '@angular/core';
import { PokemonPersonalComponent } from '../pokemon-personal/pokemon-personal.component';
import { PokemonTabComponent } from '../pokemon-tab/pokemon-tab.component';
import { PokemonService } from '../services/pokemon.service';
import { FavoritePokemonService } from '../services/favorite-pokemon.service';

@Component({
  selector: 'app-favorite-pokemon',
  standalone: true,
  imports: [PokemonPersonalComponent, PokemonTabComponent],
  template: `
    <div>
      <div class="container">
        <img [src]="pokemon().frontShiny" />
        <img [src]="pokemon().backShiny" />
      </div>
      <app-pokemon-personal></app-pokemon-personal>
      <app-pokemon-tab></app-pokemon-tab>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-size: 1.5rem;
    }

    .container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: 1rem;
    }
  `],
})
export class FavoritePokemonComponent implements OnChanges {
  @Input({ transform: (value: unknown) => typeof value === 'number' ? `${value}` : value })
  pokemonId!: string;

  @Input({ transform: (value: unknown) => typeof value === 'number' ? `${value}` : value })
  idOrName!: string;

  pokemonService = inject(FavoritePokemonService);
  pokemon = this.pokemonService.favoritePokemon;

  ngOnChanges(): void {
    this.pokemonService.updateFavoritePokemonSub(this.pokemonId || this.idOrName);
  }
}
