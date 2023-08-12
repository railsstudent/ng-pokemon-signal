import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mainCharacter',
  standalone: true
})
export class MainCharacterPipe implements PipeTransform {

  transform(isMainCharacter: boolean): string {
    return isMainCharacter ? 'Main character' : 'Supporting cast';
  }
}
