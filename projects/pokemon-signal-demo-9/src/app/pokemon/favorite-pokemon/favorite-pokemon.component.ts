import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-favorite-pokemon',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div>id: {{id$ | async}}</div>
  `,
  styles: [`
    :host {
      display: block;
    }

    div {
      margin: 0.5rem;
    }
  `],
})
export class FavoritePokemonComponent implements OnInit {
  route = inject(ActivatedRoute);
  id$!: Observable<number>;

  ngOnInit(): void {
    this.id$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      map((id) => id ? +id : 25),  
    );
  }

}
