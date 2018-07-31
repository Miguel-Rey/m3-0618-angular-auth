import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from '../environments/environment';

import {map, catchError} from 'rxjs/operators';
import { Observable } from "../../node_modules/rxjs";
import { of } from 'rxjs';


const {BASEURL} = environment;


@Injectable()
export class ChordsImageService {

  constructor(private http:Http) {
  }

  getChordImages(note){
    return this.http.get(`${BASEURL}/api/chords/chordimage/${note}`).pipe(
      map ( (res:Response) => {
        console.log(res.json());
      })
    )
  }


}
