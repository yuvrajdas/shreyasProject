import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() sideBarTogglerEvent = new EventEmitter<any>();

  toggleSidebar(){
    this.sideBarTogglerEvent.emit();
  }
}
