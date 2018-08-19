import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'; 
import { Observable } from 'rxjs';
import { Item } from '../newproject/newproject.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>
  items: Observable<Item[]>;
  constructor(private router: Router, private fireAuth: AngularFireAuth, private firestore: AngularFirestore) { 
    this.itemsCollection = firestore.collection<Item>('projects'); 
    this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit() {
    if (this.fireAuth.auth.currentUser === null) {
      this.router.navigate(["login"]);
    }
  }



}
