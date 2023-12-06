import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { VideoListComponent } from './video-list/video-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import { PlayerComponent } from './player/player/player.component';
import { TabPanelComponent } from './tab-panel/tab-panel.component';
import {MatTabsModule} from "@angular/material/tabs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LiveVideoComponent } from './live-video/live-video.component';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {AuthenticationInterceptor} from "./auth/authentication.interceptor";
import {AuthGuard} from "./auth/auth-guard.service";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    RouterModule.forRoot([
      {path: '', component: TabPanelComponent, canActivate: [AuthGuard]},
      {path: 'player', component: PlayerComponent, canActivate: [AuthGuard]},
      {path: 'login', component: LoginComponent},
    ]),
    MatTabsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    VideoListComponent,
    PlayerComponent,
    TabPanelComponent,
    LiveVideoComponent,
    LoginComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},
  ],
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/