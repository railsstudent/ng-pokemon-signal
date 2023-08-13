import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DisplayPokemon } from '../interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-stats',
  standalone: true,
  imports: [NgFor],
  template: `
    <div style="padding: 0.5rem;">
      <p>Stats</p>
      <div *ngFor="let stat of pokemon.stats" class="stats-container">  
        <label>
            <span style="font-weight: bold; color: #aaa">Name: </span>
            <span>{{ stat.name }}</span>
          </label>
          <label>
            <span style="font-weight: bold; color: #aaa">Base Stat: </span>
            <span>{{ stat.baseStat }}</span>
          </label>
          <label>
            <span style="font-weight: bold; color: #aaa">Effort: </span>
            <span>{{ stat.effort }}</span>
          </label>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .stats-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .stats-container > * {
      flex-grow: 1;
      flex-basis: calc(100% / 3);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonStatsComponent {
  @Input({ required: true })
  pokemon!: DisplayPokemon;
}
