import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'; 
import { Observable } from 'rxjs';

export interface Item { 
  projectCreator: string,
  projectEmail: string,
  projectName: string,
  projectLink: string,
  projectDescription: string
}

@Component({
  selector: 'app-newproject',
  templateUrl: './newproject.component.html',
  styleUrls: ['./newproject.component.css']
})
export class NewprojectComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>
  constructor(private router: Router, public fireAuth: AngularFireAuth, public firestore: AngularFirestore) { 
    this.itemsCollection = firestore.collection<Item>('projects')
  }

  ngOnInit() {
  }
  
  newProject(value: any) {
    var item: Item;
    if (this.fireAuth.auth.currentUser != null && value.projectName && value.projectLink && value.projectDescription) {
      item = {
        projectCreator: this.fireAuth.auth.currentUser.displayName,
        projectEmail: this.fireAuth.auth.currentUser.email,
        projectName: value.projectName,
        projectLink: value.projectLink,
        projectDescription: value.projectDescription 
      }
      this.itemsCollection.add(item).then(function() {
        this.router.navigate(['dashboard']);
      }).catch(error => {
        console.log(error); 
      }); 
    } else {
      alert("Please complete the form in its entireity");
    }
  }

}
