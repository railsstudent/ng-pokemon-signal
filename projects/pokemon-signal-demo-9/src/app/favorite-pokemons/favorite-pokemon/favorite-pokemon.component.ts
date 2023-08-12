import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, booleanAttribute, computed, inject } from '@angular/core';
import { FavoritePokemonPersonalComponent } from '../favorite-pokemon-personal/favorite-pokemon-personal.component';
import { FavoritePokemonService } from '../services/favorite-pokemon.service';

@Component({
  selector: 'app-favorite-pokemon',
  standalone: true,
  imports: [NgIf, FavoritePokemonPersonalComponent],
  template: `
    <div>
      <div style="display: flex; justify-content: center;">
        <div class="container" *ngIf="isShowMaleImageText()">
          <p>Male version</p>
          <div>
            <img [src]="pokemon().frontShiny" />
            <img [src]="pokemon().backShiny" />
          </div>
        </div>
        <div class="container" *ngIf="isShowFemaleImageText()">
          <p>Female version</p>
          <div>
            <img [src]="pokemon().frontShinyFemale" />
            <img [src]="pokemon().backShinyFemale" />
          </div>
        </div>
      </div>
      <app-favorite-pokemon-personal [isMainCharacter]="isMainCharacter"></app-favorite-pokemon-personal>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-size: 1.5rem;
    }

    p {
      text-align: center;
      font-size: 1rem;
    }

    .container {
      display: flex;
      flex-direction: column;
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

  @Input({ transform: booleanAttribute })
  isMainCharacter!: boolean;

  pokemonService = inject(FavoritePokemonService);
  pokemon = this.pokemonService.favoritePokemon;

  isShowFemaleImageText = computed(() => !!this.pokemon().backShinyFemale || !!this.pokemon().frontShinyFemale);
  isShowMaleImageText = computed(() => !!this.pokemon().backShiny || !!this.pokemon().frontShiny);

  ngOnChanges(): void {
    this.pokemonService.updateFavoritePokemonSub(this.pokemonId || this.idOrName);
  }
}
