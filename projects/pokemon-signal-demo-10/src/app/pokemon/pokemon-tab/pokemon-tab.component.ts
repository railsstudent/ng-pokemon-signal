import { NgComponentOutlet, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PokemonAbilitiesComponent } from '../pokemon-abilities/pokemon-abilities.component';
import { PokemonStatsComponent } from '../pokemon-stats/pokemon-stats.component';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-tab',
  standalone: true,
  imports: [
    PokemonAbilitiesComponent,
    PokemonStatsComponent,
    NgComponentOutlet,
    NgFor,
  ],
  template: `
    <div style="padding: 0.5rem;">
      <div>
        <div>
          <input id="all" name="type" type="radio" (click)="selectComponents('all')" checked />
          <label for="all">All</label>
        </div>
        <div>
          <input id="stats" name="type" type="radio" (click)="selectComponents('statistics')" />
          <label for="stats">Stats</label>
        </div>
        <div>
          <input id="ability" name="type" type="radio" (click)="selectComponents('abilities')" />
          <label for="ability">Abilities</label>
        </div>
      </div>
    </div>
    <ng-container *ngFor="let componentType of dynamicComponents">
      <ng-container *ngComponentOutlet="componentType; inputs: { pokemon: pokemon() }"></ng-container>
    </ng-container>
  `,
  styles: [`
    input[type="radio"] {
      margin-right: 0.25rem;
    }

    div > div {
      display: flex;
      div {
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: calc(100% / 3);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonTabComponent {
  componentMap: Record<string, any> = {
    'statistics': [PokemonStatsComponent],
    'abilities': [PokemonAbilitiesComponent],
    'all': [PokemonStatsComponent, PokemonAbilitiesComponent],
  }

  dynamicComponents = this.componentMap['all'];
  pokemon = inject(PokemonService).pokemon;

  selectComponents(type: string) {
    const components = this.componentMap[type];
    if (components !== this.dynamicComponents) {
      this.dynamicComponents = components;
    }
  }
}
