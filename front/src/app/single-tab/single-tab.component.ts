import { Component, OnInit } from '@angular/core';
import { ChordsService } from '../../services/chords';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { ChordsImageService } from '../../services/chordImage';
import { DomSanitizer } from '../../../node_modules/@angular/platform-browser';

@Component({
  selector: 'app-single-tab',
  templateUrl: './single-tab.component.html',
  styleUrls: ['./single-tab.component.css']
})
export class SingleTabComponent implements OnInit {
  chord: object = {}
  SecureChord: object;
  constructor(private ChordsService: ChordsService,private ChordsImageService: ChordsImageService , private paramsRouter: ActivatedRoute, private sanitizer: DomSanitizer) { 
  }

  ngOnInit() {
    this.paramsRouter.params.subscribe( params => {
      const parsedId = 'https://tabs.ultimate-guitar.com/' + params.id.split('__').join('/');
      this.ChordsService.getChordByUrl(parsedId).subscribe( data => {
        this.chord = data
      })
    })
  }

  getChordImages(note){
    this.ChordsImageService.getChordImages(note).subscribe( data => {
      console.log(data);
    })
  }


}
