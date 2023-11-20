import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Video} from "../video";
import {Observable, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  video: Video;
  constructor(private _http: HttpClient) { }

  getVideoList(): Observable<Video[]> {
    const uri = "http://localhost:8080/dash/list-all";

    return this._http.get<Video[]>(uri).pipe(take(1));
  }
}
