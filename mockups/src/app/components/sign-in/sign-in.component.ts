import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  constructor(private _snackBar: MatSnackBar, private router: Router) {}
  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  onSubmit(){
    if (this.emailFormControl.errors && this.passwordFormControl.errors) {
      this._snackBar.open('Error, revise sus datos', '', {
        duration: 3000, 
      });
    } else {
      // No hay errores en los campos
      this._snackBar.open('Bienvenido: '+ this.emailFormControl.value, '', {
          duration: 3000, 
      });
      this.redirectToHome();
    }
    
  }

  redirectToHome() {
    this.router.navigate(['/dashboard']);
  }
}
