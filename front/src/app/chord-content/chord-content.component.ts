import { Component, OnInit, Input, OnChanges, ElementRef } from '@angular/core';
import { ChordsImageService } from '../../services/chordImage';

@Component({
  selector: 'app-chord-content',
  templateUrl: './chord-content.component.html',
  styleUrls: ['./chord-content.component.css']
})
export class ChordContentComponent implements OnChanges {
  @Input() chord: any;
  isScrollActivated = true;

  constructor(private elRef:ElementRef, private ChordsImageService: ChordsImageService) { }

  ngOnInit() {
  }
  ngOnChanges(){
  }
  ngAfterViewInit() {
    this.setEvents();
   }

  setEvents() {
    let ChordComponent = this;
    let chords = this.elRef.nativeElement.querySelectorAll('.chord');
    chords.forEach( e => {
      e.addEventListener('mouseover', function(e){
        ChordComponent.showChord(e.path[1]);
      })
      e.addEventListener('mouseout', function(e){
        ChordComponent.hideChord();
      })
    })
    document.getElementById('trasposeUp').addEventListener('click', ()=>{
      this.traposeChordsUp();  
    })
    document.getElementById('trasposeDown').addEventListener('click', ()=>{
      this.traposeChordsDown();  
    })
    document.getElementById('autoscroll').addEventListener('click', ()=>{
      this.scrollTo();   
    })
  }

  showChord(chord){
    let popup = document.querySelector('.chord-popup')
    popup.innerHTML = chord.innerText;
    popup.classList.add('show')
    this.getChordImages(chord.innerText, popup);
      
  }
  hideChord(){
    let popup = document.querySelector('.chord-popup')
    popup.classList.remove('show')
  }


  traposeChordsUp(){
    let chordValue, newValue;
    let chords = this.elRef.nativeElement.querySelectorAll('.chord');
    chords.forEach(e =>{
      let newValue;
      let root = e.querySelector('.rootNote')
      let sufix = e.querySelector('.sufix').innerText
      switch (root.innerText){
        case 'A': newValue = 'A#'; break;
        case 'A#': newValue = 'B'; break;
        case 'B': newValue = 'C'; break;
        case 'C': newValue = 'C#'; break;
        case 'C#': newValue = 'D'; break;
        case 'D': newValue = 'D#'; break;
        case 'D#': newValue = 'E'; break;
        case 'E': newValue = 'F'; break;
        case 'F': newValue = 'F#'; break;
        case 'F#': newValue = 'G'; break;
        case 'G': newValue = 'G#'; break;
        case 'G#': newValue = 'A'; break;
      }
      e.classList.remove(`${root.innerText}${sufix}`);
      e.classList.add(`${newValue}${sufix}`);
      root.innerText = newValue;
    })
  }
  traposeChordsDown(){
    let chordValue, newValue;
    let chords = this.elRef.nativeElement.querySelectorAll('.chord');
    chords.forEach(e =>{
      let newValue;
      let root = e.querySelector('.rootNote')
      let sufix = e.querySelector('.sufix').innerText
      switch (root.innerText){
        case 'A': newValue = 'G#'; break;
        case 'A#': newValue = 'A'; break;
        case 'B': newValue = 'A#'; break;
        case 'C': newValue = 'B'; break;
        case 'C#': newValue = 'C'; break;
        case 'D': newValue = 'C#'; break;
        case 'D#': newValue = 'D'; break;
        case 'E': newValue = 'D#'; break;
        case 'F': newValue = 'E'; break;
        case 'F#': newValue = 'F'; break;
        case 'G': newValue = 'F#'; break;
        case 'G#': newValue = 'G'; break;
      }
      e.classList.remove(`${root.innerText}${sufix}`);
      e.classList.add(`${newValue}${sufix}`);
      root.innerText = newValue;
    })
  }

  scrollTo() {
    document.documentElement.scrollTop += 100;
    if(window.innerHeight + window.scrollY < document.body.offsetHeight){
      console.log(this);
      setTimeout(this.scrollTo(), 1000);
    }
  }

  isScrollAtBottom(){
    return window.innerHeight + window.scrollY < document.body.offsetHeight
  }

  stopScroll(){
    this.isScrollActivated = false;
  }

  getChordImages(note, element) {
    return this.ChordsImageService.getChordImages(note).subscribe(data => {
      let imagesArr = data[0].images
      let image;
      imagesArr.forEach(e => {
        image = document.createElement('img')
        image.setAttribute('src',e);
        image.classList.add('chord-image');
        element.appendChild(image);
      })
    });
  }

}
