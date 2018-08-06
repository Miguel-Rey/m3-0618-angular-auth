import { Component } from "@angular/core";
import { SessionService } from "../services/session";
import { ChordsService } from "../services/chords";
import { Router } from "../../node_modules/@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./styles/app.component.scss"]
})
export class AppComponent {
  title = "app";
  suggestions;
  appComponent = this;
  query;
  constructor(
    private sessionService: SessionService,
    private ChordsService: ChordsService,
    private router: Router
  ) {
    document.addEventListener('keydown', (e) => {
      if(e.keyCode === 13 && document.getElementById('nav_search') === document.activeElement){
        this.searchTop(document.getElementById('nav_search').getAttribute('ng-reflect-model'));
      }
    })
  }

  logout() {
    this.sessionService.logout().subscribe();
    this
  }

  getSearchSuggestions(query) {
    if (query.length > 3) {
      this.ChordsService.getSuggestions(query).subscribe(data => {
        this.suggestions = data;
      });
    } else {
      this.suggestions = null;
    }
  }

  searchTop(query) {
    let sanitizedQuery = query.split(" ").join("_");
    this.router.navigate(["/search", sanitizedQuery]);
    this.query = "";
    this.suggestions = [];
  }

  fireSearch(){

  }
}
