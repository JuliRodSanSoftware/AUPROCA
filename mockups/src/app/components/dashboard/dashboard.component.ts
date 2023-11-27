import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  
})
export class DashboardComponent {
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  sidenavOpened = true;

  constructor(private authService: AuthService, private router: Router,){}
  clickMenu() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  logout() {

    this.authService.logout().subscribe({
      next: () =>{
        
        this.router.navigate(['/sign-in']);
      },
      error: () =>{
        this.router.navigate(['/sign-in']);
      }
      
    });
    
  }

  action2() {
    
  }
  action3() {
    
  }
}
