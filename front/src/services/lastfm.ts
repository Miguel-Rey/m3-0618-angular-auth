import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from '../environments/environment';

import {map, catchError} from 'rxjs/operators';
import { Observable } from "../../node_modules/rxjs";
import { of } from 'rxjs';


const {BASEURL} = environment;


@Injectable()
export class LastFMService {

  constructor(private http:Http) {
  }

  getSimilarTracks(artist,song){
    return this.http.get(`http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${artist}&track=${song}&api_key=051c13424388df5b0f3b04b971ac6eee&format=json`).pipe(
      map ( (res:Response) => {
        console.log(res.json());
      })
    )
  }

  getChordImages(note){
    return this.http.get(`${BASEURL}/api/chords/chordimage/${note}`).pipe(
      map ( (res:Response) => {
        return res.json()
      })
    )
  }


}
