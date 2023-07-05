import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PokemonControlsComponent } from '../pokemon-controls/pokemon-control.component';
import { PokemonPersonalComponent } from '../pokemon-personal/pokemon-personal.component';
import { PokemonTabComponent } from '../pokemon-tab/pokemon-tab.component';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [PokemonControlsComponent, PokemonPersonalComponent, PokemonTabComponent],
  template: `
    <h2>Display the first 100 pokemon images</h2>
    <div>
      <ng-container>
        <div class="container">
          <img [src]="pokemon().frontShiny" />
          <img [src]="pokemon().backShiny" />
        </div>
        <app-pokemon-personal></app-pokemon-personal>
        <app-pokemon-tab></app-pokemon-tab>
      </ng-container>
    </div>
    <app-pokemon-controls></app-pokemon-controls>
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
      padding: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonComponent {
  pokemon = inject(PokemonService).pokemon;
}
