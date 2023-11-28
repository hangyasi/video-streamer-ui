import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {VideoService} from "../../services/video.service";
import {Platform} from "@angular/cdk/platform";
declare var shaka: any;
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements AfterViewInit {
  @ViewChild('videoPlayer') videoElementRef: ElementRef | undefined;
  @ViewChild('videoContainer') videoContainerRef: ElementRef | undefined;

  videoElement: HTMLVideoElement | undefined;
  videoContainerElement: HTMLDivElement | undefined;
  player: any;

  constructor(private platform: Platform, private _service: VideoService) {}

  ngAfterViewInit(): void {
    shaka.polyfill.installAll();
    if (shaka.Player.isBrowserSupported()) {
      this.videoElement = this.videoElementRef?.nativeElement;
      this.videoContainerElement = this.videoContainerRef?.nativeElement;
      this.initPlayer();
    } else {
      console.error('Browser not supported!');
    }
  }

  private initPlayer() {
    this.player = new shaka.Player(this.videoElement);

    const ui = new shaka.ui.Overlay(
        this.player,
        this.videoContainerElement,
        this.videoElement
    );

    this.player.load('http://localhost:8080/dash/' + this._service.video.id + '/manifest').then(function () {
      console.log('Videó inicializálva');
    });
  }
}
