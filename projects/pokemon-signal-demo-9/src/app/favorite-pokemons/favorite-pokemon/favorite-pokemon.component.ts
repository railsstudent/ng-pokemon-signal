import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, booleanAttribute, computed, inject } from '@angular/core';
import { FavoritePokemonImagesComponent } from '../favorite-pokemon-images/favorite-pokemon-images.component';
import { FavoritePokemonPersonalComponent } from '../favorite-pokemon-personal/favorite-pokemon-personal.component';
import { FavoritePokemonService } from '../services/favorite-pokemon.service';

@Component({
  selector: 'app-favorite-pokemon',
  standalone: true,
  imports: [NgIf, FavoritePokemonPersonalComponent, FavoritePokemonImagesComponent],
  template: `
    <div>
      <div style="display: flex; justify-content: center;">
        <app-favorite-pokemon-images *ngIf="isShowMaleImageText()" 
          [description]="'Male version'" [frontImage]="pokemon().frontShiny" [backImage]="pokemon().backShiny"
        >
        </app-favorite-pokemon-images>
        <app-favorite-pokemon-images *ngIf="isShowFemaleImageText()" 
          [description]="'Female version'" [frontImage]="pokemon().frontShinyFemale" [backImage]="pokemon().backShinyFemale"
        >
        </app-favorite-pokemon-images>
      </div>
      <app-favorite-pokemon-personal [isMainCharacter]="isMainCharacter"></app-favorite-pokemon-personal>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-size: 1.5rem;
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
