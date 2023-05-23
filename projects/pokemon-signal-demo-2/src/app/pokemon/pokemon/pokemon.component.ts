import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter } from 'rxjs';

const pokemonBaseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h1>
      Use Angular Signal to display the first 100 pokemon images
    </h1>
    <div>
      <label>Pokemon Id:
        <span>{{ currentPokemonId() }}</span>
      </label>
      <div class="container">
        <img [src]="imageUrls().front" />
        <img [src]="imageUrls().back" />
      </div>
    </div>
    <div class="container">
      <button class="btn" #btnMinusTwo (click)="updatePokemonId(-2)">-2</button>
      <button class="btn" #btnMinusOne (click)="updatePokemonId(-1)">-1</button>
      <button class="btn" #btnAddOne (click)="updatePokemonId(1)">+1</button>
      <button class="btn" #btnAddTwo (click)="updatePokemonId(2)">+2</button>
      <input type="number" [ngModel]="searchIdSub.getValue()" (ngModelChange)="searchIdSub.next($event)"
        name="searchId" id="searchId" />
    </div>
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
  searchIdSub = new BehaviorSubject(1);

  readonly min = 1;
  readonly max = 100;
  currentPokemonId = signal(1);

  updatePokemonId(delta: number) {
    this.currentPokemonId.update((pokemonId) => {
      const newId = pokemonId + delta;
      return Math.min(Math.max(this.min, newId), this.max);
    });
  }

  imageUrls = computed(() => ({
    front: `${pokemonBaseUrl}/shiny/${this.currentPokemonId()}.png`,
    back: `${pokemonBaseUrl}/back/shiny/${this.currentPokemonId()}.png`
  }));

  constructor() {
    this.searchIdSub
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((value) => value >= this.min && value <= this.max),
        takeUntilDestroyed(),
      ).subscribe((value) => this.currentPokemonId.set(value));
  }
}
