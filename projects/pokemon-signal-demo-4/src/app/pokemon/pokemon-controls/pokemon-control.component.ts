import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { PokemonService } from '../services/pokemon.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-pokemon-controls',
  standalone: true,
  imports: [FormsModule, NgFor],
  template: `
    <div class="container">
    <button class="btn" *ngFor="let delta of [-2, -1, 1, 2]" (click)="updatePokemonId(delta)">{{delta < 0 ? delta : '+' + delta }}</button>
      <input type="number" [ngModel]="searchIdSub.getValue()" (ngModelChange)="searchIdSub.next($event)"
        name="searchId" id="searchId" />
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
        debounceTime(300),
        distinctUntilChanged(),
        filter((value) => value >= this.min && value <= this.max),
        takeUntilDestroyed()
      ).subscribe((value) => this.pokemonService.updatePokemonId(value));
  }
}
