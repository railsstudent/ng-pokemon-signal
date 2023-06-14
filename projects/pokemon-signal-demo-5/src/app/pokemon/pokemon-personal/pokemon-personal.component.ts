import { NgFor, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DisplayPokemon } from '../interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-personal',
  standalone: true,
  imports: [NgTemplateOutlet, NgFor],
  template:`
    <div class="pokemon-container" style="padding: 0.5rem;">
      <ng-container *ngTemplateOutlet="details; context: { $implicit: rowData }"></ng-container>
    </div>
    <ng-template #details let-rowData>
      <label *ngFor="let data of rowData">
        <span style="font-weight: bold; color: #aaa">{{ data.text }}</span>
        <span>{{ data.value }}</span>
      </label>
    </ng-template>
  `,
  styles: [`
    :host {
      display: block;
    }

    .pokemon-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonPersonalComponent {
  @Input({ required: true })
  rowData!: ({ text: string, value: string } | { text: string, value: number })[];
}
