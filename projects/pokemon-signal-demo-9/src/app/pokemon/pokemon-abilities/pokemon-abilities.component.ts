import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-abilities',
  standalone: true,
  imports: [NgFor],
  template: `
    <div style="padding: 0.5rem;">
      <p>Abilities</p>
      <div *ngFor="let ability of pokemon().abilities" class="abilities-container">
        <label>
          <span style="font-weight: bold; color: #aaa">Name: </span>
          <span>{{ ability.name }}</span>
        </label>
        <label>
          <span style="font-weight: bold; color: #aaa">Is hidden? </span>
          <span>{{ ability.isHidden ? 'Yes' : 'No' }}</span>
        </label>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .abilities-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .abilities-container > * {
      flex-grow: 1;
      flex-basis: calc(100% / 2);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonAbilitiesComponent {
  pokemon = inject(PokemonService).pokemon;
}
