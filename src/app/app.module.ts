import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { VideoListComponent } from './video-list/video-list.component';
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import { PlayerComponent } from './player/player/player.component';
import { TabPanelComponent } from './tab-panel/tab-panel.component';
import {MatTabsModule} from "@angular/material/tabs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LiveVideoComponent } from './live-video/live-video.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    RouterModule.forRoot([
      {path: '', component: TabPanelComponent},
      {path: 'player', component: PlayerComponent},
    ]),
    MatTabsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    VideoListComponent,
    PlayerComponent,
    TabPanelComponent,
    LiveVideoComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/