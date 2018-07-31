import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from '../environments/environment';

import {map, catchError} from 'rxjs/operators';
import { Observable } from "../../node_modules/rxjs";
import { of } from 'rxjs';


const {BASEURL} = environment;

interface UserObject{
  username:string,
}


@Injectable()
export class ChordsService {

  options:object = {withCredentials:true};

  constructor(private http:Http) {
  }

  searchChords(query){
    return this.http.post(`${BASEURL}/api/chords`,{query}, this.options).pipe(
      map ( (res:Response) => {
        return res.json();
      }),
      catchError( e => {console.log('Error'); return of(e)})
    )
  }

  getChordByUrl(url){
    return this.http.post(`${BASEURL}/api/chords/single`,{url}, this.options).pipe(
      map ( (res: Response) => {
        return res.json();
      }),
      catchError( e => {console.log('Error'); return of(e)})
    )
  }

  getSuggestions(query){
    return this.http.post(`${BASEURL}/api/chords/suggestions`, {query}, this.options).pipe(
      map ( (res: Response) => {
        return res.json();
      })
    )
  }


}
