import { Component } from "@angular/core";
import { SessionService } from "../services/session";
import { ChordsService } from "../services/chords";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./styles/app.component.scss"]
})
export class AppComponent {
  title = "app";
  suggestions;
  appComponent = this;
  isProfileOpen = false;
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
    this.sessionService.isLogged().subscribe( user => {
      document.getElementsByClassName('profile')[0].addEventListener('click', this.toggleProfile);
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

  toggleProfile(){
    let menu = document.getElementsByClassName('menu_profile')[0]
    if(menu.classList.contains('hidden')){
      menu.classList.remove('hidden');
    } else {
      menu.classList.add('hidden');
    }
  }
}
