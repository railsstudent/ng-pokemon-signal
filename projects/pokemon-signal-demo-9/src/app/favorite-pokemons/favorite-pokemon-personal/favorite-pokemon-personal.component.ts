import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { FavoritePokemonService } from '../services/favorite-pokemon.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorite-pokemon-personal',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  template:`
    <p>{{ this.isMainCharacter ?  'Main character' : 'Supporting cast' }}</p>
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
  `,
  styles: [`
    :host {
      display: block;
    }

    .pokemon-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;

      padding: 0.5rem;
    }

    .pokemon-container > label {
      flex-basis: calc(100% / 3);
    }
    
    .pokemon-container > label > span:first-child {
      font-weight: bold; 
      color: #aaa;
    }

    .pokemon-container > label.evolved {
      flex-basis: 100%;
    }  

    p {
      padding: 0.5rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritePokemonPersonalComponent {
  @Input({ required: true })
  isMainCharacter!: boolean;

  personalData = inject(FavoritePokemonService).personalData;
}
