import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { embassyState } from 'src/assets/config/interfaces';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class EmbassyserviceService {

 // define the subjects
 state: embassyState = {
  embassies : []
};


stateSubject: BehaviorSubject<embassyState> = new BehaviorSubject(this.state);
readonly stateObservable = this.stateSubject.asObservable();

constructor(
  private http: HttpClient,
  private snack: MatSnackBar
) { }

async init () {

  const result: any = await this.http.get(environment.url + 'embassy/get')
  .toPromise();

  if (result.data) {
    this.state.embassies = result.data;
    this.stateSubject.next(this.state);
  }else {
    this.state.embassies = [];
    this.stateSubject.next(this.state);
  }
  
}


// New embassy

async saveEmbassy(embassy): Promise<boolean>  {

  
  let headers= new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });

  let options = {
    headers : headers
  }

  const body = embassy
  
  return this.http.post(environment.url + 'embassy/register', 
  JSON.stringify(body), 
  options)
  .toPromise()
  .then(async (res: any) => {
      
    if(res.status) {
      this.successMessage ("Embassades enregistrée avec succès !");
      this.init();
      return true;
    }
    else 
    {
      this.successMessage ("Embassades enregistrée avec succès !");
      this.init();
      return true;
    }
    
      
  }).catch(err => {
    this.successMessage ("Embassades enregistrée avec succès !");
    this.init();
    return true;
    
  });

}


// Edit embassy

async editEmbassy(embassy): Promise<boolean>  {

  
  let headers= new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });

  let options = {
    headers : headers
  }

  const body = embassy

  
  return this.http.put(environment.url + 'embassy/update', 
  JSON.stringify(body), 
  options)
  .toPromise()
  .then(async (res: any) => {
    if(res.status) {
      this.successMessage ("Embassade modifiée avec succès !");
      this.init();
      return true;
    }
    else
    this.errorMessage('Une erreur est survenue, veuillez réessayer.')
      return false;
  }).catch(err => {
    this.errorMessage('Une erreur est survenue, veuillez réessayer.')
    return false;
  });

}



//ALERTS

errorMessage(a): void {
  this.snack.open(a, '',

  {
    duration: 5000,
    verticalPosition: 'bottom',
    panelClass: 'danger-alert'
  }

  ) ;
}

successMessage(a): void{
  this.snack.open(a, '',

  {
    duration: 3000,
    verticalPosition: 'top',
    panelClass: 'success-alert'
  }

  );
}
}

