import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'; 
import { Observable, combineLatest } from 'rxjs';
import { AppService } from '../../app.service';
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
export class DashboardComponent implements OnChanges {
  private itemsCollection: AngularFirestoreCollection<Item>
  testItem: any;
  items: Observable<Item[]>;
  constructor(private router: Router, private fireAuth: AngularFireAuth, private firestore: AngularFirestore, private stateService : AppService) { 
    this.itemsCollection = this.firestore.collection<Item>("projects");
    this.items = this.itemsCollection.valueChanges(); 
  }

  ngOnChanges() {
    this.stateService.isLoggedIn().subscribe(res => {
      if (res) {
        console.log("Is Logged In");
      } else {
        alert("You are not logged in.");
        this.router.navigate(['login']);
      }
    });
  }

}
