import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorData } from 'src/app/models/professorData';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-professor-detail',
  templateUrl: './professor-detail.component.html',
  styleUrls: ['./professor-detail.component.css']
})
export class ProfessorDetailComponent implements OnInit {
  professor = new ProfessorData();
  

  constructor( private _snackBar: MatSnackBar,private route: ActivatedRoute, private router: Router, public dialog: MatDialog, private professorService: ProfessorService) {}

  ngOnInit(): void {
    // Obtén el ID del profesor de los parámetros de la ruta
    const professorId = this.route.snapshot.paramMap.get('id');

    if (professorId === null) {
      this._snackBar.open('ID inválido', 'Cerrar', {
        duration: 2000, // Duración en milisegundos
        panelClass: ['warn'] // Clase CSS personalizada para estilizar el Snackbar
      });
      this.router.navigate(['/dashboard/professors']);
      return; // Finaliza la función si no hay un ID válido
    }

    this.professorService.getProfessorDetail(professorId).subscribe({
      next: (data: ProfessorData) => {
        this.professor = data
      },
      error: (error) => {
        this._snackBar.open('ID inválido', 'Cerrar', {
          duration: 2000, // Duración en milisegundos
          panelClass: ['warn'] // Clase CSS personalizada para estilizar el Snackbar
        });
        this.router.navigate(['/dashboard/professors']);
        return; // Finaliza la función si no hay un ID válido
      }
    }); 
  }
  saveChanges(){
    const professorId = this.route.snapshot.paramMap.get('id');

    const dialogRef = this.dialog.open(DialogSaveProfessor);


    if (professorId === null) {
      this._snackBar.open('ID inválido', 'Cerrar', {
        duration: 2000, // Duración en milisegundos
        panelClass: ['warn'] // Clase CSS personalizada para estilizar el Snackbar
      });
      this.router.navigate(['/dashboard/professors']);
      return; // Finaliza la función si no hay un ID válido
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.professorService.updateProfessor(professorId, this.professor).subscribe({
          next : () => {
            // Manejo de éxito: Puedes redirigir, mostrar un mensaje, etc.
            this._snackBar.open('Se editó el docente correctamente', 'Cerrar', {
              duration: 3000, // Duración en milisegundos
            });
            this.router.navigate(['/dashboard/professors']);
          },
          error: () => {
            this._snackBar.open('Error, no se pudo editar al docente', 'Error', {
              duration: 3000, // Duración en milisegundos
            });
            
          }
        });
      }
    });
    return; 
  }
  deleteProfessor() {
    const dialogRef = this.dialog.open(DialogDeleteProfessor);


    const professorId = this.route.snapshot.paramMap.get('id');

    if (professorId === null) {
      this._snackBar.open('ID inválido', 'Cerrar', {
        duration: 2000, // Duración en milisegundos
        panelClass: ['warn'] // Clase CSS personalizada para estilizar el Snackbar
      });
      this.router.navigate(['/dashboard/professors']);
      return; // Finaliza la función si no hay un ID válido
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.professorService.deleteProfessor(professorId).subscribe({
          next: () => {
            this._snackBar.open('Se eliminó el docente correctamente', 'Cerrar', {
              duration: 3000, // Duración en milisegundos
            });
            this.router.navigate(['/dashboard/professors']);
          },
          error: () => {
            this._snackBar.open('Error, no se pudo eliminar al docente.', 'Cerrar', {
              duration: 3000, // Duración en milisegundos
            });
        
          }
        });        
      }
    });
    return; 
  }

}

@Component({
  selector: 'dialog-delete-professor',
  templateUrl: './dialogs/dialog-save-professor.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogSaveProfessor {}

@Component({
  selector: 'dialog-delete-professor',
  templateUrl: './dialogs/dialog-delete-professor.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogDeleteProfessor {}

