// update-password.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent implements OnInit {
  passwordForm: FormGroup = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  onSubmit() {
    if (this.passwordForm.valid) {
      // Aquí puedes agregar la lógica para enviar la solicitud de actualización de contraseña
      // Puedes acceder a los valores del formulario utilizando this.passwordForm.value
      console.log(this.passwordForm.value);
      // También puedes hacer la llamada HTTP para actualizar la contraseña en el servidor
    }
  }
}
