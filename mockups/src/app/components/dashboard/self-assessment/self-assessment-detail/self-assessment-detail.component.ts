import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { Evaluation } from 'src/app/models/evaluation';

@Component({
  selector: 'app-self-assessment-detail',
  templateUrl: './self-assessment-detail.component.html',
  styleUrls: ['./self-assessment-detail.component.css']
})
export class SelfAssessmentDetailComponent {


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

  evaluation = new Evaluation();
  professors = Constants.PROFESSORS_DATA;
  labors = Constants.LABORS_DATA;

  firstFormGroup = this._formBuilder.group({
    periodoCtrl:  ['', Validators.required],
    identificacionDocenteCtrl: ['', Validators.required],
    nombreDocenteCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    fechaInicioCtrl: [], fechaFinCtrl: [], estadoCtrl: [], resultadosCtrl: [], puntajeCtrl: []
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    // Obtén el ID del profesor de los parámetros de la ruta
    let idParam = this.route.snapshot.paramMap.get('id');

    if (idParam === null) {
      this._snackBar.open('ID inválido', 'Cerrar', {
        duration: 2000, 
        panelClass: ['warn'] 
      });
      this.router.navigate(['/dashboard/self-assessment']);
      return; 
    }
    
    let id: number = parseInt(idParam, 10);
    this.evaluation = Constants.EVALUATIONS_DATA.find(evaluation => evaluation.id === id) || {} as Evaluation;
    
    if (!this.evaluation.id) {
      this._snackBar.open('ID no encontrado', 'Cerrar', {
        duration: 2000, 
        panelClass: ['warn'] 
      });
      this.router.navigate(['/dashboard/self-assessment']);
      return; 
    } 
    
    
  }

  saveEvaluation(){

  }

}
