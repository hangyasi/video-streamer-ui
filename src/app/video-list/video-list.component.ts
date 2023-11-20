import { Component } from '@angular/core';

import {Video} from '../video';
import {VideoService} from "../services/video.service";
import {map} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent {

  videos: Video[] = [];
  constructor(private _service: VideoService, private _router: Router) {
    this._service.getVideoList().pipe(
        map(data => this.videos = data)
    ).subscribe();
  }

    setAndGoToPlayer(video: Video) {
        this._service.video = video;
        this._router.navigateByUrl('/player');
    }
}
