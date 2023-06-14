import { NgFor, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Ability } from '../interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-abilities',
  standalone: true,
  imports: [NgFor, NgTemplateOutlet],
  template: `
    <div style="padding: 0.5rem;">
      <p>Abilities</p>
      <ng-container *ngTemplateOutlet="content; context: { $implicit: abilities }"></ng-container>
    </div>
    <ng-template #content let-abilities>
      <div *ngFor="let ability of abilities" class="abilities-container">
        <label><span style="font-weight: bold; color: #aaa">Name: </span>
          <span>{{ ability.name }}</span>
        </label>
        <label><span style="font-weight: bold; color: #aaa">Is hidden? </span>
          <span>{{ ability.isHidden ? 'Yes' : 'No' }}</span>
        </label>
      </div>
    </ng-template>  
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
  @Input({ required: true })
  abilities!: Ability[];
}
