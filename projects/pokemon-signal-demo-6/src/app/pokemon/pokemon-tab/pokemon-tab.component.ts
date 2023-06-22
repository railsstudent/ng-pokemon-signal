import { NgComponentOutlet, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input, OnChanges, OnInit, SimpleChanges, inject, signal } from '@angular/core';
import { DisplayPokemon } from '../interfaces/pokemon.interface';
import { PokemonAbilitiesComponent } from '../pokemon-abilities/pokemon-abilities.component';
import { PokemonStatsComponent } from '../pokemon-stats/pokemon-stats.component';
import { createPokemonInjectorFn } from './injectors/pokemon.injector';

@Component({
  selector: 'app-pokemon-tab',
  standalone: true,
  imports: [
    PokemonAbilitiesComponent,
    PokemonStatsComponent,
    NgComponentOutlet,
    NgFor,
  ],
  template: `
    <div style="padding: 0.5rem;">
      <div>
        <div>
          <input id="all" name="type" type="radio" (click)="selectComponents('all')" />
          <label for="all">All</label>
        </div>
        <div>
          <input id="stats" name="type" type="radio" (click)="selectComponents('statistics')" />
          <label for="stats">Stats</label>
        </div>
        <div>
          <input id="ability" name="type" type="radio" (click)="selectComponents('abilities')" />
          <label for="ability">Abilities</label>
        </div>
      </div>
    </div>
    <ng-container *ngFor="let component of dynamicComponents()">
      <ng-container *ngComponentOutlet="component; injector: myInjector"></ng-container>
    </ng-container>
  `,
  styles: [`
    li {
      list-style-type: none;
    }

    input[type="radio"] {
      margin-right: 0.25rem;
    }

    div > div {
      display: flex;
      div {
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: calc(100% / 3);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonTabComponent implements OnChanges, OnInit {
  @Input()
  pokemon!: DisplayPokemon;

  componentMap: Record<string, any> = {
    'statistics': [PokemonStatsComponent],
    'abilities': [PokemonAbilitiesComponent],
    'all': [PokemonStatsComponent, PokemonAbilitiesComponent],
  }

  dynamicComponents = signal(this.componentMap['all']);

  selectComponents(type: string) {
    const components = this.componentMap[type];
    if (components !== this.dynamicComponents()) {
      this.dynamicComponents.set(components);
    }
  }

  createPokemonInjector = createPokemonInjectorFn();
  myInjector!: Injector;
  markForCheck = inject(ChangeDetectorRef).markForCheck;

  ngOnInit(): void {
    this.myInjector = this.createPokemonInjector(this.pokemon);
    this.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.myInjector = this.createPokemonInjector(changes['pokemon'].currentValue);
  }
}
