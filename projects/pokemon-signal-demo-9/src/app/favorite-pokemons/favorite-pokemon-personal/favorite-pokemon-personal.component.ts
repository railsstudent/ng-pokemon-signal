import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainCharacterPipe } from '../pipes/main-character.pipe';
import { FavoritePokemonService } from '../services/favorite-pokemon.service';

@Component({
  selector: 'app-favorite-pokemon-personal',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, MainCharacterPipe],
  template:`
    <div>      
      <p><span>Role: </span>{{ this.isMainCharacter | mainCharacter }}</p>
      <div class="pokemon-container">
        <label *ngFor="let data of personalData().physicalAttributes">
          <span>{{ data.text }}</span>
          <span>{{ data.value }}</span>
        </label>

        <label *ngIf="personalData().evolveFrom" class="evolved">
          <span>Evolve from: </span>
          <a [routerLink]="['/favorite-pokemons', personalData().evolveFrom ]">{{ personalData().evolveFrom }}</a>
        </label>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 0.5rem;
    }

    .pokemon-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
    }

    .pokemon-container > label {
      flex-basis: calc(100% / 3);
    }
    
    .pokemon-container > label > span:first-child, p > span {
      font-weight: bold; 
      color: #aaa;
    }

    .pokemon-container > label.evolved {
      flex-basis: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritePokemonPersonalComponent {
  @Input({ required: true })
  isMainCharacter!: boolean;

  personalData = inject(FavoritePokemonService).personalData;
}
