import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session";
import { LastFMService } from "../../services/lastfm";
import { Router } from "@angular/router";

@Component({
  selector: "app-top-charts",
  templateUrl: "./top-charts.component.html",
  styleUrls: ["./top-charts.component.scss"]
})
export class TopChartsComponent implements OnInit {
  topTracks = [];
  topArtist = [];
  artistInfo;
  constructor(
    private SessionService: SessionService,
    private LastFMService: LastFMService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getTopArtist();
    this.getTopTracks();
    this.getArtistInfo('drake');
  }

  getTopTracks() {
    this.LastFMService.getTopTracks().subscribe(data => {
      console.log(data.tracks.track);
      this.topTracks = data.tracks.track;
    });
  }
  getTopArtist() {
    this.LastFMService.getTopArtist().subscribe(data => {
      console.log(data.artists.artist);
      this.topArtist = data.artists.artist;
    });
  }
  searchTop(query) {
    let sanitizedQuery = query.split(" ").join("_");
    this.router.navigate(["/search", sanitizedQuery]);
  }

  getArtistInfo(artist){
    this.LastFMService.getArtistInfo(artist).subscribe( data => {
      this.artistInfo = data
    })
  }

  getTrackInfo(artist, song){
    this.LastFMService.getTrackInfo(artist,song).subscribe( data => {
      console.log(data);
    })
  }
}
