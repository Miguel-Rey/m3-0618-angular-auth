import { Component, OnInit } from '@angular/core';
import { ChordsService } from '../../services/chords';
import { Router } from '../../../node_modules/@angular/router';
import { SessionService } from '../../services/session';
import { forkJoin } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchResult:Array<object>= [];
  suggestions:Array<string>;
  page: number;
  prevQuery: string;
  userFavourites: Array<string>;

  constructor(private ChordsService: ChordsService, private SessionService: SessionService, private router: Router) {
    this.page = 2;
    this.SessionService.isLogged().subscribe(user => {
      this.userFavourites = user.favourites;
    })
   }

  ngOnInit() {
  }
  search(query:string){
    this.ChordsService.searchChords(query, 1).subscribe( data => {
      this.searchResult = data
      this.prevQuery = query;
      this.page = 2;
    })
  }

  searchMore(query: string){
    this.ChordsService.searchChords(query, this.page).subscribe( data => {
      this.searchResult = this.searchResult.concat(data);
      this.page++
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

  addFavourite(url){
    this.userFavourites.push(url);
    this.ChordsService.addFavourite(url).subscribe( data => {
      console.log('succesfully added', data);
    })
  }

  deleteFavourite(url){
    this.userFavourites.splice(this.userFavourites.indexOf(url), 1);
    this.ChordsService.deleteFavourite(url).subscribe( data => {
    });
  }

  isFavourite(url){
    return this.userFavourites.includes(url)
  }

}
