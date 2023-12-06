import { Component } from '@angular/core';
import {AuthenticationService} from "../auth/authentication.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import jwtDecode, {JwtPayload} from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = "";
  password: string = "";
  message: string = "";

  constructor(private authService: AuthenticationService, private router: Router, private snackBar: MatSnackBar) {
  }

  public login(): void {
    sessionStorage.removeItem("stream.token");

    this.authService.login(this.username, this.password)
        .subscribe({
          next: (token) => {
            sessionStorage.setItem("stream.token", token);
            this.router.navigateByUrl("/");
          },
          error: (error) => this.snackBar.open(`Bejelentkezés sikertelen: ${error.status}`, "OK")
        });
  }
}