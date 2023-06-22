import { NgComponentOutlet, NgFor } from '@angular/common';
<<<<<<< HEAD
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input, OnChanges, OnInit, SimpleChanges, inject, signal } from '@angular/core';
import { DisplayPokemon } from '../interfaces/pokemon.interface';
import { PokemonAbilitiesComponent } from '../pokemon-abilities/pokemon-abilities.component';
import { PokemonStatsComponent } from '../pokemon-stats/pokemon-stats.component';
import { createPokemonInjectorFn } from './injectors/pokemon.injector';
=======
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input, OnChanges, SimpleChanges, inject, signal } from '@angular/core';
import { createPokemonInjectorFn } from '../injectors/pokemon.injector';
import { DisplayPokemon } from '../interfaces/pokemon.interface';
import { PokemonAbilitiesComponent } from '../pokemon-abilities/pokemon-abilities.component';
import { PokemonStatsComponent } from '../pokemon-stats/pokemon-stats.component';
>>>>>>> 108da18136f1a2ef7ac6b8b0bc1d47e42a5c70e4

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
      <ul>
        <li><a href="#" (click)="selectComponents('all')">All</a></li>
        <li><a href="#" (click)="selectComponents('statistics')">Stats</a></li>
        <li><a href="#" (click)="selectComponents('abilities')">Abilities</a></li>
      </ul>
    </div>
    <ng-container *ngFor="let component of dynamicComponents()">
      <ng-container *ngComponentOutlet="component; injector: myInjector"></ng-container>
    </ng-container>
  `,
  styles: [`
    li {
      list-style-type: none;
    }

    ul {
      display: flex;

      li {
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
