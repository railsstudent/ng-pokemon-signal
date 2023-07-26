import { Component, Input, OnChanges, inject } from '@angular/core';
import { FavoritePokemonService } from '../services/favorite-pokemon.service';

@Component({
  selector: 'app-favorite-pokemon',
  standalone: true,
  imports: [],
  template: `
    <div>
      <div class="container">
        <img [src]="pokemon().frontShiny" />
        <img [src]="pokemon().backShiny" />
        <img *ngIf="pokemon().frontShinyFemale" [src]="pokemon().frontShinyFemale />
        <img *ngIf="pokemon().backShinyFemale" [src]="pokemon().backShinyFemale />
      </div>
      <!-- <app-pokemon-personal></app-pokemon-personal> -->
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
