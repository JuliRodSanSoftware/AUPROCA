import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Labor } from 'src/app/models/labor';

@Component({
  selector: 'app-create-labor',
  templateUrl: './create-labor.component.html',
  styleUrls: ['./create-labor.component.css']
})
export class CreateLaborComponent {
  newLabor = new Labor();

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

  constructor( private _snackBar: MatSnackBar, private router: Router,) {}

  createLabor(){
    this._snackBar.open('Se ha creado la labor correctamente', 'Cerrar', {
      duration: 3000, // Duración en milisegundos
    });
    this.router.navigate(['/dashboard/labors']);
    return; 
  }
}
