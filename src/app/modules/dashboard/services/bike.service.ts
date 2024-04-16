import { Injectable, OnDestroy, inject } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Observable, switchMap } from "rxjs";
import { Bike } from "../models/bike";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthModel } from "../../../core/models/auth.model";

@Injectable({
    providedIn: 'root'
  })
export class BikeService implements OnDestroy {

    http = inject(HttpClient);
    constructor () {
    }

    private getAuthFromLocalStorage(): AuthModel {
          const authData = { token: environment.token } as AuthModel;
          return authData;
    }

    public listAll(): Observable<Array<Bike>> {
        const url = environment.BIKE_BASE_URL + environment.BIKE.ALL;
        return this.http.get<Bike[]>(url, { headers: {} });
    }

    public getById(id: string): Observable<Bike> {
        const url = environment.BIKE_BASE_URL + `/${id}`;
        return this.http.get<Bike>(url, { headers: {} });
    }

    public replaceExistingBike(id: string, bikeData: Bike): Observable<Bike> {
        return this.getApiToken().pipe(
            switchMap((auth: AuthModel) => {
                const httpHeaders = new HttpHeaders({
                    Authorization: `Bearer ${auth.token}`,
                });
                const url = environment.BIKE_BASE_URL + `/${id}`;
                return this.http.put<Bike>(url, { ...bikeData }, { headers: httpHeaders });
            })
        );
    }

    public getByHandle(handle: string): Observable<Bike> {

        const url = environment.BIKE_BASE_URL + environment.BIKE.GET_BY_HANDLE +`/${handle}`;
        return this.http.get<Bike>(url, { headers: {} });
    }

    public searchByTitle(query: string): Observable<Array<Bike>> {
        const url = environment.BIKE_BASE_URL + environment.BIKE.SEARCH_BY_TITLE +`/query=${query}`;
        return this.http.get<Bike[]>(url, { headers: {} });
    }

    public createBike(bikeData: Bike): Observable<Bike> {
        return this.getApiToken().pipe(
            switchMap((auth: AuthModel) => {
                const httpHeaders = new HttpHeaders({
                    Authorization: `Bearer ${auth.token}`,
                });
        
                const url = environment.BIKE_BASE_URL;
                return this.http.post<Bike>(url, { ...bikeData }, { headers: httpHeaders });
            })
        );
    }

    public deleteBike(id: string): Observable<Bike> {
        return this.getApiToken().pipe(
            switchMap((auth: AuthModel) => {
                const httpHeaders = new HttpHeaders({
                    Authorization: `Bearer ${auth.token}`,
                });
        
                const url = environment.BIKE_BASE_URL + `/${id}`;
                return this.http.delete<Bike>(url, { headers: httpHeaders });
            })
        );
    }

    public updatePartsOfBike(id: string, bikeParts: Bike): Observable<Bike> {
        return this.getApiToken().pipe(
            switchMap((auth: AuthModel) => {
                const httpHeaders = new HttpHeaders({
                    Authorization: `Bearer ${auth.token}`,
                });
                const url = environment.BIKE_BASE_URL + `/${id}`;
                return this.http.patch<Bike>(url, { ...bikeParts }, { headers: httpHeaders });
            })
        );
    }

    public getApiToken(): Observable<AuthModel> {

        const url = environment.USER_BASE_URL;
        return this.http.post<AuthModel>(url, { "username": "bike-portal" }, { headers: {} });
    }

    ngOnDestroy() {
    }
}