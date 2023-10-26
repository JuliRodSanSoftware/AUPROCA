import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { Labor } from 'src/app/models/labor';

@Component({
  selector: 'app-labor-detail',
  templateUrl: './labor-detail.component.html',
  styleUrls: ['./labor-detail.component.css']
})
export class LaborDetailComponent {
  constructor( private _snackBar: MatSnackBar,private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {}

  labor = new Labor();  
  tiposLabor = [
    { codigo: 'D', descripcion: 'Docencia' },
    { codigo: 'TD', descripcion: 'Trabajos Docencia' },
    { codigo: 'PI', descripcion: 'Proyectos Investigación' },
    { codigo: 'TI', descripcion: 'Trabajos Investigación' },
    { codigo: 'AD', descripcion: 'Administración' },
    { codigo: 'AS', descripcion: 'Asesoría' },
    { codigo: 'S', descripcion: 'Servicios' },
    { codigo: 'E', descripcion: 'Extensión' },
    { codigo: 'C', descripcion: 'Capacitación' },
    { codigo: 'OS', descripcion: 'Otros Servicios' }
  ];


  ngOnInit(): void {
    // Obtén el ID del profesor de los parámetros de la ruta
    let idParam = this.route.snapshot.paramMap.get('id');

    if (idParam === null) {
      this._snackBar.open('ID inválido', 'Cerrar', {
        duration: 2000, // Duración en milisegundos
        panelClass: ['warn'] // Clase CSS personalizada para estilizar el Snackbar
      });
      this.router.navigate(['/dashboard/labors']);
      return; // Finaliza la función si no hay un ID válido
    }
    
    let id: number = parseInt(idParam, 10);
    this.labor = Constants.LABORS_DATA.find(labor => labor.id === id) || {} as Labor;
    
    if (!this.labor.id) {
      this._snackBar.open('ID no encontrado', 'Cerrar', {
        duration: 2000, // Duración en milisegundos
        panelClass: ['warn'] // Clase CSS personalizada para estilizar el Snackbar
      });
      this.router.navigate(['/dashboard/labors']);
      return; 
    } 
    
    
  }



  saveChanges(){
    const dialogRef = this.dialog.open(DialogSaveLabor);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this._snackBar.open('Se editó la labor correctamente', 'Cerrar', {
          duration: 3000, // Duración en milisegundos
        });
        this.router.navigate(['/dashboard/labors']);
      }
    });

    return; 
  }


  deleteLabor() {
    const dialogRef = this.dialog.open(DialogDeleteLabor);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this._snackBar.open('Se eliminó la labor correctamente', 'Cerrar', {
          duration: 3000, // Duración en milisegundos
        });
        this.router.navigate(['/dashboard/labors']);
      }
    });
}
}


@Component({
  selector: 'dialog-save-labor',
  templateUrl: './dialogs/dialog-save-labor.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogSaveLabor {}

@Component({
  selector: 'dialog-delete-labor',
  templateUrl: './dialogs/dialog-delete-labor.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogDeleteLabor {}

