import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session";
import { ChordsService } from "../../services/chords";
import { forkJoin } from "../../../node_modules/rxjs";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  userFavourites;
  constructor(
    private SessionService: SessionService,
    private ChordsService: ChordsService
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
          console.log(favouritesArray)
          this.userFavourites = favouritesArray;
        },
        err => {
          console.log(err);
        });
    })
  }

  deleteFavourite(url){
    this.ChordsService.deleteFavourite(url).subscribe();
  }
}
