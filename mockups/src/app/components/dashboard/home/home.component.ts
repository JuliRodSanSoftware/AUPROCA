import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  sidenavOpened = true;

  clickMenu() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  action1() {
    
  }

  action2() {
    
  }
  action3() {
    
  }

}
