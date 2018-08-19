import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from '../../../../node_modules/firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public fireAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }
  
  login(value: any) {
    console.log(value);
    this.fireAuth.auth.signInWithEmailAndPassword(value.username, value.password)
    .then(success => 
      this.router.navigate(['dashboard']))
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message; 
      if (errorCode === "auth/wrong-password") {
        alert("Wrong username or password")
      } else {
        alert(errorMessage);
      }
    })
  }

}
