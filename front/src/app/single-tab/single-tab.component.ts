import { Component, OnInit } from "@angular/core";
import { ChordsService } from "../../services/chords";
import { ActivatedRoute } from "../../../node_modules/@angular/router";
import { ChordsImageService } from "../../services/chordImage";
import { DomSanitizer } from "../../../node_modules/@angular/platform-browser";
import { SessionService } from "../../services/session";
import { LastFMService } from "../../services/lastfm";

@Component({
  selector: "app-single-tab",
  templateUrl: "./single-tab.component.html",
  styleUrls: ["./single-tab.component.css"]
})
export class SingleTabComponent implements OnInit {
  chord: object = {};
  SecureChord: object;
  userFavourites: Array<string> = [];
  versions: Array<any> = [];

  constructor(
    private ChordsService: ChordsService,
    private ChordsImageService: ChordsImageService,
    private paramsRouter: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private SessionService: SessionService,
    private LastfmService: LastFMService
  ) {}
  
  ngOnInit() {
    this.SessionService.isLogged().subscribe(user => {
      this.userFavourites = user.favourites;
    })
    this.paramsRouter.params.subscribe(params => {
      const parsedId =
        "https://tabs.ultimate-guitar.com/" + params.id.split("__").join("/");
      this.ChordsService.getChordByUrl(parsedId).subscribe(data => {
        console.log(data);
        this.chord = data;
        this.getVersions(data.name, data.artist);
      });
    });
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
  
  getVersions(query:string, artist: string){
    this.ChordsService.searchChords(query, 1).subscribe( data => {
      this.versions = data.filter(e => e.name === query && e.artist === artist)
    })
  }
  getSimilarTracks(artist, song){
    this.LastfmService.getSimilarTracks(artist, song).subscribe();
  }

}
