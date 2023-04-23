import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
//import {AuthService} from "../auth/auth.service";
import { AuthService } from '../../../../src/app/core/auth/auth.service';
import { AuthUtils } from "../auth/auth.utils";
import { environment } from "../../../environments/environment";
import { Router } from '@angular/router';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Constructor
   */
  constructor(private _authService: AuthService) { }

  /**
   * Intercept
   *
   * @param req
   * @param next
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    


    var token = ""
    // if (req.url.indexOf("rrhh")>0 || req.url.indexOf("localhost:7083")>0) {      
      token = this._authService.accessToken;
    // } else {      
    //   token = this._authService.accessTokenSeguridad;
    // }



    let newReq = req.clone();
    if (
      this._authService.accessToken &&
      !AuthUtils.isTokenExpired(this._authService.accessToken)
    ) {
      newReq = req.clone({
        headers: req.headers
          .set(
            "Authorization",
            "Bearer " + token)
          //"Bearer " + this._authService.accessToken)
          .set("SO", "web")
          .set("project", environment.project),
      });
    } else {
      newReq = req.clone({
        headers: req.headers
          .set("SO", "web")
          .set("project", environment.project),
      });
    }
    /*if (newReq.headers.has("Authorization")) {
      newReq = req.clone({
        headers: req.headers
          .set(
               "Authorization", 
               "Bearer " + req.url.includes("rrhh")? this._authService.accessToken:this._authService.accessTokenSeguridad)
          .set("SO", "web")
          .set("project", environment.project),
      });
    } else {
      newReq = req.clone({
        headers: req.headers
          .set("SO", "web")
          .set("project", environment.project),
      });
    }*/

    // Response
    return next.handle(newReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Catch "401 Unauthorized" responses
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          !location.pathname.includes("sign-in")
        ) {
          localStorage.clear();
          sessionStorage.clear();
          location.reload();
          // Sign out
          this._authService.signOut().subscribe(() => { });
        }

        return throwError(error);
      })
    );
  }
}
