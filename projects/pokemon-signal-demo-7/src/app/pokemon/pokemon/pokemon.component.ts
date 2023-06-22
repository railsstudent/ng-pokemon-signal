import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PokemonControlsComponent } from '../pokemon-controls/pokemon-control.component';
import { PokemonPersonalComponent } from '../pokemon-personal/pokemon-personal.component';
import { PokemonTabComponent } from '../pokemon-tab/pokemon-tab.component';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [AsyncPipe, NgIf, PokemonControlsComponent, PokemonPersonalComponent, PokemonTabComponent],
  template: `
    <h2>
      Display the first 100 pokemon images
    </h2>
    <div>
      <div class="container">
        <img [src]="pokemon().frontShiny" />
        <img [src]="pokemon().backShiny" />
      </div>
      <app-pokemon-personal [personalData]="personalData()"></app-pokemon-personal>
      <app-pokemon-tab [pokemon]="pokemon()"></app-pokemon-tab>
    </div>
    <app-pokemon-controls></app-pokemon-controls>
  `,
  styles: [`
    :host {
      display: block;
      font-size: 1.5rem;
      padding: 1rem;
    }

    h1 {
      margin-bottom: 20px;
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
export class PokemonComponent {
  pokemonService = inject(PokemonService);
  pokemon = this.pokemonService.pokemon;
  personalData = this.pokemonService.personalData;
}
