import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Router } from '@angular/router';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-create-professor',
  templateUrl: './create-professor.component.html',
  styleUrls: ['./create-professor.component.css']
})
export class CreateProfessorComponent {

  newProfessor = new Professor();
  loading = false;
  constructor( private _snackBar: MatSnackBar, private router: Router, private professorService: ProfessorService) {}

  createProfessor() {
    this.loading = true;
    this.professorService.createProfessor(this.newProfessor).subscribe({
        next: () => {
          this.loading = false;
          this._snackBar.open('Se ha creado el docente correctamente', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/dashboard/professors']);
        },
        error: () => {
          this.loading = false;
          this._snackBar.open('Error, no se pudo crear el docente', 'Cerrar', {
            duration: 3000,
          });
         
        }
      }
    );
  }
}
