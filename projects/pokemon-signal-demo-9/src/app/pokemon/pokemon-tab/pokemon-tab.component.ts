import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, OnInit, ViewChild, ViewContainerRef, inject } from '@angular/core';

type SelectionType = 'ALL' | 'STATISTICS' | 'ABILITIES';

@Component({
  selector: 'app-pokemon-tab',
  standalone: true,
  template: `
    <div class="container">
      <div>
        <div>
          <input type="radio" id="all" name="selection" value="all" checked (click)="renderComponentsBySelection('ALL');">
          <label for="all">All</label>
        </div>
        <div>
          <input type="radio" id="stats" name="selection" value="stats" (click)="renderComponentsBySelection('STATISTICS');">
          <label for="stats">Stats</label>
        </div>
        <div>
          <input type="radio" id="abilities" name="selection" value="abilities" (click)="renderComponentsBySelection('ABILITIES');">
          <label for="abilities">Abilities</label>
        </div>
      </div>
      <ng-container #vcr></ng-container>
    </div>
  `,
  styles: [`
    div.container { 
      padding: 0.5rem;

      > div {
        display: flex;

        > div {
          flex-grow: 1;
          flex-shrink: 1;
          flex-basis: calc(100% / 3);

          input[type="radio"] {
            margin-right: 0.25rem;
          }
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonTabComponent implements OnInit {
  @ViewChild('vcr', { static: true, read: ViewContainerRef })
  vcr!: ViewContainerRef;

  selection: SelectionType = 'ALL';
  componentRefs: ComponentRef<any>[] = [];

  cdr = inject(ChangeDetectorRef);

  private async getComponenTypes() {
    const { PokemonStatsComponent } = await import('../pokemon-stats/pokemon-stats.component');
    const { PokemonAbilitiesComponent } = await import('../pokemon-abilities/pokemon-abilities.component');

    if (this.selection === 'ALL') {
      return [PokemonStatsComponent, PokemonAbilitiesComponent];
    } else if (this.selection === 'STATISTICS')  {
      return [PokemonStatsComponent];
    }

    return [PokemonAbilitiesComponent];    
  }

  destroyComponentRefs(): void {
    // release component refs to avoid memory leak
    for (const componentRef of this.componentRefs) {
      if (componentRef) {
        componentRef.destroy();
      }
    }
  }

  async renderComponentsBySelection(selection: SelectionType) {
    this.selection = selection;
    await this.renderDynamicComponents();
  }

  private async renderDynamicComponents() {
    const componentTypes = await this.getComponenTypes();

    // clear dynamic components shown in the container previously    
    this.vcr.clear();
    this.destroyComponentRefs();
    for (const componentType of componentTypes) {
      const newComponentRef = this.vcr.createComponent(componentType);
      // store component refs created
      this.componentRefs.push(newComponentRef);
      // run change detection in the component and child components
      this.cdr.detectChanges();
    }
  }

  ngOnInit(): void {
    this.renderDynamicComponents();
  }
}
