import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EmbeddedViewRef, Input, OnChanges, OnInit, TemplateRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { DisplayPokemon } from '../interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-tab',
  standalone: true,
  imports: [NgFor],
  template: `
    <div style="padding: 0.5rem;" class="container">
      <div>
        <div>
          <input type="radio" id="all" name="selection" value="all"
            checked (click)="selection = 'ALL'; renderDynamicTemplates();">
          <label for="all">All</label>
        </div>
        <div>
          <input type="radio" id="stats" name="selection" value="stats"
            (click)="selection = 'STATISTICS'; renderDynamicTemplates();">
          <label for="stats">Stats</label>
        </div>
        <div>
          <input type="radio" id="abilities" name="selection" value="abilities"
            (click)="selection = 'ABILITIES'; renderDynamicTemplates();">
          <label for="abilities">Abilities</label>
        </div>
      </div>
      <ng-container #vcr></ng-container>
    </div>

    <ng-template #statsTemplate let-stats>
      <div>
        <p>Stats</p>
        <div *ngFor="let stat of stats" class="flex-container">
          <label>
            <span style="font-weight: bold; color: #aaa">Name: </span>
            <span>{{ stat.name }}</span>
          </label>
          <label>
            <span style="font-weight: bold; color: #aaa">Base Stat: </span>
            <span>{{ stat.baseStat }}</span>
          </label>
          <label>
            <span style="font-weight: bold; color: #aaa">Effort: </span>
            <span>{{ stat.effort }}</span>
          </label>
        </div>
      </div>
    </ng-template>

    <ng-template #abilitiesTemplate let-abilities>
      <div>
        <p>Abilities</p>
        <div *ngFor="let ability of abilities" class="flex-container">
          <label>
            <span style="font-weight: bold; color: #aaa">Name: </span>
            <span>{{ ability.name }}</span>
          </label>
          <label>
            <span style="font-weight: bold; color: #aaa">Is hidden? </span>
            <span>{{ ability.isHidden ? 'Yes' : 'No' }}</span>
          </label>
          <label>&nbsp;</label>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    :host {
      display: block;
    }

    div.container > div:first-child {
      display: flex;
    } 

    div.container > div:first-child > div {
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: calc(100% / 3);
    }

    input[type="radio"] {
      margin-right: 0.25rem;
    }

    .flex-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .flex-container > * {
      flex-grow: 1;
      flex-basis: calc(100% / 3);
    }

    div.container > div:nth-child(n+2) {
      display: block;
      padding: 0.5rem; 
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonTabComponent implements OnInit, OnChanges {
  @Input()
  pokemon!: DisplayPokemon;

  // obtain reference to ng-container element
  @ViewChild('vcr', { static: true, read: ViewContainerRef })
  vcr!: ViewContainerRef;

  // obtain reference ngTemplate named stats
  @ViewChild('statsTemplate', { static: true, read: TemplateRef })
  statsRef!: TemplateRef<any>;

  // obtain reference ngTemplate named abilities
  @ViewChild('abilitiesTemplate', { static: true, read: TemplateRef })
  abilitiesRef!: TemplateRef<any>;

  selection: 'ALL' | 'STATISTICS' | 'ABILITIES' = 'ALL';
  embeddedViewRefs: EmbeddedViewRef<any>[] = [];

  cdr = inject(ChangeDetectorRef);

  private getTemplateRefContexts() {
    if (!this.statsRef || !this.abilitiesRef) {
      return [];
    }

    const statsRefContext = {
      ref: this.statsRef,
      context: { $implicit: this.pokemon.stats }
    }

    const abilitiesRefContext = {
      ref: this.abilitiesRef,
      context: { $implicit: this.pokemon.abilities }
    }

    if (this.selection === 'ALL') {
      return [statsRefContext, abilitiesRefContext];
    } else if (this.selection === 'STATISTICS') {
      return [statsRefContext];
    }

    return [abilitiesRefContext];
  }

  private destroyEmbeddedViewRefs() {
    // destroy embeddedViewRefs to avoid memory leak
    for (const viewRef of this.embeddedViewRefs) {
      if (viewRef) {
        viewRef.destroy();
      }
    }
  }

  renderDynamicTemplates() {
    const refContext = this.getTemplateRefContexts();

    this.vcr.clear();
    this.destroyEmbeddedViewRefs();
    for (const { ref, context } of refContext) {
      const embeddedViewRef = this.vcr.createEmbeddedView(ref, context);
      this.embeddedViewRefs.push(embeddedViewRef);
      // after appending each embeddedViewRef to container, I trigger change detection cycle
      this.cdr.detectChanges();
    }
  }

  ngOnInit(): void {
    this.renderDynamicTemplates();
  }

  ngOnChanges(): void {
    this.renderDynamicTemplates();
  }
}