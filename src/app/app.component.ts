import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-tuts';
  isSidebarOpen = true;

  sideBarToggler(){
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
