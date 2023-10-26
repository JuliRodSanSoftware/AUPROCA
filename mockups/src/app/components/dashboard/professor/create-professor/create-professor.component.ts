import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Router } from '@angular/router';
import { Professor } from 'src/app/models/professor';

@Component({
  selector: 'app-create-professor',
  templateUrl: './create-professor.component.html',
  styleUrls: ['./create-professor.component.css']
})
export class CreateProfessorComponent {

  newProfessor = new Professor();

  constructor( private _snackBar: MatSnackBar, private router: Router,) {}

  createProfessor(){
    this._snackBar.open('Se ha creado el docente correctamente', 'Cerrar', {
      duration: 3000, // Duración en milisegundos
    });
    this.router.navigate(['/dashboard/professors']);
    return; 
  }
}
