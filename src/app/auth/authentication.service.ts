import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import jwtDecode, {JwtPayload} from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient, private router: Router) {
    }

    isLoggedIn(): boolean {
        return sessionStorage.getItem("stream.token") != null;
    }

    login(username: string, password: string): Observable<string> {
        const httpOptions = {
            headers: {
                Authorization: 'Basic ' + window.btoa(username + ':' + password)
            },
            responseType: 'text' as 'text',
        };
        return this.http.get("http://localhost:8080/login", httpOptions);
    }

    getUserName(): any {
        let token = '';
        if (!!sessionStorage.getItem("stream.token")) {
            token = sessionStorage.getItem("stream.token") as string;
        }
        const decodedToken = jwtDecode<JwtPayload>(token);
        return decodedToken.sub;
    }

    logout() {
        sessionStorage.removeItem("stream.token");
        this.router.navigateByUrl("/login");
    }
}
