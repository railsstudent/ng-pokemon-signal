import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DisplayPokemon } from '../interfaces/pokemon.interface';
import { PokemonAbilitiesComponent } from '../pokemon-abilities/pokemon-abilities.component';
import { PokemonControlsComponent } from '../pokemon-controls/pokemon-control.component';
import { PokemonPersonalComponent } from '../pokemon-personal/pokemon-personal.component';
import { PokemonStatsComponent } from '../pokemon-stats/pokemon-stats.component';
import { PokemonService } from '../services/pokemon.service';

const initialValue: DisplayPokemon = {
  id: -1,
  name: '',
  height: 0,
  weight: 0,
  backShiny: '',
  frontShiny: '',
  abilities: [],
  stats: [],
}

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [PokemonControlsComponent, PokemonAbilitiesComponent, PokemonStatsComponent, PokemonPersonalComponent],
  template: `
    <h2>Display the first 100 pokemon images</h2>
    <div>
      <div class="container">
        <img [src]="pokemon().frontShiny" />
        <img [src]="pokemon().backShiny" />
      </div>
      <app-pokemon-personal [personalData]="personalData()" />
      <app-pokemon-stats [stats]="pokemon().stats" />
      <app-pokemon-abilities [abilities]="pokemon().abilities" />
    </div>
    <app-pokemon-controls />
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
  pokemon = toSignal(this.pokemonService.pokemon$, { initialValue });
  personalData = computed(() => {
    const { id, name, height, weight } = this.pokemon();
    return [
      { text: 'Id: ', value: id },
      { text: 'Name: ', value: name },
      { text: 'Height: ', value: height },
      { text: 'Weight: ', value: weight },
    ];
  });
}
