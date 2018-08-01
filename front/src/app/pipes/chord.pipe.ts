import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "../../../node_modules/@angular/platform-browser";

@Pipe({
  name: "chordify"
})
export class ChordPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(input: string): any {
    if (!input) {
      return "";
    }
    let chordPopUp = '<div class="chord-popup"><img width=50></div>';
    const chordTransformer = e => {
      let chord = e.replace("[ch]", "").replace("[/ch]", "");
      return e
        .replace(
          "[ch]",
          `<span class="chord ${chord}" (onmouseover="test()")>`
        )
        .replace("[/ch]", `${chordPopUp}</span>`);
    };
    let newChord = input;
    let chordArr = input.match(/\[ch\](.*?)\[\/ch\]/g);
    chordArr.forEach(e => {
      newChord = newChord.replace(e, chordTransformer(e));
    });
    return this.sanitizer.bypassSecurityTrustHtml(newChord);
  }
}
