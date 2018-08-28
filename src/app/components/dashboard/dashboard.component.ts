import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'; 
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Item {
  projectName: string;
  projectEmail: string;
  projectCreator: string;
  projectLink: string;
  projectDescription: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>
  testItem: any;
  items: Observable<Item[]>;
  constructor(private router: Router, private fireAuth: AngularFireAuth, private firestore: AngularFirestore) { 
    this.itemsCollection = this.firestore.collection<Item>("projects");
    this.items = this.itemsCollection.valueChanges(); 
  }

  ngOnInit() {
    if (this.fireAuth.auth.currentUser == null) {
      alert("You need to be logged in to use the dashboard!")
      this.router.navigate(['login']);
    }
  }

}
