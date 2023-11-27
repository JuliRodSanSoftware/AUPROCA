// update-password.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent implements OnInit {
  passwordForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private _snackBar: MatSnackBar, private router: Router  ) {}

  ngOnInit() {}

  onSubmit() {
    if (this.passwordForm.valid) {
      if (this.passwordForm.value.newPassword === this.passwordForm.value.confirmPassword) {
        this.authService.changePassword(
          this.passwordForm.value.email,
          this.passwordForm.value.currentPassword,
          this.passwordForm.value.newPassword
        ).subscribe({
          next: () =>{
            this._snackBar.open('Se cambió la contraseña correctamente', '', {
              duration: 3000, 
            });

            this.router.navigate(['/sign-in']);
          },
          error: () => {
            this._snackBar.open('Error, no se pudo cambiar la contraseña', '', {
              duration: 3000, 
            });
          }
        });
      } else {
        this._snackBar.open('Error, Revise su nueva contraseña y la confirmación', '', {
          duration: 3000, 
        });
      }
    }
  }
}
