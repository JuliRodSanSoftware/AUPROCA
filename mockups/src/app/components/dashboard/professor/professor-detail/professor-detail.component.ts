import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { Professor } from 'src/app/models/professor';

@Component({
  selector: 'app-professor-detail',
  templateUrl: './professor-detail.component.html',
  styleUrls: ['./professor-detail.component.css']
})
export class ProfessorDetailComponent implements OnInit {
  professor = new Professor();

  constructor( private _snackBar: MatSnackBar,private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    // Obtén el ID del profesor de los parámetros de la ruta
    let idParam = this.route.snapshot.paramMap.get('id');

    if (idParam === null) {
      this._snackBar.open('ID inválido', 'Cerrar', {
        duration: 2000, // Duración en milisegundos
        panelClass: ['warn'] // Clase CSS personalizada para estilizar el Snackbar
      });
      this.router.navigate(['/dashboard/professors']);
      return; // Finaliza la función si no hay un ID válido
    }
    
    let id: number = parseInt(idParam, 10);
    this.professor = Constants.PROFESSORS_DATA.find(profesor => profesor.id === id) || {} as Professor;
    
    if (!this.professor.id) {
      this._snackBar.open('ID no encontrado', 'Cerrar', {
        duration: 2000, // Duración en milisegundos
        panelClass: ['warn'] // Clase CSS personalizada para estilizar el Snackbar
      });
      this.router.navigate(['/dashboard/professors']);
      return; 
    } 
    
    
  }

  saveChanges(){
    const dialogRef = this.dialog.open(DialogSaveProfessor);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this._snackBar.open('Se editó el docente correctamente', 'Cerrar', {
          duration: 3000, // Duración en milisegundos
        });
        this.router.navigate(['/dashboard/professors']);
      }
    });

    return; 
  }


  deleteProfessor() {
    const dialogRef = this.dialog.open(DialogDeleteProfessor);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this._snackBar.open('Se eliminó el docente correctamente', 'Cerrar', {
          duration: 3000, // Duración en milisegundos
        });
        this.router.navigate(['/dashboard/professors']);
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

