import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs-compat/Observable";
import "rxjs/add/operator/catch";
import { API_URL } from "../env";
import { Opp } from "./opp.model";
import * as Auth0 from "auth0-web";

@Injectable()
export class OppsApiService {
  constructor(private http: HttpClient) {}

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(
      err.message || "Error: Unable to complete request."
    );
  }

  // GET list of public, future events
  getOpps(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${Auth0.getAccessToken()}`
      })
    };
    return this.http
      .get(`${API_URL}/opps`, httpOptions)
      .catch(OppsApiService._handleError);
  }

  saveOpp(opp: Opp): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${Auth0.getAccessToken()}`
      })
    };
    return this.http.post(`${API_URL}/opps`, opp, httpOptions);
  }

  deleteOpp(oppId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${Auth0.getAccessToken()}`
      })
    };
    return this.http.delete(`${API_URL}/opps/${oppId}`, httpOptions);
  }
}
