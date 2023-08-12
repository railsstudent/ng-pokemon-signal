import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-favorite-pokemon-images',
  standalone: true,
  template: `
    <div class="container">
      <p>{{ description }}</p>
      <div>
        <img [src]="frontImage" />
        <img [src]="backImage" />
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    p {
      text-align: center;
      font-size: 1rem;
    }

    .container {
      display: flex;
      flex-direction: column;
      padding: 1rem;
    }

    .container > div {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritePokemonImagesComponent {
  @Input({ required: true })
  description!: string;

  @Input({ required: true })
  frontImage!: string;

  @Input({ required: true })
  backImage!: string;
}
