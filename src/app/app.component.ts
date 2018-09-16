import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-tracker';
  loggedIn = false;
  constructor (private stateService : AppService) {
    
  }

  ngOnInit() {
    this.stateService.isLoggedIn().subscribe(res => {
      this.loggedIn = res;
    });
    console.log(this.loggedIn);
  }

  
}
