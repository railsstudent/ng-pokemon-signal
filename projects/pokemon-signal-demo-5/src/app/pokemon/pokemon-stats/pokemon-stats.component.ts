import { NgFor, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Statistics } from '../interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-stats',
  standalone: true,
  imports: [NgFor, NgTemplateOutlet],
  template: `
    <div style="padding: 0.5rem;">
      <p>Stats</p>
      <ng-container *ngTemplateOutlet="content; context: { $implicit: stats }"></ng-container>
    </div>
    <ng-template #content let-stats>
      <div *ngFor="let stat of stats" class="stats-container">
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
    </ng-template>
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
  stats!: Statistics[];
}
