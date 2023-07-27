import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, computed, inject } from '@angular/core';
import { FavoritePokemonPersonalComponent } from '../favorite-pokemon-personal/favorite-pokemon-personal.component';
import { FavoritePokemonService } from '../services/favorite-pokemon.service';

@Component({
  selector: 'app-favorite-pokemon',
  standalone: true,
  imports: [NgIf, FavoritePokemonPersonalComponent],
  template: `
    <div>
      <div class="container">
        <p>Male version</p>
        <img [src]="pokemon().frontShiny" />
        <img [src]="pokemon().backShiny" />
      </div>
      <div class="container">
        <p *ngIf="isShowFemaleImageText()">Female version</p>
        <img *ngIf="pokemon().frontShinyFemale" [src]="pokemon().frontShinyFemale" />
        <img *ngIf="pokemon().backShinyFemale" [src]="pokemon().backShinyFemale" />
      </div>
      <app-favorite-pokemon-personal></app-favorite-pokemon-personal>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritePokemonComponent implements OnChanges {
  @Input({ transform: (value: unknown) => typeof value === 'number' ? `${value}` : value })
  pokemonId!: string;

  @Input({ transform: (value: unknown) => typeof value === 'number' ? `${value}` : value })
  idOrName!: string;

  pokemonService = inject(FavoritePokemonService);
  pokemon = this.pokemonService.favoritePokemon;

  isShowFemaleImageText = computed(() => !!this.pokemon().backShinyFemale || !!this.pokemon().frontShinyFemale);

  ngOnChanges(): void {
    this.pokemonService.updateFavoritePokemonSub(this.pokemonId || this.idOrName);
  }
}
