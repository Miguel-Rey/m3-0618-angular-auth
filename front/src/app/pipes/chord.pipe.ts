import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'chordify'
})
export class ChordPipe implements PipeTransform {
    transform(input: string): any {
        if (!input) {
            return '';
        }
        let chordPopUp = '<div class="chord-popup"><img width=50></div>'
        const chordTransformer = e => {
          let chord = e.replace('[ch]','').replace('[/ch]','');
          return e.replace('[ch]',`<span class="chord ${chord}" (mouseenter)="getChordImages('B')">`).replace('[/ch]',`${chordPopUp}</span>`)
        }
        let newChord = input;
        let chordArr = input.match(/\[ch\](.*?)\[\/ch\]/g)
        chordArr.forEach( e => {
          newChord = newChord.replace(e, chordTransformer(e));
        })
        return newChord;
    }
}