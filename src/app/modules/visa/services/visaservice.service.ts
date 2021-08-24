import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { visaState } from 'src/assets/config/interfaces';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class VisaserviceService {

  // define the subjects
state: visaState = {
  visas : []
};


stateSubject: BehaviorSubject<visaState> = new BehaviorSubject(this.state);
readonly stateObservable = this.stateSubject.asObservable();

constructor(
  private http: HttpClient,
  private snack: MatSnackBar
) { }

async init () {

  const result: any = await this.http.get(environment.url + 'visa/get')
  .toPromise();

  if (result.data) {
    this.state.visas = result.data;
    this.stateSubject.next(this.state);
  }else {
    this.state.visas = [];
    this.stateSubject.next(this.state);
  }
  
}
}
