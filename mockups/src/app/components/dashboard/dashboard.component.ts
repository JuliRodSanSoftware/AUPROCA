import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  
})
export class DashboardComponent {
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
