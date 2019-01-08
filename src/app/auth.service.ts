import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;
  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
    this.user$ = angularFireAuth.authState;
   }

  login(username: string, password: string) {
    this.angularFireAuth.auth.signInWithEmailAndPassword(username, password)
    .then(value => {
      this.router.navigateByUrl('/');
      return true;
    })
    .catch(err => {
      window.alert('Something went wrong: ' +  err.message);
      return false;
    });
  }

  logout() {
    this.angularFireAuth.auth.signOut().then(value => {
      this.router.navigateByUrl('/');
    });
  }
}
