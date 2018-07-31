import { Component, OnInit } from '@angular/core';
import { ChordsService } from '../../services/chords';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchResult:Array<object>= [];
  suggestions:Array<string>;

  constructor(private ChordsService: ChordsService, private router: Router) { }

  ngOnInit() {
  }
  search(query:string){
    this.ChordsService.searchChords(query).subscribe( data => {
      this.searchResult = data;
    })
  }

  getSingleChord(url){
    const replaceLong = 'https://tabs.ultimate-guitar.com/'.length
    const id = url.slice(replaceLong).split('/').join('__');
    this.router.navigate(['/single',id])
  }

  getSearchSuggestions(query){
    if(query.length > 3){
      this.ChordsService.getSuggestions(query).subscribe( data => {
        this.suggestions = data;
      })
    } else {
      this.suggestions = null;
    }
  }
}
