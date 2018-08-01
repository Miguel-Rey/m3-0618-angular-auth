import { Component, OnInit, Input, OnChanges, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chord-content',
  templateUrl: './chord-content.component.html',
  styleUrls: ['./chord-content.component.css']
})
export class ChordContentComponent implements OnChanges {
  @Input() chord: any;

  constructor(private elRef:ElementRef) { }

  ngOnInit() {
  }
  ngOnChanges(){
  }
  ngAfterViewInit() {
    this.setEvents();
   }

  setEvents() {
    let chords = this.elRef.nativeElement.querySelectorAll('.chord');
    chords.forEach( e => {
      e.addEventListener('mouseover',function(e){
        this.querySelector('.chord-popup').innerText = this.innerText;
      })
    })

  }

}
