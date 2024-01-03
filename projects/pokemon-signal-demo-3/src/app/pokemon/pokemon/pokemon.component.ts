import { NgFor, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs';
import { retrievePokemonFn } from './retrieve-pokemon';
import { DisplayPokemon } from './interfaces/pokemon.interface';

const initialValue: DisplayPokemon = {
  id: -1,
  name: '',
  height: -1,
  weight: -1,
  front_shiny: '',
  back_shiny: '',
}
@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [FormsModule, NgTemplateOutlet, NgFor],
  template: `
    <h2>
      Use Angular signal to display the first 100 pokemon images
    </h2>
    <div>
      <ng-container>
        <div class="pokemon-container">
          <ng-container *ngTemplateOutlet="details; context: { $implicit: rowData() }"></ng-container>
        </div>
        <div class="container">
          <img [src]="pokemon().front_shiny" />
          <img [src]="pokemon().back_shiny" />
        </div>
      </ng-container>
    </div>
    <div class="container">
      <button class="btn" *ngFor="let delta of [-2, -1, 1, 2]" (click)="updatePokemonId(delta)">{{delta < 0 ? delta : '+' + delta }}</button>
      <input type="number" [ngModel]="searchId()" (ngModelChange)="searchId.set($event)" name="searchId" id="searchId" />
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
      font-size: 1.5rem;
      padding: 1rem;
    }

    h1 {
      margin-bottom: 20px;
    }

    .pokemon-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
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
export class PokemonComponent {
  readonly min = 1;
  readonly max = 100;

  searchId = signal(1);
  retrievePokemon = retrievePokemonFn();
  pokemonId = signal(1);
  
  pokemon = toSignal(
    toObservable(this.pokemonId).pipe(switchMap((id) => this.retrievePokemon(id))), { initialValue });

  rowData = computed(() => {
    const { id, name, height, weight } = this.pokemon();
    return [
      { text: 'Id: ', value: id },
      { text: 'Name: ', value: name },
      { text: 'Height: ', value: height },
      { text: 'Weight: ', value: weight },
    ];
  });

  updatePokemonId(delta: number) {
    this.pokemonId.update((value) => {
      const potentialId = value + delta;
      return Math.min(this.max, Math.max(this.min, potentialId));
    });
  }

  constructor() {
    toObservable(this.searchId)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((value) => value >= this.min && value <= this.max),
        map((value) => Math.floor(value)),
        takeUntilDestroyed(),
      ).subscribe((value) => this.pokemonId.set(value));
  }
}
