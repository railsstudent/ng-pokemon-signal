import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { PokemonService } from '../services/pokemon.service';
import { searchInput } from './custom-operators/search-input.operator';

@Component({
  selector: 'app-pokemon-controls',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <button class="btn" (click)="updatePokemonId(-2)">-2</button>
      <button class="btn" (click)="updatePokemonId(-1)">-1</button>
      <button class="btn" (click)="updatePokemonId(1)">+1</button>
      <button class="btn" (click)="updatePokemonId(2)">+2</button>
      <input type="number" [ngModel]="searchIdSub.getValue()" (ngModelChange)="searchIdSub.next($event)"
        name="searchId" id="searchId" />
      <pre>
        searchId: {{ searchIdSub.getValue() }}
      </pre>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: 1rem;
    }

    .btn {
      border-radius: 25%;
      padding: 0.5rem 1rem;
      margin: 0.5rem;
    }

    input[type="number"] {
      padding: 0.5rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonControlsComponent {
  readonly min = 1;
  readonly max = 100;

  pokemonService = inject(PokemonService);
  searchIdSub = new BehaviorSubject(1);

  updatePokemonId(delta: number) {
    this.pokemonService.updatePokemonIdByDelta({ delta, min: this.min, max: this.max })
  }

  constructor() {
    this.searchIdSub
      .pipe(
        searchInput(this.min, this.max)
      ).subscribe((value) => this.pokemonService.updatePokemonId(value));
  }
}
