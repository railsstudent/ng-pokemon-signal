import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';

const pokemonBaseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  template: `
    <h2>
      Use Angular Signal to display the first 100 pokemon images
    </h2>
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
      <button class="btn" (click)="updatePokemonId(-2)">-2</button>
      <button class="btn" (click)="updatePokemonId(-1)">-1</button>
      <button class="btn" (click)="updatePokemonId(1)">+1</button>
      <button class="btn" (click)="updatePokemonId(2)">+2</button>
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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonComponent {
  min = 1;
  max = 100;
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
  }))
}