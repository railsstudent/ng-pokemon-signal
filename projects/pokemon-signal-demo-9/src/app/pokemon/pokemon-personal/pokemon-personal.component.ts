import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-personal',
  standalone: true,
  imports: [NgFor],
  template:`
    <div class="pokemon-container" style="padding: 0.5rem;">
      <label *ngFor="let data of personalData()">
        <span style="font-weight: bold; color: #aaa">{{ data.text }}</span>
        <span>{{ data.value }}</span>
      </label>
    </div>
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
  personalData = inject(PokemonService).personalData;
}
