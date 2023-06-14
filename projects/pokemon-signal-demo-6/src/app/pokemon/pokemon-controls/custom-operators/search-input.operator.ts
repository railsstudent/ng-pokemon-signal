import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, map, Observable } from "rxjs";

export const searchInput = (minPokemonId = 1, maxPokemonId = 100) => {
  return (source: Observable<number>) => source.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((value) => value >= minPokemonId && value <= maxPokemonId),
      map((value) => Math.floor(value)),
      takeUntilDestroyed()
    );
}
