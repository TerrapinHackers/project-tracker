import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public fireAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  signup(value: any) {
    if (value.email && value.password && value.fullname && value.passwordConfirm) {  
      if (value.password !== value.passwordConfirm) {
        alert("Passwords do not match");
      } else {
        this.fireAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
        .then(function(){
          this.fireAuth.auth.onAuthStateChanged(user => {
            if (user) {
              user.updateProfile({
                displayName: value.email, 
                photoURL: ""
              })
            }
          })
          this.router.navigate(['login'])
        })
        .catch(error => { 
          if (error.code = "auth/email-already-in-use") {
            alert("Email already in use");               
          } else {
            alert("An error has occurred"); 
            console.log(error);            
          }
        })
      }
    }
  }
}
