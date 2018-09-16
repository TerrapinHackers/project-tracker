import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
 
@Injectable({
  providedIn: 'root'
})
export class AppService {
 
  constructor(private fireAuth : AngularFireAuth) { }

  isLoggedIn() : Observable<boolean> {
    return this.fireAuth.authState.pipe(map((auth) =>  {
        if(auth == null) {
          return false;
        } else {
          return true;
        }
      }));
  }
 
}