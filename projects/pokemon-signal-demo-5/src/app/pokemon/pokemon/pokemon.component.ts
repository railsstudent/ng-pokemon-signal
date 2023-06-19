import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PokemonAbilitiesComponent } from '../pokemon-abilities/pokemon-abilities.component';
import { PokemonControlsComponent } from '../pokemon-controls/pokemon-control.component';
import { PokemonPersonalComponent } from '../pokemon-personal/pokemon-personal.component';
import { PokemonStatsComponent } from '../pokemon-stats/pokemon-stats.component';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [PokemonControlsComponent, PokemonAbilitiesComponent, PokemonStatsComponent, PokemonPersonalComponent],
  template: `
    <h1>
      Display the first 100 pokemon images
    </h1>
    <div>
      <div class="container">
        <img [src]="pokemon().frontShiny" />
        <img [src]="pokemon().backShiny" />
      </div>
      <app-pokemon-personal [personalData]="personalData()"></app-pokemon-personal>
      <app-pokemon-stats [stats]="pokemon().stats"></app-pokemon-stats>
      <app-pokemon-abilities [abilities]="pokemon().abilities"></app-pokemon-abilities>
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
