import { Component, OnInit, EventEmitter } from "@angular/core";
import { SessionService } from "../../services/session";
import { ChordsService } from "../../services/chords";
import { forkJoin } from "../../../node_modules/rxjs";
import { Router } from "../../../node_modules/@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {

  userFavourites;

  constructor(
    private SessionService: SessionService,
    private ChordsService: ChordsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getFavourites();
  }

  getFavourites() {
    this.SessionService.isLogged().subscribe(user => {
      let favourites = [];
      user.favourites.forEach(e => {
        favourites.push(this.ChordsService.getChordByUrl(e));
      });
      forkJoin(favourites).subscribe( 
        favouritesArray => {
          this.userFavourites = favouritesArray;
        },
        err => {
          console.log(err);
        });
    })
  }

  getSingleChord(url){
    const replaceLong = 'https://tabs.ultimate-guitar.com/'.length
    const id = url.slice(replaceLong).split('/').join('__');
    this.router.navigate(['/single',id])
  }

  deleteFavourite(url){
    this.userFavourites.splice(this.userFavourites.indexOf(url), 1);
    this.ChordsService.deleteFavourite(url).subscribe( data => {
    });
  }
}
