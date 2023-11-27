import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  constructor(private _snackBar: MatSnackBar, private router: Router, private authService: AuthService) {}
  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  onSubmit(){
    
    if (this.emailFormControl.errors && this.passwordFormControl.errors) {
      this._snackBar.open('Error, revise sus datos', '', {
        duration: 3000, 
      });
    } else {
      this.authService.login(this.emailFormControl.value, this.passwordFormControl.value)
        .subscribe({
          next: (data) => {
            localStorage.setItem('token-auproca', data.token);
            localStorage.setItem('refesh-auproca', data.refresh);
            this._snackBar.open('Bienvenido: '+ this.emailFormControl.value, '', {
              duration: 3000, 
            });
            this.redirectToHome();
          },
          error: () => {
            this._snackBar.open('Error, las credenciales son incorrectas', '', {
              duration: 3000, 
            });
          }
      });
    }
  }
  

  redirectToHome() {
    this.router.navigate(['/dashboard']);
  }
}
