import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { Evaluation } from 'src/app/models/evaluation';

@Component({
  selector: 'app-self-assessment',
  templateUrl: './self-assessment.component.html',
  styleUrls: ['./self-assessment.component.css']
})
export class SelfAssessmentComponent {
  dataSource: Evaluation[] = Constants.EVALUATIONS_DATA; 
  constructor(private router: Router) {}

  displayedColumns: string[] = [
    'id',
    'periodo',
    'nombreDocente',
    'identificacionDocente',
    'nombreLabor',
    'tipoLabor',
    'horas',
    'descripcion',
    'fechaInicio',
    'fechaFin',
    'estado',
    'resultados',
    'puntaje',
  ];

  
  getColumnHeader(column: string) {
    const headerMapping: Record<string, string> = {
        id: 'ID',
        nombreDocente: 'Nombre del Docente',
        identificacionDocente: 'Identificación del Docente',
        nombreLabor: 'Nombre de la Labor',
        horas: 'Horas',
        fechaInicio: 'Fecha Inicio',
        fechaFin: 'Fecha Fin',
        estado: 'Estado',
        resultados: 'Resultados',
        puntaje: 'Puntaje'
    };

    return headerMapping[column] || column;
  }

  getCellValue(evaluation: Evaluation, column: string) {
    
    switch (column) {
      case 'puntaje':
        return evaluation.puntaje.toFixed(2);
      
      default:
        return evaluation[column]; 
    }
  }
  
  viewEvaluationDetails(evaluation: Evaluation) {
    this.router.navigate(['/dashboard/self-assessment', evaluation.id]);
  }

  createEvaluation() {
    this.router.navigate(['/dashboard/create-self-assessment']);
  }
}
