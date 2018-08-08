import { Component, ElementRef } from "@angular/core";
import { SessionService } from "../services/session";
import { ChordsService } from "../services/chords";
import { Router } from "@angular/router";
import { isNull } from "../../node_modules/@angular/compiler/src/output/output_ast";

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
  selectedSuggestion = -1;
  constructor(
    private sessionService: SessionService,
    private ChordsService: ChordsService,
    private router: Router,
    private elRef: ElementRef
  ) {
    document.addEventListener('keydown', (e) => {
      if(e.keyCode === 13 && document.getElementById('nav_search') === document.activeElement){
        let isOptionSelected = false;
        let selectedOptionValue;
        let options = this.elRef.nativeElement.querySelectorAll('.option')
        if(options.length > 0){
          options.forEach(e => {
            if(e.classList.contains('selected')){
              isOptionSelected = true
              selectedOptionValue = e.innerText;
            }
          })
        }
        if(isOptionSelected){
          this.searchTop(selectedOptionValue);
        } else {
          this.searchTop(document.getElementById('nav_search').getAttribute('ng-reflect-model'));
        }
      }
      if(e.keyCode === 40 && document.getElementById('nav_search') === document.activeElement){
        this.selectedSuggestion++
        let options = this.elRef.nativeElement.querySelectorAll('.option')
        if(options.length > 0){
          console.log(options);
          options.forEach(e => {
            e.classList.remove('selected')
          })
          document.getElementsByClassName('option')[this.selectedSuggestion].classList.add('selected')
        }
      }
      if(e.keyCode === 38 && document.getElementById('nav_search') === document.activeElement){
        this.selectedSuggestion--
        let options = this.elRef.nativeElement.querySelectorAll('.option')
        if(options.length > 0){
        options.forEach(e => {
          e.classList.remove('selected')
        })
        document.getElementsByClassName('option')[this.selectedSuggestion].classList.add('selected')
        }
      }
    })
    this.sessionService.isLogged().subscribe( user => {
      document.getElementsByClassName('profile')[0].addEventListener('click', this.toggleProfile);
    })
  }

  logout() {
    this.sessionService.logout().subscribe( user => {
      this.router.navigate(['/login'])
      }
    );
  }

  getSearchSuggestions(query) {
    if (query.length > 3) {
      this.ChordsService.getSuggestions(query).subscribe(data => {
        this.suggestions = data;
        document.getElementById('search-suggestions').classList.add('show');
      });
    } else {
      this.suggestions = null;
      document.getElementById('search-suggestions').classList.remove('show');
    }
  }

  searchTop(query) {
    if(query != null){
      let sanitizedQuery = query.split(" ").join("_");
      this.router.navigate(["/search", sanitizedQuery]);
      this.query = "";
      this.suggestions = [];
      document.getElementById('search-suggestions').classList.remove('show');
    }
  }

  toggleProfile(){
    let menu = document.getElementsByClassName('menu_profile')[0]
    if(menu != undefined){
      if(menu.classList.contains('hidden')){
        menu.classList.remove('hidden');
      } else {
        menu.classList.add('hidden');
      }
    }
  }
}
