import { NgFor, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-personal',
  standalone: true,
  imports: [NgTemplateOutlet, NgFor],
  template:`
    <div class="pokemon-container" style="padding: 0.5rem;">
      <ng-container *ngTemplateOutlet="details; context: { $implicit: personalData }"></ng-container>
    </div>
    <ng-template #details let-personalData>
      <label *ngFor="let data of personalData">
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
  personalData!: ({ text: string; value: string; } | { text: string; value: number })[];
}
