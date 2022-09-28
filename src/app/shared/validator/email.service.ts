import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, map, Observable } from 'rxjs';
import { User } from '../interfaces/user.interfaces';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmailService implements AsyncValidator {

  private _baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
    const params: HttpParams = new HttpParams()
      .set('q', control.value);

    return this.http.get<User[]>(`${this._baseUrl}/users`, {params})
    .pipe(
      delay(1000),
      map(response => (response.length === 0) ? null : {emailInUse: true})
    );
  }
}
